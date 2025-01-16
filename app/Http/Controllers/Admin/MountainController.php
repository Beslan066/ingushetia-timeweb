<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Mountain\UpdateRequest;
use App\Http\Requests\Admin\Mountain\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Mountain;
use App\Models\PhotoReportage;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PHPUnit\TextUI\Configuration\Php;


class MountainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $mountains = Mountain::with('user')->orderBy('id', 'desc')->paginate(10);

        return view('admin.mountain.index', compact('mountains' ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $reportages = PhotoReportage::query()->where('mountain_reportage', '=', 1)->get();
        $authors = User::query()->where('role', 10)->get();


        return view('admin.mountain.create', compact('authors', 'reportages'));
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

        $mountains = Mountain::create($data);

        return redirect()->route('admin.mountains.index');
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
    public function edit(Mountain $mountain)
    {
        $authors = User::query()->where('role', 10)->get();
        $reportages = PhotoReportage::query()->where('mountain_reportage', '=', 1)->get();


        return view('admin.mountain.edit', compact('mountain', 'authors', 'reportages'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Mountain $mountain)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            $path = Storage::put('images', $data['image_main']);
            // Сохранение пути к изображению в базе данных
            $data['image_main'] = $path ?? null;
        }


        $mountain->update($data);

        return redirect()->route('admin.mountains.index')->with('success', 'Mountain updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mountain $mountain)
    {
        $mountain->delete();

        return to_route('admin.mountains.index');
    }
}
