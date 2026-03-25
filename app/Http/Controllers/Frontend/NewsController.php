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
    $currentPage = (int)request()->input('page', 1);
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
      ->paginate(12, ['*'], 'page', $currentPage);

    $popularNews = News::query()
      ->where('agency_id', 5)
      ->whereNotNull('published_at')
      ->orderBy('views', 'desc')
      ->take(8)
      ->get();

    $meta = [
      'title' => 'Новости Администрации Главы',
      'description' => 'Новости Администрации Главы Республики Ингушетия. Официальная информация и события.',
      'keywords' => 'администрация главы Ингушетии, новости администрации, официальные новости',
      'og_image' => asset('path/to/default/og-image.jpg'),
      'canonical' => route('news.index')
    ];

    if (request()->has('page')) {
      $page = request()->input('page');
      $meta['title'] = 'Новости Администрации Главы - страница ' . $page;
      $meta['canonical'] = route('news.index', ['page' => $page]);
    }

    return Inertia::render('News/News', [
      'news' => $news->items(),
      'categories' => $categories,
      'spotlights' => $popularNews,
      'page' => $news->currentPage(),
      'pages' => $news->lastPage(),
      'total' => $news->total(),
      'filters' => [
        'category' => request()->input('category'),
        'dateFrom' => $dateFrom,
        'dateTo' => $dateTo,
      ],
      'meta' => $meta,
      'currentAgency' => 5 // Передаем ID текущего агентства
    ]);
  }

  public function governmentNews()
  {
    $currentPage = (int)request()->input('page', 1);
    $currentPage = max(1, $currentPage);

    $dateFrom = request()->input('dateFrom') ? Carbon::parse(request()->input('dateFrom')) : null;
    $dateTo = request()->input('dateTo') ? Carbon::parse(request()->input('dateTo')) : null;

    $categories = Category::all();

    $news = News::query()
      ->with('category')
      ->where('agency_id', 2) // ID для правительства
      ->filterCategory(request()->input('category'))
      ->publishedBetween($dateFrom, $dateTo)
      ->orderBy('published_at', 'desc')
      ->paginate(12, ['*'], 'page', $currentPage);

    $popularNews = News::query()
      ->where('agency_id', 2)
      ->whereNotNull('published_at')
      ->orderBy('views', 'desc')
      ->take(8)
      ->get();

    $meta = [
      'title' => 'Новости Правительства',
      'description' => 'Новости Правительства Республики Ингушетия. Официальная информация и события.',
      'keywords' => 'правительство Ингушетии, новости правительства, официальные новости',
      'og_image' => asset('path/to/default/og-image.jpg'),
      'canonical' => route('government.news.index')
    ];

    if (request()->has('page')) {
      $page = request()->input('page');
      $meta['title'] = 'Новости Правительства - страница ' . $page;
      $meta['canonical'] = route('government.news.index', ['page' => $page]);
    }

    return Inertia::render('News/NewsGovernment', [
      'news' => $news->items(),
      'categories' => $categories,
      'spotlights' => $popularNews,
      'page' => $news->currentPage(),
      'pages' => $news->lastPage(),
      'total' => $news->total(),
      'filters' => [
        'category' => request()->input('category'),
        'dateFrom' => $dateFrom,
        'dateTo' => $dateTo,
      ],
      'meta' => $meta,
      'currentAgency' => 6 // Передаем ID текущего агентства
    ]);
  }


  public function show($url)
  {
    $newsItem = News::where('url', $url)
      ->with(['category', 'video', 'reportage', 'tags'])
      ->firstOrFail();

    // Увеличиваем счетчик просмотров
    $newsItem->incrementViews();

    // Определяем, какой компонент использовать в зависимости от agency_id
    $component = $newsItem->agency_id == 5 ? 'News/News' : 'News/NewsGovernment';

    // Получаем популярные новости для этого же агентства
    $popularNews = News::query()
      ->where('id', '!=', $newsItem->id)
      ->where('agency_id', $newsItem->agency_id)
      ->whereNotNull('published_at')
      ->orderBy('views', 'desc')
      ->take(8)
      ->get();

    // Определяем базовый URL для канонической ссылки в зависимости от агентства
    $canonicalRoute = $newsItem->agency_id == 5
      ? route('post.show.news', ['url' => $url])
      : route('government.post.show.news', ['url' => $url]);

    // Метаданные для новости
    $meta = [
      'title' => $newsItem->title . ' | Новости Ингушетии',
      'description' => Str::limit(strip_tags($newsItem->lead), 160),
      'canonical' => $canonicalRoute
    ];

    // Для правительства возвращаем пустой массив новостей, но с правильным currentAgency
    return Inertia::render($component, [
      'showNews' => $newsItem,
      'news' => [], // Пустой массив, так как это модальное окно
      'categories' => Category::query()->take(10)->get(),
      'media' => [],
      'spotlights' => $popularNews,
      'page' => 1,
      'pages' => 1,
      'total' => 0,
      'filters' => [
        'category' => null,
        'dateFrom' => null,
        'dateTo' => null,
      ],
      'meta' => $meta,
      'currentAgency' => $newsItem->agency_id // Передаем ID агентства
    ]);
  }


  public function getPostsByCategory($categoryId)
  {
    // Проверяем, что categoryId - число
    if (!is_numeric($categoryId)) {
      abort(404);
    }

    $currentPage = (int)request()->input('page', 1);
    $currentPage = max(1, $currentPage);

    $categories = Category::query()->take(10)->get();

    $spotlights = News::query()
      ->with('category')
      ->where('agency_id', 5)
      ->whereNotNull('published_at')
      ->orderBy('published_at', 'desc')
      ->take(8)
      ->get();

    $news = News::query()
      ->with('category')
      ->where('agency_id', 5)
      ->where('category_id', $categoryId)
      ->orderBy('published_at', 'desc')
      ->paginate(12, ['*'], 'page', $currentPage);

    // Получаем заголовок категории
    $categoryTitle = Category::where('id', $categoryId)->value('title');

    if (!$categoryTitle) {
      abort(404);
    }

    $meta = [
      'title' => $categoryTitle . ' | Новости Ингушетии',
      'description' => 'Новости по категории: ' . $categoryTitle,
    ];

    return Inertia::render('News/NewsByCategory', [
      'news' => $news->items(),
      'categories' => $categories,
      'categoryTitle' => $categoryTitle,
      'spotlights' => $spotlights,
      'page' => $news->currentPage(),
      'pages' => $news->lastPage(),
      'total' => $news->total(),
      'meta' => $meta,
    ]);
  }

// Добавьте метод для показа отдельной новости по категории
  public function showNewsByTag($url)
  {
    // Проверяем, что url не является числом (чтобы избежать конфликта с categoryId)
    if (is_numeric($url)) {
      abort(404);
    }

    $newsItem = News::where('url', $url)
      ->with(['category', 'video', 'reportage', 'tags'])
      ->firstOrFail();

    // Увеличиваем счетчик просмотров
    $newsItem->incrementViews();

    $categoryId = $newsItem->category_id;
    $categoryTitle = $newsItem->category->title ?? 'Новости';

    // Получаем популярные новости этого же агентства
    $popularNews = News::query()
      ->where('id', '!=', $newsItem->id)
      ->where('agency_id', $newsItem->agency_id)
      ->whereNotNull('published_at')
      ->orderBy('views', 'desc')
      ->take(8)
      ->get();

    // Получаем ВСЕ новости категории, включая текущую
    // Используем пагинацию как в основном списке
    $currentPage = (int)request()->input('page', 1);

    $news = News::query()
      ->with('category')
      ->where('agency_id', $newsItem->agency_id)
      ->where('category_id', $categoryId)
      ->orderBy('published_at', 'desc')
      ->paginate(12, ['*'], 'page', $currentPage);

    $meta = [
      'title' => $newsItem->title . ' | ' . $categoryTitle,
      'description' => Str::limit(strip_tags($newsItem->lead), 160),
      'canonical' => route('posts.by.tag.show', ['url' => $url]),
    ];

    return Inertia::render('News/NewsByCategory', [
      'showNews' => $newsItem,
      'news' => $news->items(), // Возвращаем все новости с пагинацией
      'categories' => Category::query()->take(10)->get(),
      'categoryTitle' => $categoryTitle,
      'spotlights' => $popularNews,
      'page' => $news->currentPage(),
      'pages' => $news->lastPage(),
      'total' => $news->total(),
      'meta' => $meta,
    ]);
  }


}
