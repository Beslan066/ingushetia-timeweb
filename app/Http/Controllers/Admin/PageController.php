<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Page\StoreRequest;
use App\Http\Requests\Admin\Page\UpdateRequest;
use App\Models\Page;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $pages = Page::orderBy('id', 'desc')->paginate(10);

        return view('admin.page.index', compact('pages'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


        $pages = Page::all();

        $authors = User::query()->where('role', 10)->get();
        return view('admin.page.create', compact('authors', 'pages'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $data['url'] = Str::slug($data['title']);
        // Обработка значения чекбокса
        $data['important'] = $request->has('important') ? 1 : 0;

        $page = Page::create($data);

        return redirect()->route('admin.page.index');
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
    public function edit(Page  $page)
    {

        $pages = Page::all();

        $authors = User::query()->where('role', 10)->get();
       return view('admin.page.edit', compact('page', 'authors', 'pages'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Page $page)
    {
        $data = $request->validated();
        $data['url'] = Str::slug($data['title']);
        // Обработка значения чекбокса
        $data['important'] = $request->has('important') ? 1 : 0;


        $page->update($data);

        return to_route('admin.page.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        $page->delete();

        return to_route('admin.page.index');
    }
}
