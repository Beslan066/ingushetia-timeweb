<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Video;
use Carbon\Carbon;
use Inertia\Inertia;

class NewsController extends Controller
{

  public function index()
  {
    $page = max(1, (int)request()->input('page', 1)) - 1;
    $dateFrom = request()->input('dateFrom') ? Carbon::parse(request()->input('dateFrom')) : null;
    $dateTo = request()->input('dateTo') ? Carbon::parse(request()->input('dateTo')) : null;

    $categories = Category::all();

    $news = News::query()
      ->with('category')
      ->where('agency_id', 5)
      ->filterCategory(request()->input('category'))
      ->publishedBetween($dateFrom, $dateTo)
      ->orderBy('published_at', 'desc')
      ->paginate(6);

    // Получаем популярные новости (например, 8 самых просматриваемых за последний месяц)
    $popularNews = News::query()
      ->where('agency_id', 5)
      ->whereNotNull('published_at')
      ->orderBy('views', 'desc')
      ->take(8)
      ->get();

    $media = [];
    if ($page > 0) {
      $photoMedia = PhotoReportage::query()->orderBy('published_at', 'desc')->offset(($page - 1) * 2)->limit(2)->get();
      $videoMedia = Video::query()->orderBy('published_at', 'desc')->offset(($page - 1) * 2)->limit(2)->get();
      $media = collect($photoMedia)->merge($videoMedia)->sortByDesc('published_at');
    }

    return Inertia::render('News/News', [
      'news' => $news->items(),
      'categories' => $categories,
      'media' => $media,
      'spotlights' => $popularNews,
      'page' => $page + 1,
      'pages' => ceil($news->total() / $news->perPage()),
      'filters' => [
        'category' => request()->input('category'),
        'dateFrom' => $dateFrom,
        'dateTo' => $dateTo,
      ]
    ]);
  }


  public function show($url)
  {
    $newsItem = News::where('url', $url)
      ->with(['category', 'video', 'reportage'])
      ->firstOrFail();

    // Увеличиваем счетчик просмотров
    $newsItem->incrementViews();

    // Получаем популярные новости
    $popularNews = News::query()
      ->where('id', '!=', $newsItem->id)
      ->where('agency_id', 5)
      ->whereNotNull('published_at')
      ->orderBy('views', 'desc')
      ->take(8)
      ->get();

    return Inertia::render('News/News', [
      'showNews' => $newsItem,
      'news' => [],
      'categories' => Category::query()->take(10)->get(),
      'media' => [],
      'spotlights' => $popularNews,
      'page' => 1,
      'pages' => 1,
      'filters' => [
        'category' => null,
        'dateFrom' => null,
        'dateTo' => null,
      ],
    ]);
  }


  public function getPostsByCategory($categoryId)
  {
    $categories = Category::query()->take(10)->get();


    $spotlights = News::query()->with('category')->where('agency_id',
      5)->whereNotNull('published_at')->orderBy('published_at')->take(8)->get();

    $news = News::query()
      ->with('category')
      ->where('agency_id', 5)
      ->where('category_id', $categoryId)
      ->orderBy('id', 'desc')
      ->limit(50)
      ->get();

    // Получаем заголовок категории
    $categoryTitle = Category::where('id', $categoryId)->value('title');

    return Inertia::render('News/NewsByCategory', [
      'news' => $news,
      'categories' => $categories,
      'categoryTitle' => $categoryTitle,
      'spotlights' => $spotlights,
    ]);
  }


}
