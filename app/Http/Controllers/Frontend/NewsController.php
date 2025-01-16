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

    $mainPosts = News::query()
      ->with('category')
      ->where('main_material', 1)
      ->where('agency_id', 5)
      ->take(10)
      ->get();
    $categories = Category::query()->take(10)->get();

    $news = News::query()
      ->with('category')
      ->where('agency_id', 5)
      ->filterCategory(request()->input('category'))
      ->publishedBetween($dateFrom, $dateTo)
      ->orderBy('published_at', 'desc')
      ->paginate(6);

    $spotlights = News::query()->with('category')->where('agency_id',
      5)->whereNotNull('published_at')->orderBy('published_at')->take(8)->get();

    $media = [];
    if ($page > 0) {
      $photoMedia = PhotoReportage::query()->orderBy('published_at', 'desc')->offset(($page - 1) * 2)->limit(2)->get();
      $videoMedia = Video::query()->orderBy('published_at', 'desc')->offset(($page - 1) * 2)->limit(2)->get();
      $media = collect($photoMedia)->merge($videoMedia)->sortByDesc('published_at');
    }

    return Inertia::render('News/News', [
      'news' => $news->items(),
      'categories' => $categories,
      'mainPosts' => $mainPosts,
      'media' => $media,
      'spotlights' => $spotlights,
      'page' => $page + 1,
      'pages' => ceil($news->total() / $news->perPage()),
      'filters' => [
        'category' => request()->input('category'),
        'dateFrom' => $dateFrom,
        'dateTo' => $dateTo,
      ]
    ]);
  }

  public function getPostsByCategory($categoryId)
  {
    $categories = Category::query()->take(10)->get();

    $news = News::query()
      ->with('category')
      ->where('agency_id', 5)
      ->where('category_id', $categoryId)
      ->orderBy('id', 'desc')
      ->get();

    // Получаем заголовок категории
    $categoryTitle = Category::where('id', $categoryId)->value('title');

    return Inertia::render('News/NewsCategory', [
      'news' => $news,
      'categories' => $categories,
      'categoryId' => $categoryId,
      'categoryTitle' => $categoryTitle,
    ]);
  }


}
