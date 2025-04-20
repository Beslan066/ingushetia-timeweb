<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdministrationType\StoreRequest;
use App\Http\Requests\Admin\AdministrationType\UpdateRequest;
use App\Models\AdministrationType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdministrationTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $types = AdministrationType::orderBy('id', 'desc')->paginate(10);

        return view('admin.administration-type.index', compact('types'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();
        return view('admin.administration-type.create', compact('authors'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $types = AdministrationType::firstOrCreate($data);

        $types->save();


        return to_route('admin.administrationTypes.index');
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
    public function edit(AdministrationType  $administrationType)
    {
       return view('admin.administration-type.edit', compact('administrationType'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, AdministrationType $administrationType)
    {
        $data = $request->validated();


        $administrationType->update($data);

        return to_route('admin.administrationTypes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdministrationType $administrationType)
    {
        $administrationType->delete();

        return to_route('admin.administrationTypes.index');
    }
}
