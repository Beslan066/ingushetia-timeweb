<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Anticorruption\UpdateRequest;
use App\Http\Requests\Admin\Anticorruption\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Anticorruption;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PHPUnit\TextUI\Configuration\Php;


class AnticorruptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $anticorruptions = Anticorruption::with('user')->orderBy('id', 'desc')->paginate(10);

        return view('admin.anticorruption.index', compact('anticorruptions'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();


        return view('admin.anticorruption.create', compact('authors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['document'])) {
            $path = Storage::put('documents', $data['document']);
            // Сохранение пути к изображению в базе данных
            $data['document'] = $path ?? null;
        }

        $anticorruption = Anticorruption::create($data);

        return redirect()->route('admin.anticorruptions.index');
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
    public function edit(Anticorruption $anticorruption)
    {
        $authors = User::query()->where('role', 10)->get();

        return view('admin.anticorruption.edit', compact('anticorruption', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Anticorruption $anticorruption)
    {
        $data = $request->validated();

        if (isset($data['document'])) {
            $path = Storage::put('documents', $data['document']);
            // Сохранение пути к изображению в базе данных
            $data['document'] = $path ?? null;
        }
        $anticorruption->update($data);

        return redirect()->route('admin.anticorruptions.index')->with('success', 'anticorruption updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anticorruption $anticorruption)
    {
        $anticorruption->delete();

        return to_route('admin.anticorruptions.index');
    }
}
