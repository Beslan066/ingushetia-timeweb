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
use Inertia\Inertia;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class HomeController extends Controller
{
  public function index(Request $request)
  {
      // Время кэширования
      $cacheTimeShort = 150;  // 2.5 минуты
      $cacheTimeLong = 300;   // 5 минут

      // Ключи кэша
      $cacheKeys = [
          'categories' => 'categories_data_v2',
          'resources' => 'resources_data_agency_5_v2',
          'cities' => 'municipalities_type_2_v2',
          'districts' => 'municipalities_type_20_v2',
          'mountains' => 'mountains_with_reportage_v2',
          'mainPosts' => 'main_posts_agency_5_v2',
          'posts' => 'news_last_12_agency_5_v2',
          'spotlights' => 'spotlights_news_agency_5_v3', // Отдельный ключ для spotlights
      ];

      // Получаем категории
      $categories = Cache::remember($cacheKeys['categories'], $cacheTimeLong, function () {
          return Category::select('id', 'title')->get()->toArray();
      });

      // Ресурсы
      $resources = Cache::remember($cacheKeys['resources'], $cacheTimeLong, function () {
          return Resource::query()
              ->where('agency_id', 5)
              ->select('title', 'link')
              ->get();
      });

      // Фоторепортажи (без кэширования)
      $photoReportages = PhotoReportage::query()
          ->take(4)
          ->orderBy('published_at', 'desc')
          ->get();

      // Видео (без кэширования)
      $videos = Video::query()
          ->take(4)
          ->orderBy('published_at', 'desc')
          ->get();

      // Города
      $cities = Cache::remember($cacheKeys['cities'], $cacheTimeLong, function () {
          return Municipality::query()
              ->with('supervisor')
              ->where('type', 2)
              ->get();
      });

      // Районы
      $districts = Cache::remember($cacheKeys['districts'], $cacheTimeLong, function () {
          return Municipality::query()
              ->with('supervisor')
              ->where('type', 20)
              ->get();
      });

      // Горные территории
      $mountains = Cache::remember($cacheKeys['mountains'], $cacheTimeLong, function () {
          return Mountain::with('reportage')->get();
      });

      // Главные материалы
      $mainPosts = Cache::remember($cacheKeys['mainPosts'], $cacheTimeShort, function () {
          return News::query()
              ->with(['category:id,title', 'video:id,url', 'reportage:id,title'])
              ->where('main_material', 1)
              ->where('agency_id', 5)
              ->orderBy('published_at', 'desc')
              ->take(7)
              ->get();
      });

      // Основные новости (фильтруются по категории если нужно)
      $newsQuery = News::query()
          ->with('category', 'video', 'reportage', 'tags')
          ->where('agency_id', 5)
          ->orderBy('published_at', 'desc');

      // Фильтрация по категории только для главной страницы
      if ($request->input('from') === 'main_page' && $request->has('category')) {
          $categoryId = $request->input('category');
          if ($categoryId) {
              $newsQuery->where('category_id', $categoryId);
          }
      }

      $news = $newsQuery->take(12)->get();

      // Spotlights - полностью статичные данные (не зависят от фильтрации)
      $spotlights = Cache::remember($cacheKeys['spotlights'], $cacheTimeShort, function () {
        return News::query()
        ->with('category', 'video', 'reportage', 'tags')
        ->where('main_material', 0)
        ->where('agency_id', 5)
        ->orderBy('published_at', 'desc')
        ->take(6)
        ->get();
      });

      // Векторы развития
      $vectors = Vector::query()
          ->orderBy('created_at', 'desc')
          ->with(['sections' => function($query) {
              $query->orderBy('created_at', 'desc')->take(3);
          }])
          ->take(4)
          ->get();

      // Открытая новость (если есть в URL)
      $openedNews = null;
if ($request->route('url')) {
    $openedNews = News::where('url', $request->route('url'))
        ->with(['category', 'video', 'reportage', 'tags'])
        ->firstOrFail();

    $openedNews->relatedPosts = News::query()
        ->where('category_id', $openedNews->category_id)
        ->where('id', '!=', $openedNews->id)
        ->select(['id', 'title', 'lead', 'url', 'category_id', 'image_main', 'published_at'])
        ->orderBy('published_at', 'desc') // Изменено с 'asc' на 'desc'
        ->limit(3)
        ->get();
}

      return Inertia::render('Index', [
          'news' => $news,
          'spotlights' => $spotlights, // Статичные данные
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
      ->with(['category', 'video', 'reportage'])
      ->firstOrFail();

    // Увеличиваем счетчик просмотров
    $openedNews->incrementViews();

    // Получаем связанные новости
    $openedNews->relatedPosts = News::where('category_id', $openedNews->category_id)
      ->where('id', '!=', $openedNews->id)
      ->select(['id', 'title', 'url', 'category_id', 'image_main', 'published_at'])
      ->limit(3)
      ->get();

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
    ]);
  }

  public function nationalProjects()
  {
    $natProjects = NationalProject::all();
    return Inertia::render('Region/NationalProjects', [
      'natProjects' => $natProjects
    ]);
  }

  public function svoSupport()
  {
    $supports = MilitarySupport::all();

    return Inertia::render('Region/MilitarySupport', [
      'documents' => $supports
    ]);
  }

  public function contacts()
  {
    $contacts = Contact::where('agency_id', request()->input('agency_id', 5))->get();
    return Inertia::render('Contacts/Contacts', [
      'contacts' => $contacts
    ]);
  }

  public function implementations()
  {
    $implementations = Implementation::query()->orderBy('id', 'desc')->get();

    return Inertia::render('Region/PresidentImplementations', [
      'implementations' => $implementations
    ]);
  }
  public function anticorruptions()
  {
    $anticorruptions = Anticorruption::query()->orderBy('id', 'desc')->get();

    return Inertia::render('Region/Anticorruption', [
      'anticorruptions' => $anticorruptions
    ]);
  }

  public function economicSupport()
  {
    $economicSupports = EconomicSupport::query()->where('type', 0)->orderBy('id', 'desc')->get();
    $economicSupportsBuisness = EconomicSupport::query()->where('type', 1)->orderBy('id', 'desc')->get();

    return Inertia::render('Region/CitizenSupport', [
      'citizenSupportPackages' => $economicSupports,
      'businessSupportPackages' => $economicSupportsBuisness
    ]);
  }

  public function media()
  {
    $dateFrom = request()->input('dateFrom') ? Carbon::parse(request()->input('dateFrom')) : null;
    $dateTo = request()->input('dateTo') ? Carbon::parse(request()->input('dateTo')) : null;

    $videos = Video::query()->publishedBetween($dateFrom, $dateTo)->orderBy('published_at', 'desc')->get();
    $photoReportages = PhotoReportage::query()->publishedBetween($dateFrom, $dateTo)->orderBy('published_at', 'desc')->get();

    $media = [];
    switch (request()->input('category')) {
      case 'video':
        $media = $videos;
        break;
      case 'photo':
        $media = $photoReportages;
        break;
      default:
        $media = collect($photoReportages)->merge($videos)->sortByDesc('published_at')->flatten()->toArray();
    }

    return Inertia::render('Media/Media', [
      'videos' => $videos,
      'photoReportages' => $photoReportages,
      'media' => $media,
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

    return Inertia::render('Documents/Documents', [
      'documents' => $documents, // Отдаём всю пагинацию
      'documentTypes' => array_values($documentTypes),
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

    return Inertia::render('Konkurs/Konkurs', [
      'konkurses' => $konkurses
    ]);
  }

  public function simvols()
  {

    return Inertia::render('Simvols/Simvols');
  }

  public function gloryTour()
  {

    return Inertia::render('GloryTours/GloryTour');
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

    return Inertia::render('ManagmentReserves/ManagmentReserve', ['documents' => $documents]);
  }

  public function judicialAuthorities()
  {

    return Inertia::render('JudicialAuthorities/JudicialAuthority');
  }

  public function federalAuthorities()
  {


    $federalAuthorities = FederalAuthority::all();

    return Inertia::render('FederalAuthorities/FederalAuthority', compact('federalAuthorities'));
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


    return Inertia::render('Antinars/Antinar', compact('documents'));

  }

  public function smi()
  {

    return Inertia::render('Smi/Smi');
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

    return Inertia::render('AwardPolitics/AwardPolitic', [
      'documents' => $documents,
      'awardTypes' => array_values($awardTypes), // Передаём типы наград
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

    return Inertia::render('CivilServices/CivilService', [
      'documents' => $documents,
      'civilServiceTypes' => array_values($civilServiceTypes), // Передаём типы наград
    ]);
  }

  public function president()
  {
    return Inertia::render('President/President');

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

    return Inertia::render('Vectors/VectorsSingle', [
      'vector' => $vector,
      'news' => $vectorNews,
    ]);
  }
}
