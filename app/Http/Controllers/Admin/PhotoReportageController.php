<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PhotoReportage\UpdateRequest;
use App\Http\Requests\Admin\PhotoReportage\StoreRequest;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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


        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();


        return view('admin.photo-reportage.create', compact('authors', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $slidesJson = [];

        if ($request->hasFile('slides')) {
            $slidesArray = [];
            $slides = $request->file('slides');

            foreach ($slides as $slide) {
                $filename = $slide->store('slide_images'); // Сохраняем изображение слайда и получаем имя файла
                $slidesArray[] = $filename; // Добавляем имя файла в массив
            }

            $slidesJson = json_encode($slidesArray); // Кодируем массив имен файлов в формат JSON
        }

        if ($request->hasFile('image_main')) {
            $imageMain = $request->file('image_main');
            $imageMainPath = $imageMain->store('images'); // Сохраняем изображение в папке 'images'

            $data['image_main'] = $imageMainPath;
        }


        $news = PhotoReportage::create([
            'title' => $request->title,
            'user_id' => $request->user_id,
            'lead' => $request->lead,
            'agency_id' => $request->agency_id,
            'published_at' => $request->published_at,
            'image_main' => $data['image_main'],
            'slides' => $slidesJson, // Используем переменную $slidesJson
        ]);



        return redirect()->route('admin.photoReportage.index');
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

        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();

        return view('admin.photo-reportage.edit', compact('reportage', 'categories', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, PhotoReportage $reportage)
    {
        $data = $request->validated();

        // Преобразование строки JSON в массив
        $removedSlides = !empty($data['remove_slides']) ? json_decode($data['remove_slides'], true) : [];

        // Получаем существующие слайды из базы данных
        $existingSlides = json_decode($reportage->slides, true) ?: [];

        // Проверка и удаление слайдов
        if (!empty($removedSlides)) {
            // Удаляем слайды из массива существующих слайдов
            $existingSlides = array_diff($existingSlides, $removedSlides);

            // Удаляем файлы с диска
            foreach ($removedSlides as $slide) {
                Storage::delete($slide);
            }
        }

        // Добавление новых слайдов
        if ($request->hasFile('slides')) {
            foreach ($request->file('slides') as $slide) {
                $filename = $slide->store('slide_images');
                $existingSlides[] = $filename;
            }
        }

        // Обновляем список слайдов
        $data['slides'] = json_encode(array_values($existingSlides));

        // Обработка основного изображения
        if ($request->hasFile('image_main')) {
            $imageMain = $request->file('image_main');
            $imageMainPath = $imageMain->store('images');
            $data['image_main'] = $imageMainPath;
        }

        // Обновление фоторепортажа
        $reportage->update($data);

        return redirect()->route('admin.photoReportage.index')->with('success', 'Фоторепортаж успешно обновлен');
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
