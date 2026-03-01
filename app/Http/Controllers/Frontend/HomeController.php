<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Anticorruption;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Document;
use App\Models\EconomicSupport;
use App\Models\Implementation;
use App\Models\MilitarySupport;
use App\Models\Mountain;
use App\Models\Municipality;
use App\Models\NationalProject;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\ManagmentReserve;
use App\Models\Resource;
use App\Models\Antinar;
use App\Models\Vector;
use App\Models\Video;
use App\Models\Konkurs;
use App\Models\FederalAuthority;
use App\Models\AwardPolitic;
use App\Models\CivilService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\View;


class HomeController extends Controller
{
  public function index(Request $request)
  {
    $cacheTimeShort = 150;
    $cacheTimeLong = 300;

    $cacheKeys = [
      'categories' => 'categories_data_v2',
      'resources' => 'resources_data_agency_5_v2',
      'cities' => 'municipalities_type_2_v2',
      'districts' => 'municipalities_type_20_v2',
      'mountains' => 'mountains_with_reportage_v2',
      'mainPosts' => 'main_posts_agency_5_v2',
      'posts' => 'news_last_12_agency_5_v2',
      'spotlights' => 'spotlights_news_agency_5_v3',
    ];

    $categories = Cache::remember($cacheKeys['categories'], $cacheTimeLong, function () {
      return Category::select('id', 'title')->get()->toArray();
    });

    $resources = Cache::remember($cacheKeys['resources'], $cacheTimeLong, function () {
      return Resource::query()
        ->where('agency_id', 5)
        ->select('title', 'link')
        ->get();
    });

    $photoReportages = PhotoReportage::query()
      ->take(4)
      ->orderBy('published_at', 'desc')
      ->get();

    $videos = Video::query()
      ->take(4)
      ->orderBy('published_at', 'desc')
      ->get();

    $cities = Cache::remember($cacheKeys['cities'], $cacheTimeLong, function () {
      return Municipality::query()
        ->with('supervisor')
        ->where('type', 2)
        ->get();
    });

    $districts = Cache::remember($cacheKeys['districts'], $cacheTimeLong, function () {
      return Municipality::query()
        ->with('supervisor')
        ->where('type', 20)
        ->get();
    });

    $mountains = Cache::remember($cacheKeys['mountains'], $cacheTimeLong, function () {
      return Mountain::query()
        ->with('reportage')
        ->orderBy('id', 'desc')
        ->get();
    });

    $mainPosts = Cache::remember($cacheKeys['mainPosts'], $cacheTimeShort, function () {
      return News::query()
        ->with(['category:id,title', 'video:id,url', 'reportage:id,title'])
        ->where('main_material', 1)
        ->where('agency_id', 5)
        ->orderBy('published_at', 'desc')
        ->take(7)
        ->get();
    });

    $newsQuery = News::query()
      ->with('category', 'video', 'reportage', 'tags')
      ->where('agency_id', 5)
      ->orderBy('published_at', 'desc');

    if ($request->input('from') === 'main_page' && $request->has('category')) {
      $categoryId = $request->input('category');
      if ($categoryId) {
        $newsQuery->where('category_id', $categoryId);
      }
    }

    $news = $newsQuery->take(12)->get();

    $spotlights = Cache::remember($cacheKeys['spotlights'], $cacheTimeShort, function () {
      return News::query()
        ->with('category', 'video', 'reportage', 'tags')
        ->where('main_material', 0)
        ->where('agency_id', 5)
        ->orderBy('published_at', 'desc')
        ->take(6)
        ->get();
    });

    $vectors = Vector::query()
      ->orderBy('created_at', 'desc')
      ->with(['sections' => function ($query) {
        $query->orderBy('created_at', 'desc')->take(3);
      }])
      ->take(4)
      ->get();

    $openedNews = null;
    $meta = [
      'title' => 'Республика Ингушетия официальный портал',
      'description' => 'Официальный сайт Республики Ингушетия. Новости, документы, информация о регионе.',
      'keywords' => 'Ингушетия, официальный сайт, новости Ингушетии',
      'og_image' => asset('path/to/default/og-image.jpg'),
      'canonical' => url('/')
    ];

    if ($request->route('url')) {
      $openedNews = News::where('url', $request->route('url'))
        ->with(['category', 'video', 'reportage', 'tags'])
        ->firstOrFail();

      $openedNews->incrementViews();

      $openedNews->relatedPosts = News::query()
        ->where('category_id', $openedNews->category_id)
        ->where('id', '!=', $openedNews->id)
        ->where('agency_id', $openedNews->agency_id)
        ->select(['id', 'title', 'lead', 'url', 'category_id', 'image_main', 'published_at'])
        ->orderBy('published_at', 'desc')
        ->limit(3)
        ->get();

      $meta = [
        'title' => $openedNews->title . ' | Республика Ингушетия',
        'description' => Str::limit(strip_tags($openedNews->lead), 160),
        'keywords' => $openedNews->tags->pluck('name')->join(', '),
        'og_image' => $openedNews->image_main ? asset($openedNews->image_main) : asset('path/to/default/og-image.jpg'),
        'canonical' => route('post.show.home', ['url' => $request->route('url')])
      ];
    }

    return Inertia::render('Index', [
      'news' => $news,
      'spotlights' => $spotlights,
      'categories' => $categories,
      'mainPosts' => $mainPosts,
      'resources' => $resources,
      'media' => collect($photoReportages)
        ->merge($videos)
        ->sortByDesc('published_at')
        ->values()
        ->all(),
      'cities' => $cities,
      'districts' => $districts,
      'mountains' => $mountains,
      'showNews' => $openedNews,
      'anniversary' => config('app.anniversary'),
      'vectors' => $vectors,
      'meta' => $meta
    ]);
  }

  public function showPost(Request $request, $url)
  {
    // Используем те же ключи кэша, что и в index()
    $cacheTimeShort = 150;
    $cacheTimeLong = 300;

    $cacheKeys = [
      'categories' => 'categories_data',
      'resources' => 'resources_data_agency_5',
      'photoReportages' => 'photo_reportages_last_4',
      'videos' => 'videos_last_4',
      'cities' => 'municipalities_type_2',
      'districts' => 'municipalities_type_20',
      'mountains' => 'mountains_with_reportage',
      'mainPosts' => 'main_posts_agency_5',
      'posts' => 'news_last_12_agency_5',
      'related' => 'related_news_for_last_6_agency_5',
    ];

    // Получаем основные данные из кэша
    $categories = Cache::remember($cacheKeys['categories'], $cacheTimeLong, function () {
      return Category::select('id', 'title')->get()->toArray();
    });

    $mainPosts = Cache::remember($cacheKeys['mainPosts'], $cacheTimeShort, function () {
      return News::query()
        ->with(['category:id,title', 'video:id,url', 'reportage:id,title'])
        ->where('main_material', 1)
        ->where('agency_id', 5)
        ->orderBy('published_at', 'desc')
        ->take(7)
        ->get();
    });

    $posts = Cache::remember($cacheKeys['posts'], $cacheTimeShort, function () {
      return News::query()
        ->with('category', 'video', 'reportage')
        ->where('main_material', 0)
        ->where('agency_id', 5)
        ->orderBy('published_at', 'desc')
        ->take(6)
        ->get();
    });

    // Получаем открываемую новость (без кэширования, так как нужно актуальное состояние)
    $openedNews = News::where('url', $url)
      ->with(['category', 'video', 'reportage', 'tags'])
      ->firstOrFail();

    // Увеличиваем счетчик просмотров
    $openedNews->incrementViews();

    // Получаем связанные новости
    $openedNews->relatedPosts = News::where('category_id', $openedNews->category_id)
      ->where('id', '!=', $openedNews->id)
      ->where('agency_id', $openedNews->agency_id)
      ->select(['id', 'title', 'url', 'category_id', 'image_main', 'published_at'])
      ->orderBy('published_at', 'desc')
      ->limit(3)
      ->get();

    // Метаданные
    $meta = [
      'title' => $openedNews->title . ' | Республика Ингушетия',
      'description' => Str::limit(strip_tags($openedNews->lead), 160),
      'canonical' => route('post.show.home', ['url' => $url])
    ];

    return Inertia::render('Index', [
      'posts' => $posts,
      'categories' => $categories,
      'mainPosts' => $mainPosts,
      'resources' => Cache::get($cacheKeys['resources']),
      'photoReportages' => Cache::get($cacheKeys['photoReportages']),
      'videos' => Cache::get($cacheKeys['videos']),
      'media' => collect(Cache::get($cacheKeys['photoReportages']))->merge(Cache::get($cacheKeys['videos']))->sortByDesc('published_at'),
      'cities' => Cache::get($cacheKeys['cities']),
      'districts' => Cache::get($cacheKeys['districts']),
      'mountains' => Cache::get($cacheKeys['mountains']),
      'showNews' => $openedNews,
      'anniversary' => config('app.anniversary'),
      'meta' => $meta // Добавляем метаданные
    ]);
  }

  public function svoSupport()
  {
    $supports = MilitarySupport::all();

    $meta = [
      'title' => 'Поддержка семей военнослужащих',
      'description' => 'В Республике Ингушетия разработан комплекс мер социальной поддержки семей военнослужащих.'
    ];

    return Inertia::render('Region/MilitarySupport', [
      'documents' => $supports,
      'meta' => $meta
    ]);
  }

  public function contacts()
  {
    $contacts = Contact::where('agency_id', request()->input('agency_id', 5))->get();

    $meta = [
      'title' => 'Контакты Администрации Главы и Правительства РИ',
      'description' => ''
    ];

    return Inertia::render('Contacts/Contacts', [
      'contacts' => $contacts,
      'meta' => $meta
    ]);
  }

  public function implementations()
  {
    $implementations = Implementation::query()->orderBy('id', 'desc')->get();

    $meta = [
      'title' => 'Реализация указов Президента РФ в Ингушетии',
      'description' => 'Реализация указов Президента РФ в Ингушетии'
    ];

    return Inertia::render('Region/PresidentImplementations', [
      'implementations' => $implementations,
      'meta' => $meta
    ]);
  }

  public function anticorruptions()
  {
    $anticorruptions = Anticorruption::query()->orderBy('id', 'desc')->get();

    $meta = [
      'title' => 'Противодействие коррупции',
      'description' => 'Отчёт о ходе реализации Плана работы Администрации Главы и Правительства Республики Ингушетия по противодействию коррупции'
    ];

    return Inertia::render('Region/Anticorruption', [
      'anticorruptions' => $anticorruptions,
      'meta' => $meta
    ]);
  }

  public function economicSupport()
  {
    $economicSupports = EconomicSupport::query()->where('type', 0)->orderBy('id', 'desc')->get();
    $economicSupportsBuisness = EconomicSupport::query()->where('type', 1)->orderBy('id', 'desc')->get();

    $meta = [
      'title' => 'Поддержка экономики и граждан в Ингушетии',
      'description' => 'Меры поддержки граждан и экономики реализуемые в Ингушетии'
    ];

    return Inertia::render('Region/CitizenSupport', [
      'citizenSupportPackages' => $economicSupports,
      'businessSupportPackages' => $economicSupportsBuisness,
      'meta' => $meta
    ]);
  }


  public function media(Request $request)
  {
    $category = $request->input('category');
    $page = $request->input('page', 1);
    $perPage = 12;

    $videos = Video::query()->get()->map(function ($video) {
      return [
        'id' => $video->id,
        'type' => 'video',
        'title' => $video->title,
        'lead' => $video->lead,
        'image_main' => $video->image_main,
        'video' => $video->video,
        'published_at' => $video->published_at,
        'timestamp' => Carbon::parse($video->published_at)->timestamp,
      ];
    });

    $photoReportages = PhotoReportage::query()->get()->map(function ($photo) {
      return [
        'id' => $photo->id,
        'type' => 'photo',
        'title' => $photo->title,
        'lead' => $photo->lead,
        'slides' => $photo->slides,
        'image_main' => $photo->image_main,
        'published_at' => $photo->published_at,
        'timestamp' => Carbon::parse($photo->published_at)->timestamp,
      ];
    });

    $media = collect();

    switch ($category) {
      case 'video':
        $media = $videos->sortByDesc('timestamp')->values();
        break;
      case 'photo':
        $media = $photoReportages->sortByDesc('timestamp')->values();
        break;
      default:
        $media = $photoReportages->merge($videos)->sortByDesc('timestamp')->values();
        break;
    }

    $paginated = new LengthAwarePaginator(
      $media->forPage($page, $perPage)->values(),
      $media->count(),
      $perPage,
      $page,
      ['path' => $request->url(), 'query' => $request->except(['page', 'dateFrom', 'dateTo'])]
    );

    $meta = [
      'title' => 'Фото и видеорепортажи Ингушетия',
      'description' => 'Страница медиа(фото и видео) Республика Ингушетия'
    ];

    return Inertia::render('Media/Media', [
      'media' => $paginated,
      'selectedCategory' => $category,
      'meta' => $meta
    ]);
  }

  public function documents()
  {
    $documentTypes = Document::getTypes();
    $documentTypes = collect($documentTypes)->mapWithKeys(fn($type) => [$type['id'] => $type])->toArray();

    $query = Document::query()->orderBy('published_at', 'desc');

    if (request()->has('type_id')) {
      $query->where('type', request()->input('type_id'));
    }

    // Пагинация по 15 записей
    $documents = $query->paginate(15)->through(function ($document) use ($documentTypes) {
      return [
        'id' => $document->id,
        'title' => $document->title,
        'type' => $documentTypes[$document->type]['title'],
        'published_at' => $document->published_at,
        'file' => $document->file,
        'size' => $this->getFileSize($document->file), // Размер в байтах
      ];
    });

    $meta = [
      'title' => 'Документы Республика Ингушетия',
      'description' => 'Акты, Законы, Отчеты, Указы, Распоряжения Республики Ингушетия'
    ];

    return Inertia::render('Documents/Documents', [
      'documents' => $documents, // Отдаём всю пагинацию
      'documentTypes' => array_values($documentTypes),
      'meta' => $meta
    ]);
  }

// Функция для получения размера файла в байтах
  private function getFileSize($filePath)
  {
    $fullPath = storage_path("app/public/{$filePath}");
    return file_exists($fullPath) ? filesize($fullPath) : null;
  }


  public function konkurs()
  {

    $konkursTypes = Konkurs::getTypes();
    $konkursTypes = collect($konkursTypes)->mapWithKeys(function ($type) {
      return [$type['id'] => $type];
    })->all();

    $konkurses = Konkurs::query()->orderBy('published_at', 'desc');
    $konkurses = $konkurses->get()->map(function ($konkurs) use ($konkursTypes) {
      $konkurs->type = $konkursTypes[$konkurs->type]['title'];
      return $konkurs;
    });

    $meta = [
      'title' => 'Конкурсы в органах исполнительной власти Республики Ингушетия',
      'description' => ''
    ];

    return Inertia::render('Konkurs/Konkurs', [
      'konkurses' => $konkurses,
      'meta' => $meta
    ]);
  }

  public function simvols()
  {

    $meta = [
      'title' => 'Государственная символика Республики Ингушетия',
      'description' => 'Флаг и герб Республики Ингушетия'
    ];

    return Inertia::render('Simvols/Simvols', [
      'meta' => $meta
    ]);
  }

  public function gloryTour()
  {

    $meta = [
      'title' => 'Виртуальный тур по Залу Славы Республики Ингушетия',
      'description' => ''
    ];

    return Inertia::render('GloryTours/GloryTour', [
      'meta' => $meta
    ]);
  }

  public function managmentReserves()
  {

    $documentTypes = ManagmentReserve::getTypes();
    $documentTypes = collect($documentTypes)->mapWithKeys(function ($type) {
      return [$type['id'] => $type];
    })->all();

    $documents = ManagmentReserve::query()->orderBy('published_at', 'desc');
    $documents = $documents->get()->map(function ($document) use ($documentTypes) {
      $document->type = $documentTypes[$document->type]['title'];
      return $document;
    });

    $meta = [
      'title' => 'Резерв управленческих кадров Республики Ингушетия',
      'description' => 'Страница Резерв управленческих кадров'
    ];

    return Inertia::render('ManagmentReserves/ManagmentReserve',
      [
        'documents' => $documents,
        'meta' => $meta
      ]);
  }

  public function judicialAuthorities()
  {

    $meta = [
      'title' => 'Органы судебной системы Республики Ингушетия',
      'description' => 'Страница Органы судебной системы Республики Ингушетия'
    ];

    return Inertia::render('JudicialAuthorities/JudicialAuthority', [
      'meta' => $meta
    ]);
  }

  public function federalAuthorities()
  {
    $federalAuthorities = FederalAuthority::all();

    $meta = [
      'title' => 'Территориальные органы федеральных органов власти Республики Ингушетия',
      'description' => 'Страница Территориальные органы федеральных органов власти Республики Ингушетия'
    ];

    return Inertia::render('FederalAuthorities/FederalAuthority', [
      'meta' => $meta,
      'federalAuthorities' => $federalAuthorities
    ]);
  }

  public function antinar()
  {


    $documentTypes = Antinar::getTypes();
    $documentTypes = collect($documentTypes)->mapWithKeys(function ($type) {
      return [$type['id'] => $type];
    })->all();

    $documents = Antinar::query()->orderBy('published_at', 'desc');
    $documents = $documents->get()->map(function ($document) use ($documentTypes) {
      $document->type = $documentTypes[$document->type]['title'];
      return $document;
    });

    $meta = [
      'title' => 'Антинаркотическая комиссия в Республике Ингушетия',
      'description' => 'Страница Антинаркотическая комиссия в Республике Ингушетия'
    ];


    return Inertia::render('Antinars/Antinar', [
      'documents' => $documents,
      'meta' => $meta
    ]);

  }

  public function smi()
  {

    $meta = [
      'title' => 'Республиканские СМИ Республики Ингушетия',
      'description' => 'Страница Республиканские СМИ Республики Ингушетия'
    ];

    return Inertia::render('Smi/Smi', [
      'meta' => $meta
    ]);
  }


  public function awardPolitic(Request $request)
  {
    $awardTypes = AwardPolitic::getTypes();
    $awardTypes = collect($awardTypes)->mapWithKeys(fn($type) => [$type['id'] => $type])->toArray();

    $query = AwardPolitic::query()->orderBy('created_at', 'desc');

    if ($request->has('type_id')) {
      $query->where('type', $request->input('type_id'));
    }

    $documents = $query->paginate(15)->through(function ($document) use ($awardTypes) {
      return [
        'id' => $document->id,
        'title' => $document->title,
        'type' => $awardTypes[$document->type]['title'],
        'file' => $document->file,
      ];
    });

    $meta = [
      'title' => 'Наградная политика Республики Ингушетия',
      'description' => 'Государственные награды Российской Федерации, Государственные награды Республики Ингушетия,
      Поощрения Главы Республики Ингушетия, Перечень государственных наград Республики Ингушетия и поощрений
      Главы Республики Ингушетия, Реализация Наградной политики Республики Ингушетия'
    ];


    return Inertia::render('AwardPolitics/AwardPolitic', [
      'documents' => $documents,
      'awardTypes' => array_values($awardTypes),
      'meta' => $meta
    ]);
  }

  public function civilService(Request $request)
  {
    $civilServiceTypes = CivilService::getTypes();
    $civilServiceTypes = collect($civilServiceTypes)->mapWithKeys(fn($type) => [$type['id'] => $type])->toArray();

    $query = CivilService::query()->orderBy('created_at', 'desc');

    if ($request->has('type_id')) {
      $query->where('type', $request->input('type_id'));
    }

    $documents = $query->paginate(15)->through(function ($document) use ($civilServiceTypes) {
      return [
        'id' => $document->id,
        'title' => $document->title,
        'type' => $civilServiceTypes[$document->type]['title'],
        'file' => $document->file,
      ];
    });

    $meta = [
      'title' => 'Прохождение государственной гражданской службы в Администрации Главы и Правительства Республики Ингушетия',
      'description' => 'Объявления, Нормативная база, Формы мониторинга для Минтруда России,
       Условия и порядок поступления на государственную гражданскую службу в Администрацию Главы и Правительства Республики Ингушетия'
    ];


    return Inertia::render('CivilServices/CivilService', [
      'documents' => $documents,
      'civilServiceTypes' => array_values($civilServiceTypes),
      'meta' => $meta
    ]);
  }

  public function president()
  {

    $meta = [
      'title' => 'Глава Республики Ингушетия - Махмуд-Али Калиматов',
      'description' => 'Страница Главы Республики Ингушетия - Махмуд-Али Калиматова'
    ];

    return Inertia::render('President/President', [
      'meta' => $meta
    ]);

  }

  public function vectors($id)
  {
    // Получаем вектор с его секциями
    $vector = Vector::with('sections')->findOrFail($id);

    // Получаем новости этой категории
    $vectorNews = News::where('category_id', $vector->category_id)
      ->whereNotNull('published_at')
      ->orderBy('published_at', 'desc')
      ->take(8)
      ->get();

    // Получаем популярные новости (spotlights) - например, последние 5 новостей
    $spotlights = News::whereNotNull('published_at')
      ->orderBy('published_at', 'desc')
      ->take(5)
      ->get();

    $meta = [
      'title' => 'Векторы развития Республики Ингушетия' . ' ' . $vector->name,
      'description' => "Страница Векторы развития Республики Ингушетия"
    ];

    return Inertia::render('Vectors/VectorsSingle', [
      'vector' => $vector,
      'news' => $vectorNews,
      'spotlights' => $spotlights,
      'meta' => $meta
    ]);
  }

  public function generateYandexNews()
  {
    // Получить данные новостей и материалов из базы данных
    $posts = News::query()
      ->select('id', 'title', 'lead', 'content', 'image_main', 'published_at', 'url', 'video_id', 'reportage_id')
      ->with(['video', 'reportage'])
      ->orderBy('published_at', 'desc')
      ->take(50)
      ->get();

    // Создать объект SimpleXMLElement для формирования XML
    $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?>
        <rss xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" version="2.0"></rss>');

    $channel = $xml->addChild('channel');

    foreach ($posts as $post) {
      // Создать элемент <item> для каждой новости
      $item = $channel->addChild('item');
      $item->addAttribute('turbo', 'true');

      $publishedDate = strtotime($post->published_at);
      $pubDate = date('D, d M Y H:i:s O', $publishedDate);

      // Добавить основные поля
      $item->addChild('title', htmlspecialchars($post->title));
      $item->addChild('description', htmlspecialchars($post->lead));
      $fullTextNode = $item->addChild('yandex:full-text', htmlspecialchars(strip_tags($post->content)), 'http://news.yandex.ru');
      $item->addChild('pubDate', $pubDate);

      // Обработка изображений и видео
      $this->addMediaToItem($item, $post);

      // Добавление ссылки
      $link = 'https://ingushetia.ru/' . $post->url;
      $item->addChild('link', $link);
    }

    // Преобразовать XML в строку
    $xmlString = $xml->asXML();
    $xmlString = str_replace('&nbsp;', '&#160;', $xmlString);

    // Записать XML-строку в файл yandex-news.xml
    Storage::disk('public')->put('yandex-news.xml', $xmlString);

    // Вернуть ответ с XML-файлом
    return response($xmlString, 200, [
      'Content-Type' => 'application/xml',
    ]);
  }

  protected function getMimeType(string $filename): string
  {
    $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

    return match($extension) {
      'jpg', 'jpeg' => 'image/jpeg',
      'png' => 'image/png',
      'gif' => 'image/gif',
      'webp' => 'image/webp',
      default => 'image/jpeg' // по умолчанию
    };
  }
  protected function addMediaToItem(\SimpleXMLElement $item, News $post)
  {
    // Обработка главного изображения
    if (!empty($post->image_main)) {
      // Формируем корректный URL для изображения
      $imageUrl = 'https://ingushetia.ru/storage/' . ltrim($post->image_main, '/');

      // Проверяем, что URL не содержит текста новости (простая проверка на длину)
      if (strlen($imageUrl) < 255 && preg_match('/\.(jpg|jpeg|png|gif)$/i', $imageUrl)) {
        $enclosure = $item->addChild('enclosure');
        $enclosure->addAttribute('url', $imageUrl);
        $enclosure->addAttribute('type', $this->getMimeType($imageUrl));
      }
    }



    // Обработка видео
    if ($post->video_id && $post->video) {
      $mediaGroup = $item->addChild('media:group', '', 'http://search.yahoo.com/mrss/');

      // Видео контент
      $mediaContent = $mediaGroup->addChild('media:content');
      $mediaContent->addAttribute('url', $post->video->path);
      $mediaContent->addAttribute('type', 'video/mp4');

      // Превью видео
      if ($post->video->preview_path) {
        $mediaThumbnail = $mediaGroup->addChild('media:thumbnail');
        $mediaThumbnail->addAttribute('url', $post->video->preview_path);

        $enclosure = $item->addChild('enclosure');
        $enclosure->addAttribute('url', $post->video->preview_path);
        $enclosure->addAttribute('type', 'image/jpeg');
      }
    }

    // Обработка фоторепортажа
    if ($post->reportage_id && $post->reportage) {
      foreach ($post->reportage->photos as $photo) {
        $imageUrl = 'https://ingushetia.ru/storage/' . $photo->path;
        $enclosure = $item->addChild('enclosure');
        $enclosure->addAttribute('url', $imageUrl);
        $enclosure->addAttribute('type', 'image/jpeg');
      }
    }
  }
}
