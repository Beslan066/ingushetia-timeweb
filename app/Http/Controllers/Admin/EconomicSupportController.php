<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EconomicSupport\UpdateRequest;
use App\Http\Requests\Admin\EconomicSupport\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\EconomicSupport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PHPUnit\TextUI\Configuration\Php;


class EconomicSupportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $economicSupports = EconomicSupport::query()->orderBy('id', 'desc')->paginate(10);

        return view('admin.economic-support.index', compact('economicSupports'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();


        return view('admin.economic-support.create', compact('authors'));
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

        // Обработка значения чекбокса
        $data['type'] = $request->has('type') ? 1 : 0;

        $economicSupport = EconomicSupport::create($data);

        return redirect()->route('admin.economicSupports.index');
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
    public function edit(EconomicSupport $economicSupport)
    {
        $authors = User::query()->where('role', 10)->get();

        return view('admin.economic-support.edit', compact('economicSupport', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, EconomicSupport $economicSupport)
    {
        $data = $request->validated();

        if (isset($data['document'])) {
            $path = Storage::put('documents', $data['document']);
            // Сохранение пути к изображению в базе данных
            $data['document'] = $path ?? null;
        }

        // Обработка значения чекбокса
        $data['type'] = $request->has('type') ? 1 : 0;

        $economicSupport->update($data);

        return redirect()->route('admin.economicSupports.index')->with('success', 'anticorruption updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EconomicSupport $economicSupport)
    {
        $economicSupport->delete();

        return to_route('admin.economicSupports.index');
    }
}
