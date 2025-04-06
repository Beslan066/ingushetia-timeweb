<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Supervisor\UpdateRequest;
use App\Http\Requests\Admin\Supervisor\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Supervisor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class SupervisorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $peoples = Supervisor::query()->orderBy('id', 'desc')->paginate(10);

        return view('admin.supervisor.index', compact('peoples', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return view('admin.supervisor.create');
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


        $supervisors = Supervisor::create($data);

        return redirect()->route('admin.supervisors.index');
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
    public function edit(Supervisor $supervisor)
    {

        return view('admin.supervisor.edit', [
            'supervisor' => $supervisor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Supervisor $supervisor)
    {
        $data = $request->validated();

        if (isset($data['image_main'])) {
            // Удаляем старое изображение, если оно существует
            if ($supervisor->image_main) {
                Storage::delete($supervisor->image_main);
            }
            
            // сохраняем новое изображение
            $data['image_main'] = Storage::put('images', $data['image_main']);
        } else {
            // если изображение не загружено, используем старое значение
            $data['image_main'] = $supervisor->image_main;
        }
        $supervisor->update($data);

        return redirect()->route('admin.supervisors.index')->with('success', 'Supervisor updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supervisor $supervisor)
    {
        $supervisor->delete();

        return to_route('admin.supervisors.index');
    }
}
