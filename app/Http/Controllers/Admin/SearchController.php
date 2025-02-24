<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Video;
use Illuminate\Support\Collection;

class SearchController extends Controller
{
  public function index(Request $request)
  {
    $query = $request->input('query');

    $results = collect()
      ->concat($this->searchNews($query))
      ->concat($this->searchDocuments($query))
      ->concat($this->searchPhotoReportages($query))
      ->concat($this->searchVideos($query))
      ->sortByDesc('published_at');

    return view('admin.search-results', compact('results', 'query'));
  }

  private function searchNews($query)
  {
    return News::query()
      ->where('title', 'like', "%$query%")
      ->orWhere('lead', 'like', "%$query%")
      ->orWhere('content', 'like', "%$query%")
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(fn($item) => $item->setAttribute('type', 'Новость'));
  }

  private function searchDocuments($query)
  {
    return Document::query()
      ->where('title', 'like', "%$query%")
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(fn($item) => $item->setAttribute('type', 'Документ'));
  }

  private function searchPhotoReportages($query)
  {
    return PhotoReportage::query()
      ->where('title', 'like', "%$query%")
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(fn($item) => $item->setAttribute('type', 'Фоторепортаж'));
  }

  private function searchVideos($query)
  {
    return Video::query()
      ->where('title', 'like', "%$query%")
      ->orWhere('lead', 'like', "%$query%")
      ->orderBy('published_at', 'desc')
      ->get()
      ->map(fn($item) => $item->setAttribute('type', 'Видео'));
  }
}
