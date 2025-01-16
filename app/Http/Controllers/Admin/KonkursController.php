<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Konkurs\UpdateRequest;
use App\Http\Requests\Admin\Konkurs\StoreRequest;
use App\Models\Agency;
use App\Models\Konkurs;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class KonkursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $konkurses = Konkurs::query()->where('agency_id', auth()->user()->agency_id)->orderBy('id', 'desc')->paginate(10);

        return view('admin.konkurs.index', compact('konkurses', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $types = Konkurs::getTypes();


        return view('admin.konkurs.create', compact('types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('konkurses', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }


        $konkurses = Konkurs::create($data);

        return redirect()->route('admin.konkurses.index');
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
    public function edit(Konkurs $konkurs)
    {


        $types = Konkurs::getTypes();

        return view('admin.konkurs.edit', compact('konkurs', 'types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Konkurs $konkurses)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('konkurses', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }

        $konkurs->update($data);

        return redirect()->route('admin.konkurses.index')->with('success', 'konkurs updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Konkurs $konkurs)
    {
        $konkurs->delete();

        return to_route('admin.konkurses.index');
    }
}
