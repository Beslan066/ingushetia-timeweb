<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PhotoReportage\StoreRequest;
use App\Http\Requests\Admin\PhotoReportage\UpdateRequest;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PhotoReportageController extends Controller
{
  /**
   * Список фоторепортажей
   */
  public function index()
  {
    $news = PhotoReportage::query()
      ->where('agency_id', auth()->user()->agency_id)
      ->orderBy('id', 'desc')
      ->paginate(10);

    return view('admin.photo-reportage.index', compact('news'));
  }

  /**
   * Форма создания
   */
  public function create()
  {
    $news = News::query()
      ->where('agency_id', auth()->user()->agency_id)
      ->orderBy('published_at', 'desc')
      ->limit(10)
      ->get();

    $categories = Category::all();
    $authors = User::query()->where('role', 10)->get();

    return view('admin.photo-reportage.create', compact('news', 'authors', 'categories'));
  }

  /**
   * Поиск новостей для select2
   */
  public function searchNews(Request $request)
  {
    $search = $request->input('q');

    $news = News::query()
      ->where('agency_id', auth()->user()->agency_id)
      ->when($search, function ($query) use ($search) {
        return $query->where('title', 'like', "%{$search}%");
      })
      ->orderBy('published_at', 'desc')
      ->limit(20)
      ->get();

    return response()->json([
      'results' => $news->map(function ($item) {
        return [
          'id'   => $item->id,
          'text' => $item->title,
        ];
      }),
    ]);
  }

  /**
   * Сохранение новой записи
   */
  public function store(StoreRequest $request)
  {
    try {
      DB::beginTransaction();

      $data = $request->validated();

      // Главное изображение
      if ($request->hasFile('image_main')) {
        $data['image_main'] = $request->file('image_main')->store('photo_reportages');
      }

      // Слайды
      $slides = [];
      if ($request->hasFile('slides')) {
        foreach ($request->file('slides') as $file) {
          if ($file->isValid()) {
            $slides[] = $file->store('photo_reportages/slides');
          }
        }
      }
      $data['slides'] = json_encode($slides);

      PhotoReportage::create($data);

      DB::commit();

      return redirect()
        ->route('admin.photoReportage.index')
        ->with('success', 'Фоторепортаж успешно создан');

    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Ошибка при создании фоторепортажа: ' . $e->getMessage());

      return back()
        ->withInput()
        ->with('error', 'Произошла ошибка при создании фоторепортажа: ' . $e->getMessage());
    }
  }

  public function show(string $id)
  {
    //
  }

  /**
   * Форма редактирования
   */
  public function edit(PhotoReportage $reportage)
  {
    $news = News::query()
      ->where('agency_id', auth()->user()->agency_id)
      ->orderBy('published_at', 'desc')
      ->limit(10)
      ->get();

    $categories = Category::all();
    $authors = User::query()->where('role', 10)->get();

    return view('admin.photo-reportage.edit', compact('reportage', 'categories', 'authors', 'news'));
  }

  /**
   * Обновление записи
   */
  public function update(UpdateRequest $request, PhotoReportage $reportage)
  {
    try {
      DB::beginTransaction();

      $data = $request->validated();
      $currentSlides = $reportage->slides_array;

      // Слайды, которые пользователь удалил
      $removedSlides = json_decode($request->input('removed_slides'), true) ?? [];

      // Убираем удалённые из массива
      $updatedSlides = array_values(array_diff($currentSlides, $removedSlides));

      // Добавляем новые слайды
      if ($request->hasFile('slides')) {
        foreach ($request->file('slides') as $file) {
          if ($file->isValid()) {
            $updatedSlides[] = $file->store('photo_reportages/slides');
          }
        }
      }

      // Хотя бы один слайд должен остаться
      if (empty($updatedSlides)) {
        throw new \Exception('Должен остаться хотя бы один слайд');
      }

      // Главное изображение — заменяем, если загружено новое
      if ($request->hasFile('image_main')) {
        if ($reportage->image_main && Storage::exists($reportage->image_main)) {
          Storage::delete($reportage->image_main);
        }
        $data['image_main'] = $request->file('image_main')->store('photo_reportages');
      }

      // Физически удаляем слайды, отмеченные на удаление
      foreach ($removedSlides as $removedSlide) {
        if (Storage::exists($removedSlide)) {
          Storage::delete($removedSlide);
        }
      }

      $data['slides'] = json_encode($updatedSlides);

      $reportage->update($data);

      DB::commit();

      // AJAX — возвращаем JSON с URL для редиректа
      if ($request->ajax() || $request->expectsJson()) {
        return response()->json([
          'success'  => true,
          'message'  => 'Фоторепортаж успешно обновлён',
          'redirect' => route('admin.photoReportage.index'),
        ]);
      }

      return redirect()
        ->route('admin.photoReportage.index')
        ->with('success', 'Фоторепортаж успешно обновлён');

    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Ошибка при обновлении фоторепортажа: ' . $e->getMessage());

      if ($request->ajax() || $request->expectsJson()) {
        return response()->json([
          'success' => false,
          'message' => $e->getMessage() ?: 'Произошла ошибка при обновлении фоторепортажа',
        ], 422);
      }

      return back()
        ->withInput()
        ->with('error', 'Произошла ошибка при обновлении фоторепортажа');
    }
  }

  /**
   * Удаление записи
   */
  public function destroy(PhotoReportage $reportage)
  {
    // Удаляем главное изображение
    if ($reportage->image_main && Storage::exists($reportage->image_main)) {
      Storage::delete($reportage->image_main);
    }

    // Удаляем слайды
    foreach ($reportage->slides_array as $slide) {
      if (Storage::exists($slide)) {
        Storage::delete($slide);
      }
    }

    $reportage->delete();

    return to_route('admin.photoReportage.index');
  }
}
