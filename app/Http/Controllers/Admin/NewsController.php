<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\News\UpdateRequest;
use App\Http\Requests\Admin\News\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\User;
use App\Models\Video;
use Binafy\LaravelUserMonitoring\Models\VisitMonitoring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use PHPUnit\TextUI\Configuration\Php;


class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authUser = Auth::user()->agency_id;

        $news = News::query()->where('agency_id', auth()->user()->agency_id)->with('user', 'category', 'video')->orderBy('published_at', 'desc')->paginate(10);
        $agencyNews = News::query()->where('agency_id', $authUser)->paginate(10);

        return view('admin.news.index', compact('news', 'agencyNews' ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $reportages = PhotoReportage::all();
        $videos = Video::all();
        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();


        return view('admin.news.create', compact('authors', 'categories', 'videos', 'reportages'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            $path = Storage::put('images', $data['image_main']);
            // Сохранение пути к изображению в базе данных
            $data['image_main'] = $path ?? null;
        }

        $data['url'] = Str::slug($data['title']);


        // Обработка значения чекбокса
        $data['main_material'] = $request->has('main_material') ? 1 : 0;


        $news = News::create($data);

        return redirect()->route('admin.news.index');
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
    public function edit(News $news)
    {


        $reportages = PhotoReportage::all();
        $videos = Video::all();

        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();

        return view('admin.news.edit', compact('news', 'categories', 'authors', 'videos', 'reportages'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, News $news)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            $path = Storage::put('images', $data['image_main']);
            // Сохранение пути к изображению в базе данных
            $data['image_main'] = $path ?? null;
        }

        $data['url'] = Str::slug($data['title']);

        // Обработка значения чекбокса
        $data['main_material'] = $request->has('main_material') ? 1 : 0;

        $news->update($data);

        return redirect()->route('admin.news.index')->with('success', 'News updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();
        return to_route('admin.news.index');
    }
}
