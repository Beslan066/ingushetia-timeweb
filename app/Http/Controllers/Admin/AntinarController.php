<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Antinar\UpdateRequest;
use App\Http\Requests\Admin\Antinar\StoreRequest;
use App\Models\Agency;
use App\Models\Antinar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class AntinarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $antinars = Antinar::query()->where('agency_id', auth()->user()->agency_id)->orderBy('id', 'desc')->paginate(10);

        return view('admin.antinar.index', compact('antinars', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $types = Antinar::getTypes();


        return view('admin.antinar.create', compact('types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('antinar', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }


        $antinars = Antinar::create($data);

        return redirect()->route('admin.antinars.index');
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
    public function edit(Antinar $antinar)
    {


        $types = Antinar::getTypes();

        return view('admin.antinar.edit', compact('antinar', 'types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Antinar $antinar)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('antinar', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }

        $antinar->update($data);

        return redirect()->route('admin.antinars.index')->with('success', 'Antinar updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Antinar $antinar)
    {
        $antinar->delete();

        return to_route('admin.antinars.index');
    }
}
