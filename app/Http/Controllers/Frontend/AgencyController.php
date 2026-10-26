<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\AgencyActivity;
use App\Models\Category;
use App\Models\Document;
use App\Models\GovernmentDocument;
use App\Models\News;
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

    // Если пользователь перепутал местами "От" и "До", меняем их
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
      ->where('agency_id', $agency->id) // ID для правительства
      ->filterCategory(request()->input('category'))
      ->publishedBetween($dateFrom, $dateTo)
      ->take(3)
      ->orderBy('published_at', 'desc')
      ->get();

    $documentTypes = Document::getTypes();
    $documentTypes = collect($documentTypes)->mapWithKeys(function ($type) {
      return [$type['id'] => $type];
    })->all();

    $documents = GovernmentDocument::query()
      ->take(10)
      ->get()
      ->map(function ($document) use ($documentTypes) {
        $document->type_label = $documentTypes[$document->type] ?? null;
        return $document;
      });


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
      'filters' => [
        'category' => request()->input('category'),
        // Передаем строки, а не Carbon — для корректного отображения в UI
        'dateFrom' => request()->input('dateFrom'),
        'dateTo'   => request()->input('dateTo'),
      ],
    ]);
  }

  public function documents(Agency $agency)
  {
    $documentTypes = Document::getTypes();
    $documentTypes = collect($documentTypes)->mapWithKeys(fn($type) => [$type['id'] => $type])->toArray();

    $query = Document::query()
      ->where('agency_id', $agency->id)
      ->orderBy('published_at', 'desc');

    if (request()->has('type_id')) {
      $query->where('type', request()->input('type_id'));
    }

    $documents = $query->paginate(15)->through(function ($document) use ($documentTypes) {
      return [
        'id' => $document->id,
        'title' => $document->title,
        'type' => $documentTypes[$document->type]['title'] ?? null,
        'published_at' => $document->published_at,
        'file' => $document->file,
        'size' => $this->getFileSize($document->file),
      ];
    });

    return response()->json($documents);
  }
}
