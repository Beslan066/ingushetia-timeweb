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
      // Поиск новостей (только agency_id = 5)
      $news = News::where('agency_id', 5)
        ->whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
        ->with('category')
        ->orderBy('published_at', 'desc')
        ->get()
        ->map(function ($item) {
          return [
            'id' => $item->id,
            'title' => $item->title,
            'url' => $item->url ?? $item->slug ?? $item->id,
            'created_at' => $item->published_at ?? $item->created_at,
            'category' => 'Новость',
            'category_id' => $item->category_id ?? $item->category?->id ?? null,
            'category_name' => $item->category?->name ?? null,
            'type' => 'news',
            'lead' => $item->lead ?? null,
            'image' => $item->image ?? null,
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
            'created_at' => $item->published_at ?? $item->created_at,
            'category' => 'Фоторепортаж',
            'category_id' => null, // Если нет категории
            'category_name' => null,
            'type' => 'photo',
            'lead' => $item->lead ?? null,
            'image' => $item->image ?? null,
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
            'created_at' => $item->published_at ?? $item->created_at,
            'category' => 'Видео',
            'category_id' => null,
            'category_name' => null,
            'type' => 'video',
            'lead' => $item->lead ?? null,
            'image' => $item->image ?? null,
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
            'created_at' => $item->published_at ?? $item->created_at,
            'category' => 'Документ',
            'category_id' => null,
            'category_name' => null,
            'type' => 'document',
            'lead' => $item->lead ?? null,
            'image' => $item->image ?? null,
          ];
        });

      return [
        'news' => $news,
        'photoReportages' => $photoReportages,
        'videos' => $videos,
        'documents' => $documents,
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

      // Возвращаем страницу с пустыми результатами
      return Inertia::render('Search/Results', [
        'query' => $request->get('query', ''),
        'initialResults' => [
          'news' => [],
          'photoReportages' => [],
          'videos' => [],
          'documents' => [],
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
