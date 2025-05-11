<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Minister\UpdateRequest;
use App\Http\Requests\Admin\Minister\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Minister;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class MinisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $ministers = Minister::query()->orderBy('priority', 'asc')->paginate(10);

        return view('admin.minister.index', compact('ministers', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return view('admin.minister.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            $path = Storage::put('images', $data['image_main']);
        }

        // Сохранение пути к изображению в базе данных
        $data['image_main'] = $path ?? null;


        $ministers = Minister::create($data);

        return redirect()->route('admin.ministers.index');
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
    public function edit(Minister $minister)
    {

        return view('admin.minister.edit', [
            'minister' => $minister
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Minister $minister)
{
    $data = $request->validated();

    if (isset($data['image_main'])) {
        // Удаляем старое изображение, если оно существует
        if ($minister->image_main) {
            Storage::delete($minister->image_main);
        }

        // сохраняем новое изображение
        $data['image_main'] = Storage::put('images', $data['image_main']);
    } else {
        // если изображение не загружено, используем старое значение
        $data['image_main'] = $minister->image_main;
    }

    $minister->update($data);

    return redirect()->route('admin.ministers.index')->with('success', 'Minister updated successfully');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Minister $minister)
    {
        $minister->delete();

        return to_route('admin.ministers.index');
    }
}
