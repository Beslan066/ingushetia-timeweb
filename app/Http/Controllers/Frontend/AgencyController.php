<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\AgencyActivity;
use App\Models\Category;
use App\Models\Document;
use App\Models\GovernmentDocument;
use App\Models\GovernmentDocumentCategory; // Исправил опечатку
use App\Models\News;
use App\Models\Page;
use App\Models\PhotoReportage;
use App\Models\Resource;
use App\Models\Video;
use Carbon\Carbon;
use Inertia\Inertia;

class AgencyController extends Controller
{
  public function index()
  {
    $agencies = Agency::query()
      ->where('id', [2])
      ->get();

    return Inertia::render('Agency/Agencies', [
      'agencies' => $agencies
    ]);
  }

  public function singleAgency($slug)
  {
    $dateFrom = request()->input('dateFrom')
      ? Carbon::parse(request()->input('dateFrom'))->startOfDay()
      : null;
    $dateTo = request()->input('dateTo')
      ? Carbon::parse(request()->input('dateTo'))->endOfDay()
      : null;

    if ($dateFrom && $dateTo && $dateFrom->greaterThan($dateTo)) {
      $tempFrom = $dateFrom->copy()->startOfDay();
      $dateFrom = $dateTo->copy()->startOfDay();
      $dateTo = $tempFrom->copy()->endOfDay();
    }

    $agency = Agency::where('slug', $slug)->firstOrFail();

    $agencys = Agency::query()
      ->where('id', $agency->id)
      ->get();

    $categories = Category::query()
      ->take(10)
      ->get();

    $resources = Resource::query()
      ->take(4)
      ->where('agency_id', $agency->id)
      ->get();

    $photoReportages = PhotoReportage::query()
      ->take(4)
      ->where('agency_id', $agency->id)
      ->orderBy('published_at', 'desc')
      ->get();

    $videos = Video::query()
      ->take(4)
      ->where('agency_id', $agency->id)
      ->orderBy('published_at', 'desc')
      ->get();

    $mainPosts = News::query()
      ->with('category')
      ->where('main_material', 1)
      ->where('agency_id', $agency->id)
      ->orderBy('published_at', 'desc')
      ->take(10)
      ->get();

    $spotlights = News::query()
      ->with('category', 'video', 'reportage')
      ->where('agency_id', $agency->id)
      ->take(6)
      ->orderBy('published_at', 'desc')
      ->get();

    $activities = AgencyActivity::query()
      ->where('agency_id', $agency->id)
      ->take(7)
      ->get();

    $news = News::query()
      ->with('category')
      ->where('agency_id', $agency->id)
      ->filterCategory(request()->input('category'))
      ->publishedBetween($dateFrom, $dateTo)
      ->take(3)
      ->orderBy('published_at', 'desc')
      ->get();

    // ИСПРАВЛЕНО: используем GovernmentDocumentCategory вместо опечатки
    $documentTypes = GovernmentDocumentCategory::all();
    $documentTypesMapped = collect($documentTypes)->mapWithKeys(function ($type) {
      return [$type['id'] => $type];
    })->all();

    $documents = GovernmentDocument::query()
      ->take(10)
      ->get()
      ->map(function ($document) use ($documentTypesMapped) {
        $document->type_label = $documentTypesMapped[$document->type] ?? null;
        return $document;
      });

    $sidebarPages = Page::query()
      ->where('agency_id', $agency->id)
      ->select('id', 'title', 'slug')
      ->orderBy('id')
      ->get()
      ->toArray();

    return Inertia::render('Agency/Agency', [
      'agencys' => $agencys,
      'agency' => $agency,
      'spotlights' => $spotlights,
      'mainPosts' => $mainPosts,
      'videos' => $videos,
      'photoReportages' => $photoReportages,
      'media' => collect($photoReportages)->merge($videos)->sortByDesc('published_at'),
      'categories' => $categories,
      'resources' => $resources,
      'activities' => $activities,
      'news' => $news,
      'documents' => $documents,
      'slug' => $slug, // ДОБАВЛЕНО: передаем slug для компонента <Documents>
      'filters' => [
        'category' => request()->input('category'),
        'dateFrom' => request()->input('dateFrom'),
        'dateTo'   => request()->input('dateTo'),
      ],
      'sidebarPages' => $sidebarPages,
    ]);
  }

  public function documents(Agency $agency)
  {
    // Берем категории из правильной модели
    $documentTypes = GovernmentDocumentCategory::all();
    $documentTypesMapped = collect($documentTypes)->mapWithKeys(fn($type) => [$type['id'] => $type])->toArray();

    $query = GovernmentDocument::query()
      // Если у GovernmentDocument НЕТ agency_id, этот фильтр вернет пустоту.
      // Оставляю закомментированным, так как на главной ты выводишь все подряд.
      // ->where('agency_id', $agency->id)
      ->orderBy('published_at', 'desc');

    if (request()->has('type_id')) {
      $query->where('type', request()->input('type_id'));
    }

    $documents = $query->paginate(15)->through(function ($document) use ($documentTypesMapped) {
      return [
        'id' => $document->id,
        'title' => $document->title,
        'type' => $documentTypesMapped[$document->type]['title'] ?? 'Неизвестный тип',
        'published_at' => $document->published_at,
        'file' => $document->file,
        'size' => $this->getFileSize($document->file),
      ];
    });

    return Inertia::render('Agency/AgencyDocuments', [
      'agency' => $agency,
      'documents' => $documents,
      'documentTypes' => $documentTypes->map(fn($type) => ['id' => $type->id, 'title' => $type->title]), // Приводим к массиву для фронтенда
      'meta' => [
        'title' => "Документы — {$agency->title}",
        'description' => "Список документов агентства {$agency->title}",
      ]
    ]);
  }

  /**
   * Получение размера файла в байтах (добавлено, чтобы не было ошибки)
   */
  private function getFileSize($file)
  {
    if (!$file) {
      return 0;
    }

    $path = storage_path('app/public/' . $file);
    if (file_exists($path)) {
      return filesize($path);
    }

    $publicPath = public_path('storage/' . $file);
    if (file_exists($publicPath)) {
      return filesize($publicPath);
    }

    return 0;
  }

  public function page($pageSlug)
  {
    // Ищем страницу по slug.
    // Рекомендую добавить проверку на agency_id = 2 (правительство),
    // чтобы через этот роут не открывались страницы других ведомств.
    $page = Page::where('slug', $pageSlug)
      // ->where('agency_id', 2) // Раскомментируйте для безопасности
      ->firstOrFail();

    // Подгружаем страницы для сайдбара, чтобы меню не пропадало
    $sidebarPages = Page::query()
      ->where('agency_id', 2)
      ->select('id', 'title', 'slug')
      ->orderBy('id')
      ->get()
      ->toArray();

    return Inertia::render('Agency/Page', [
      'page' => $page,
      'sidebarPages' => $sidebarPages,
      'meta' => [
        'title' => $page->title . ' | Правительство РИ',
        'description' => $page->title . ' - официальный портал Правительства Республики Ингушетия',
      ]
    ]);
  }
}
