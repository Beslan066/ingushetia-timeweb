<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Video;
use App\Models\Document;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
  private function performSearch($query)
  {
    try {
      // Поиск новостей (уже с agency_id = 5)
      $news = News::where('agency_id', 5)
        ->whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
        ->with(['category', 'tags'])
        ->orderBy('published_at', 'desc')
        ->get()
        ->map(function ($item) {
          return [
            'id' => $item->id,
            'title' => $item->title,
            'url' => $item->url ?? $item->slug,
            'slug' => $item->slug,
            'published_at' => $item->published_at ? $item->published_at->toISOString() : null,
            'created_at' => $item->created_at,
            'content' => $item->content,
            'lead' => $item->lead,
            'image_main' => $item->image_main,
            'image_description' => $item->image_description,
            'agency_id' => $item->agency_id,
            'category' => $item->category ? [
              'id' => $item->category->id,
              'title' => $item->category->title,
              'slug' => $item->category->slug,
            ] : null,
            'tags' => $item->tags->map(function($tag) {
              return [
                'id' => $tag->id,
                'name' => $tag->name,
              ];
            }),
            'type' => 'news',
            'category_type' => 'Новость',
          ];
        });

      // Поиск фоторепортажей
      $photoReportages = PhotoReportage::where('agency_id', 5)
        ->where(function($q) use ($query) {
          $q->whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->orWhereRaw('LOWER(lead) LIKE ?', ["%{$query}%"]);
        })
        ->orderBy('published_at', 'desc')
        ->get()
        ->map(function ($item) {
          return [
            'id' => $item->id,
            'title' => $item->title,
            'url' => $item->url ?? $item->slug ?? $item->id,
            'published_at' => $item->published_at,
            'created_at' => $item->created_at,
            'content' => $item->content ?? null,
            'lead' => $item->lead ?? null,
            'image_main' => $item->image ?? null,
            'agency_id' => $item->agency_id,
            'category' => null,
            'tags' => [],
            'type' => 'photo',
            'category_type' => 'Фоторепортаж',
          ];
        });

      // Поиск видео
      $videos = Video::where('agency_id', 5)
        ->where(function($q) use ($query) {
          $q->whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->orWhereRaw('LOWER(lead) LIKE ?', ["%{$query}%"]);
        })
        ->orderBy('published_at', 'desc')
        ->get()
        ->map(function ($item) {
          return [
            'id' => $item->id,
            'title' => $item->title,
            'url' => $item->url ?? $item->slug ?? $item->id,
            'published_at' => $item->published_at,
            'created_at' => $item->created_at,
            'content' => $item->content ?? null,
            'lead' => $item->lead ?? null,
            'image_main' => $item->image ?? null,
            'agency_id' => $item->agency_id,
            'category' => null,
            'tags' => [],
            'type' => 'video',
            'category_type' => 'Видео',
          ];
        });

      // Поиск документов
      $documents = Document::where('agency_id', 5)
        ->whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
        ->orderBy('published_at', 'desc')
        ->get()
        ->map(function ($item) {
          return [
            'id' => $item->id,
            'title' => $item->title,
            'url' => $item->url ?? $item->slug ?? $item->id,
            'published_at' => $item->published_at,
            'created_at' => $item->created_at,
            'content' => $item->content ?? null,
            'lead' => $item->lead ?? null,
            'image_main' => $item->image ?? null,
            'agency_id' => $item->agency_id,
            'category' => null,
            'tags' => [],
            'type' => 'document',
            'category_type' => 'Документ',
          ];
        });

      // Объединяем все результаты
      $allResults = collect()
        ->concat($news)
        ->concat($photoReportages)
        ->concat($videos)
        ->concat($documents);

      // Сортируем по published_at (самые новые сверху)
      $sortedResults = $allResults->sortByDesc(function ($item) {
        return $item['published_at'] ?? $item['created_at'] ?? now();
      })->values();

      // Возвращаем отсортированные результаты по категориям
      return [
        'news' => $news,
        'photoReportages' => $photoReportages,
        'videos' => $videos,
        'documents' => $documents,
        'all' => $sortedResults, // Добавляем общий список
      ];

    } catch (\Exception $e) {
      Log::error('Search error: ' . $e->getMessage(), [
        'query' => $query,
        'trace' => $e->getTraceAsString()
      ]);

      return [
        'news' => collect(),
        'photoReportages' => collect(),
        'videos' => collect(),
        'documents' => collect(),
        'all' => collect(),
      ];
    }
  }

  public function searchResults(Request $request)
  {
    try {
      $query = strtolower(trim($request->get('query', '')));

      if (empty($query) || strlen($query) < 2) {
        return response()->json([
          'news' => [],
          'photoReportages' => [],
          'videos' => [],
          'documents' => [],
          'all' => [],
        ]);
      }

      $results = $this->performSearch($query);
      return response()->json($results);

    } catch (\Exception $e) {
      Log::error('SearchResults error: ' . $e->getMessage(), [
        'query' => $request->get('query'),
        'trace' => $e->getTraceAsString()
      ]);

      return response()->json([
        'error' => 'Search failed',
        'message' => $e->getMessage()
      ], 500);
    }
  }

  public function searchPage(Request $request)
  {
    try {
      $query = strtolower(trim($request->get('query', '')));

      // Получаем категории
      $categories = Category::all();

      // Выполняем поиск
      $results = $this->performSearch($query);

      // Метаданные для страницы
      $meta = [
        'title' => 'Результаты поиска: ' . $query,
        'description' => 'Результаты поиска по запросу "' . $query . '" на сайте Администрации Главы Республики Ингушетия',
        'keywords' => $query . ', поиск, администрация главы, Ингушетия',
        'og_image' => asset('path/to/default/og-image.jpg'),
        'canonical' => route('search.page', ['query' => $query])
      ];

      return Inertia::render('Search/Results', [
        'query' => $query,
        'initialResults' => $results,
        'categories' => $categories,
        'currentAgency' => 5,
        'meta' => $meta,
      ]);

    } catch (\Exception $e) {
      Log::error('SearchPage error: ' . $e->getMessage(), [
        'query' => $request->get('query'),
        'trace' => $e->getTraceAsString()
      ]);

      return Inertia::render('Search/Results', [
        'query' => $request->get('query', ''),
        'initialResults' => [
          'news' => [],
          'photoReportages' => [],
          'videos' => [],
          'documents' => [],
          'all' => [],
        ],
        'categories' => Category::all(),
        'currentAgency' => 5,
        'meta' => [
          'title' => 'Ошибка поиска',
          'description' => 'Произошла ошибка при выполнении поиска',
          'keywords' => '',
          'og_image' => asset('path/to/default/og-image.jpg'),
          'canonical' => route('search.page'),
        ],
        'error' => 'Произошла ошибка при выполнении поиска. Пожалуйста, попробуйте позже.'
      ]);
    }
  }
}
