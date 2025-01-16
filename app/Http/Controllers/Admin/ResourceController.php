<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Resource\UpdateRequest;
use App\Http\Requests\Admin\Resource\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $resources = Resource::query()->where('agency_id', auth()->user()->agency_id)->with('user')->orderBy('id', 'desc')->get();

        return view('admin.resource.index', compact('resources', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();


        return view('admin.resource.create', compact('authors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $resources = Resource::create($data);

        return redirect()->route('admin.resources.index');
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
    public function edit(Resource $resource)
    {

        $authors = User::query()->where('role', 10)->get();

        return view('admin.resource.edit', compact('resource', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Resource $resource)
    {
        $data = $request->validated();
        $resource->update($data);

        return redirect()->route('admin.resources.index')->with('success', 'resources updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resource $resource)
    {
        $resource->delete();

        return to_route('admin.resources.index');
    }
}
