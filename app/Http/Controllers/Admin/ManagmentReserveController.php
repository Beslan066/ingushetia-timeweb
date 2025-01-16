<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ManagmentReserve\UpdateRequest;
use App\Http\Requests\Admin\ManagmentReserve\StoreRequest;
use App\Models\Agency;
use App\Models\ManagmentReserve;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ManagmentReserveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $managmentReserves = ManagmentReserve::query()->where('agency_id', auth()->user()->agency_id)->orderBy('published_at', 'desc')->paginate(10);

        return view('admin.managment-reserve.index', compact('managmentReserves', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $types = ManagmentReserve::getTypes();

        return view('admin.managment-reserve.create', compact('types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('managmentReserves', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }


        $managmentReserves = ManagmentReserve::create($data);

        return redirect()->route('admin.managmentReserves.index');
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
    public function edit(ManagmentReserve $managmentReserve)
    {

        $types = ManagmentReserve::getTypes();

        return view('admin.managment-reserve.edit', compact('managmentReserve', 'types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, ManagmentReserve $managmentReserve)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('managmentReserves', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }

        $managmentReserve->update($data);

        return redirect()->route('admin.managmentReserves.index')->with('success', 'managmentReserve updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManagmentReserve $managmentReserve)
    {
        $managmentReserve->delete();

        return to_route('admin.managmentReserves.index');
    }
}
