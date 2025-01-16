<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MilitarySupport\UpdateRequest;
use App\Http\Requests\Admin\MilitarySupport\StoreRequest;
use App\Models\Agency;
use App\Models\MilitarySupport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PHPUnit\TextUI\Configuration\Php;


class MilitarySupportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $supports = MilitarySupport::with('user')->orderBy('id', 'desc')->paginate(10);

        return view('admin.military-support.index', compact('supports' ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();


        return view('admin.military-support.create', compact('authors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();


        $supports = MilitarySupport::create($data);

        return redirect()->route('admin.militarySupport.index');
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
    public function edit(MilitarySupport $militarySupport)
    {


        $authors = User::query()->where('role', 10)->get();

        return view('admin.military-support.edit', compact('militarySupport', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, MilitarySupport $militarySupport)
    {
        $data = $request->validated();

        $militarySupport->update($data);

        return redirect()->route('admin.militarySupport.index')->with('success', 'Support updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MilitarySupport $militarySupport)
    {
        $militarySupport->delete();

        return to_route('admin.militarySupport.index');
    }
}
