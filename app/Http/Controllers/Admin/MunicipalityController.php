<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Municipality\UpdateRequest;
use App\Http\Requests\Admin\Municipality\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Municipality;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class MunicipalityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $municipalities = Municipality::paginate(10);

        return view('admin.municipality.index', compact('municipalities', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $types = Municipality::getTypes();
        $peoples = Supervisor::all();

        return view('admin.municipality.create', compact('peoples', 'types'));
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

        if (isset($data['arms'])) {
            $path = Storage::put('images/arms', $data['arms']);
            // Сохранение пути к изображению в базе данных
            $data['arms'] = $path ?? null;
        }


        $municipalities = Municipality::create($data);

        return redirect()->route('admin.municipalities.index');
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
    public function edit(Municipality $municipality)
    {

        $peoples = Supervisor::all();
        $types = Municipality::getTypes();


        return view('admin.municipality.edit', compact('peoples', 'municipality', 'types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Municipality $municipality)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            $path = Storage::put('images', $data['image_main']);
            // Сохранение пути к изображению в базе данных
            $data['image_main'] = $path ?? null;
        }

        if (isset($data['arms'])) {
            $path = Storage::put('images/arms', $data['arms']);
            // Сохранение пути к изображению в базе данных
            $data['arms'] = $path ?? null;
        }

        $municipality->update($data);

        return redirect()->route('admin.municipalities.index')->with('success', 'Municipality updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Municipality $municipality)
    {
        $municipality->delete();

        return to_route('admin.municipalities.index');
    }
}
