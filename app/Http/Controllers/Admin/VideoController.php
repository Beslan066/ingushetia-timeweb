<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Video\UpdateRequest;
use App\Http\Requests\Admin\Video\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\News;
use App\Models\Video;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;


class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $videos = Video::query()->where('agency_id', auth()->user()->agency_id)->with('user')->orderBy('id', 'desc')->paginate(10);

        return view('admin.video.index', compact('videos', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


        $authors = User::query()->where('role', 10)->get();
        $news = News::query()->orderBy('id', 'desc')->get();

        return view('admin.video.create', compact('authors', 'news'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            $path = Storage::put('images', $data['image_main']);
            $data['image_main'] = $path ?? null;
        }

        if (isset($data['video'])) {
            $path = Storage::put('videos', $data['video']);
            $data['video'] = $path ?? null;
        }

        $videos = Video::create($data);

        return redirect()->route('admin.videos.index');
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
    public function edit(Video $video)
    {

        $news = News::query()->orderBy('id', 'desc')->get();
        $authors = User::query()->where('role', 10)->get();

        // Преобразуем строку в объект Carbon
        if ($video->published_at) {
            $video->published_at = Carbon::parse($video->published_at);
        }

        return view('admin.video.edit', compact('video', 'news', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Video $video)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            // Удаляем старое изображение
            if ($video->image_main) {
                Storage::delete($video->image_main);
            }
            $path = Storage::put('images', $data['image_main']);
            $data['image_main'] = $path;
        }

        if (isset($data['video'])) {
            // Удаляем старое видео
            if ($video->video) {
                Storage::delete($video->video);
            }
            $path = Storage::put('videos', $data['video']);
            $data['video'] = $path;
        }

        if ($request->input('remove_video') == '1') {
            if ($video->video) {
                Storage::delete($video->video);
            }
            $data['video'] = null;
        }

        // Преобразуем дату и время в объект Carbon, если это строка
        if (isset($data['published_at'])) {
            $data['published_at'] = Carbon::parse($data['published_at']);

        }

        $video->update($data);

        return redirect()->route('admin.videos.index')->with('success', 'Видео успешно обновлено');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        $video->delete();

        return to_route('admin.videos.index');
    }
}
