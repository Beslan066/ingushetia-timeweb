<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{

  public function index()
{
    // Получаем номер страницы из запроса, по умолчанию 1
    $currentPage = (int)request()->input('page', 1);
    
    // Убеждаемся, что страница не меньше 1
    $currentPage = max(1, $currentPage);
    
    $dateFrom = request()->input('dateFrom') ? Carbon::parse(request()->input('dateFrom')) : null;
    $dateTo = request()->input('dateTo') ? Carbon::parse(request()->input('dateTo')) : null;

    $categories = Category::all();

    $news = News::query()
        ->with('category')
        ->where('agency_id', 5)
        ->filterCategory(request()->input('category'))
        ->publishedBetween($dateFrom, $dateTo)
        ->orderBy('published_at', 'desc')
        ->paginate(6, ['*'], 'page', $currentPage); // Явно указываем параметр page

    // Получаем популярные новости
    $popularNews = News::query()
        ->where('agency_id', 5)
        ->whereNotNull('published_at')
        ->orderBy('views', 'desc')
        ->take(8)
        ->get();

    $meta = [
        'title' => 'Новости Ингушетии',
        'description' => 'Последние новости Республики Ингушетия. Свежие события, репортажи и новостные материалы.',
        'keywords' => 'новости Ингушетии, события Ингушетии, последние новости',
        'og_image' => asset('path/to/default/og-image.jpg'),
        'canonical' => route('news.index')
    ];

    // Для страниц пагинации
    if (request()->has('page')) {
        $page = request()->input('page');
        $meta['title'] = 'Новости Ингушетии - страница ' . $page;
        $meta['canonical'] = route('news.index', ['page' => $page]);
    }

    return Inertia::render('News/News', [
        'news' => $news->items(),
        'categories' => $categories,
        'spotlights' => $popularNews,
        'page' => $news->currentPage(), // Используем currentPage() из пагинатора
        'pages' => $news->lastPage(),
        'total' => $news->total(),
        'filters' => [
            'category' => request()->input('category'),
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
        ],
        'meta' => $meta
    ]);
}


  public function show($url)
  {
    $newsItem = News::where('url', $url)
      ->with(['category', 'video', 'reportage', 'tags'])
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

    // Метаданные для новости
    $meta = [
      'title' => $newsItem->title . ' | Новости Ингушетии',
      'description' => Str::limit(strip_tags($newsItem->lead), 160),
      'canonical' => route('post.show.news', ['url' => $url])
    ];

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
      'meta' => $meta
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
