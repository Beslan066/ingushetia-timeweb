<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\NationalProject\UpdateRequest;
use App\Http\Requests\Admin\NationalProject\StoreRequest;
use App\Models\Agency;
use App\Models\NationalProject;
use App\Models\PhotoReportage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PHPUnit\TextUI\Configuration\Php;


class NationalProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $natProjects = NationalProject::with('user')->orderBy('id', 'desc')->paginate(10);

        return view('admin.nat-project.index', compact('natProjects' ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $reportages = PhotoReportage::all();
        $authors = User::query()->where('role', 10)->get();


        return view('admin.nat-project.create', compact('authors',  'reportages'));
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


        $natProjects = NationalProject::create($data);

        return redirect()->route('admin.natProjects.index');
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
    public function edit(NationalProject $nationalProject)
    {


        $reportages = PhotoReportage::all();

        $authors = User::query()->where('role', 10)->get();

        return view('admin.nat-project.edit', compact('nationalProject', 'authors', 'reportages'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, NationalProject $nationalProject)
    {
        $data = $request->validated();
        if (isset($data['image_main'])) {
            $path = Storage::put('images', $data['image_main']);
            // Сохранение пути к изображению в базе данных
            $data['image_main'] = $path ?? null;
        }


        $nationalProject->update($data);

        return redirect()->route('admin.natProjects.index')->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NationalProject $nationalProject)
    {
        $nationalProject->delete();

        return to_route('admin.natProjects.index');
    }
}
