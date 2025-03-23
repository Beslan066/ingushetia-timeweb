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
use App\Models\Video;
use App\Models\Konkurs;
use App\Models\FederalAuthority;
use App\Models\AwardPolitic;
use App\Models\CivilService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;


class HomeController extends Controller
{
  public function index(Request $request)
  {
    $categories = Cache::remember('categories', 3600, function () {
      return Category::select('id', 'title')->get()->toArray();
    });
    $resources = Cache::remember('resources_5', 3600, function () {
      return Resource::where('agency_id', 5)->get();
    });
    $photoReportages = PhotoReportage::query()->take(4)->orderBy('published_at', 'desc')->get();
    $videos = Video::query()->take(4)->orderBy('published_at', 'desc')->get();

    $municipalities = Cache::remember('municipalities_2_20', 3600, function () {
      return Municipality::with('supervisor:id,name')
        ->whereIn('type', [2, 20])
        ->select('id', 'title', 'type', 'supervisor_id')
        ->get();
    });

    $cities = $municipalities->where('type', 2);
    $districts = $municipalities->where('type', 20);

    $mountains = Mountain::with('reportage:id,title,published_at')
      ->select('id', 'name', 'reportage_id')
      ->get();

    $mainPosts = News::query()
    ->with(['category:id,title', 'video:id,url', 'reportage:id,title'])
    ->where('main_material', 1)
    ->where('agency_id', 5)
    ->orderBy('published_at', 'desc')
    ->take(10)
    ->get();

      $posts = News::query()
      ->with('category', 'video', 'reportage')
      ->where('main_material', 0)
      ->where('agency_id', 5)
      ->orderBy('published_at', 'desc')
      ->paginate(6);

    $postsIds = $posts->pluck('category_id');

    $related = News::query()
    ->with('category')
    ->whereIn('category_id', $postsIds)
    ->take(30)
    ->orderBy('published_at', 'desc')
    ->get();

    $posts->map(function ($post) use ($related) {
      $filtered = $related->where('category_id', $post->category_id)->whereNotIn('id', [$post->id])->take(3);
      $post->relatedPosts = $filtered;
      return $post;
    });

    $openedNews = null;
    if ($request->route('url')) { // Если url есть в маршруте (например, /news/{slug})
      $openedNews = News::where('url', $request->route('url'))
        ->with(['category', 'video', 'reportage'])
        ->firstOrFail();

      $openedNews->relatedPosts = News::where('category_id', $openedNews->category_id)
        ->where('id', '!=', $openedNews->id)
        ->select(['id', 'title', 'url', 'category_id', 'image_main', 'published_at'])
        ->limit(3)
        ->get();
    }

    //  Для обычного запроса отдаем страницу
    return Inertia::render('Index', [
      'posts' => $posts->items(),
      'categories' => $categories,
      'mainPosts' => $mainPosts,
      'resources' => $resources,
      'photoReportages' => $photoReportages,
      'videos' => $videos,
      'media' => collect($photoReportages)->merge($videos)->sortByDesc('published_at'),
      'cities' => $cities,
      'districts' => $districts,
      'mountains' => $mountains,
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



  public function konkurs() {

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

  public function simvols() {

    return Inertia::render('Simvols/Simvols');
  }
  public function gloryTour() {

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

  public function judicialAuthorities() {

    return Inertia::render('JudicialAuthorities/JudicialAuthority');
  }

  public function federalAuthorities() {


    $federalAuthorities = FederalAuthority::all();

    return Inertia::render('FederalAuthorities/FederalAuthority', compact('federalAuthorities'));
  }

  public function antinar() {


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

  public function smi() {

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



  public function civilService(Request $request) {
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

}
