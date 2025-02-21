<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Video;
use App\Models\Document;

class SearchController extends Controller
{
    public function searchResults(Request $request)
    {
        $query = strtolower(trim($request->get('query')));


      // Поиск новостей
        $news = News::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($item) {
                $item->category = 'Новость';
                return $item;
            });

        // Поиск фоторепортажей
        $photoReportages = PhotoReportage::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->orWhereRaw('LOWER(lead) LIKE ?', ["%{$query}%"])
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($item) {
                $item->category = 'Фоторепортаж';
                return $item;
            });

        // Поиск видео
        $videos = Video::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->orWhereRaw('LOWER(lead) LIKE ?', ["%{$query}%"])
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($item) {
                $item->category = 'Видео';
                return $item;
            });

        // Поиск документов
        $documents = Document::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($item) {
                $item->category = 'Документ';
                return $item;
            });

        // Формирование итогового результата
        return response()->json([
            'news' => $news,
            'photoReportages' => $photoReportages,
            'videos' => $videos,
            'documents' => $documents,
        ]);
    }

  public function searchPage(Request $request)
  {
    $query = strtolower(trim($request->get('query', '')));

    // Повторяем логику поиска для SSR
    $news = News::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(function ($item) {
        $item->category = 'Новость';
        return $item;
      });

    $photoReportages = PhotoReportage::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
      ->orWhereRaw('LOWER(lead) LIKE ?', ["%{$query}%"])
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(function ($item) {
        $item->category = 'Фоторепортаж';
        return $item;
      });

    // Поиск видео
    $videos = Video::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
      ->orWhereRaw('LOWER(lead) LIKE ?', ["%{$query}%"])
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(function ($item) {
        $item->category = 'Видео';
        return $item;
      });

    // Поиск документов
    $documents = Document::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(function ($item) {
        $item->category = 'Документ';
        return $item;
      });

    return Inertia::render('Search/Results', [
      'query' => $query,
      'initialResults' => [
        'news' => $news,
        'photoReportages' => $photoReportages,
        'videos' => $videos,
        'documents' => $documents,
      ]
    ]);
  }

}
