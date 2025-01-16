<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CivilService\UpdateRequest;
use App\Http\Requests\Admin\CivilService\StoreRequest;
use App\Models\Agency;
use App\Models\CivilService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class CivilReserveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $civilReserves = CivilService::query()->where('agency_id', auth()->user()->agency_id)->orderBy('id', 'desc')->paginate(10);

        return view('admin.civil-reserve.index', compact('civilReserves', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $types = CivilService::getTypes();


        return view('admin.civil-reserve.create', compact('types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('civilReserve', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }


        $civilReserves = CivilService::create($data);

        return redirect()->route('admin.civilReserves.index');
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
    public function edit(CivilService $civilReserve)
    {


        $types = CivilService::getTypes();

        return view('admin.civil-reserve.edit', compact('civilReserve', 'types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, CivilService $civilReserve)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('civilReserve', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }

        $civilReserve->update($data);

        return redirect()->route('admin.civilReserves.index')->with('success', 'Civil Reserve updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CivilService $civilReserve)
    {
        $civilReserve->delete();

        return to_route('admin.civilReserves.index');
    }
}
