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
     * Display a listing of the resource.
     */
    public function index()
    {


        $news = PhotoReportage::query()->where('agency_id', auth()->user()->agency_id)->orderBy('id', 'desc')->paginate(10);

        return view('admin.photo-reportage.index', compact('news'));
    }

    /**
     * Show the form for creating a new resource.
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

  public function searchNews(Request $request)
  {
    $search = $request->input('q');

    $news = News::query()
      ->where('agency_id', auth()->user()->agency_id)
      ->when($search, function($query) use ($search) {
        return $query->where('title', 'like', "%{$search}%");
      })
      ->orderBy('published_at', 'desc')
      ->limit(20)
      ->get();


    return response()->json([
      'results' => $news->map(function ($item) {
        return [
          'id' => $item->id,
          'text' => $item->title
        ];
      })
    ]);
  }

    /**
     * Store a newly created resource in storage.
     */
  public function store(StoreRequest $request)
  {
    try {
      DB::beginTransaction();

      $data = $request->validated();

      $slides = [];

      // Сохранение главного изображения
      if ($request->hasFile('image_main')) {
        $data['image_main'] = $request->file('image_main')->store('photo_reportages');
      }

      // Сохранение слайдов
      if ($request->hasFile('slides')) {
        Log::info('Количество полученных слайдов: ' . count($request->file('slides')));
        $slides = [];
        foreach ($request->file('slides') as $index => $file) {
          Log::info("Обработка слайда #{$index}");
          $slides[] = $file->store('photo_reportages/slides');
        }
        $data['slides'] = json_encode($slides);
      }

      // Создание фоторепортажа
      $photoReportage = PhotoReportage::create($data);

      DB::commit();

      return redirect()
        ->route('admin.photoReportage.index')
        ->with('success', 'Фоторепортаж успешно создан');

    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Ошибка при создании фоторепортажа: ' . $e->getMessage());

      return back()
        ->withInput()
        ->with('error', 'Произошла ошибка при создании фоторепортажа');
    }
  }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
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
     * Update the specified resource in storage.
     */


  public function update(UpdateRequest $request, PhotoReportage $reportage)
  {
    $data = $request->validated();

    $currentSlides = $reportage->slides_array;

    // Удаляем отмеченные слайды
    $removedSlides = json_decode($request->input('removed_slides'), true) ?? [];
    foreach ($removedSlides as $slidePath) {
      Storage::delete($slidePath);
    }

    $updatedSlides = array_values(array_diff($currentSlides, $removedSlides));

    // Добавляем новые слайды
    if ($request->hasFile('slides')) {
      foreach ($request->file('slides') as $file) {
        $updatedSlides[] = $file->store('photo_reportages/slides');
      }
    }

    // Удаляем старое главное изображение
    if ($request->hasFile('image_main')) {
      if ($reportage->image_main) {
        Storage::delete($reportage->image_main);
      }
      $data['image_main'] = $request->file('image_main')->store('photo_reportages');
    }

    // Обновляем slides
    $data['slides'] = json_encode($updatedSlides);

    $reportage->update($data);

    return redirect()->route('admin.photoReportage.index')
      ->with('success', 'Фоторепортаж успешно обновлен');
  }




  /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhotoReportage $reportage)
    {
        $reportage->delete();

        return to_route('admin.photoReportage.index');
    }
}
