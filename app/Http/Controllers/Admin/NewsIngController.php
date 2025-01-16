<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\NewsIng\UpdateRequest;
use App\Http\Requests\Admin\NewsIng\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\NewsIng;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class NewsIngController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = NewsIng::with( 'category')->orderBy('id', 'desc')->paginate(10);

        return view('admin.news-ing.index', compact('news', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();


        return view('admin.news-ing.create', compact('authors', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image_main')) {
            $image = $request->file('image_main');

            $imagePath = $image->store('images'); // Сохранить изображение в storage/app/public/images

            $data['image_main'] = $imagePath;
        }


        $news = NewsIng::create($data);

        return redirect()->route('admin.newsIng.index');
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
    public function edit(NewsIng $news)
    {

        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();

        return view('admin.news-ing.edit', compact('news', 'categories', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, NewsIng $news)
    {
        $data = $request->validated();
        $news->update($data);

        return redirect()->route('admin.newsIng.index')->with('success', 'News updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NewsIng $news)
    {
        $news->delete();

        return to_route('admin.newsIng.index');
    }
}
