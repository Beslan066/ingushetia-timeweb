<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FederalAuthority\UpdateRequest;
use App\Http\Requests\Admin\FederalAuthority\StoreRequest;
use App\Models\Agency;
use App\Models\Category;
use App\Models\FederalAuthority;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class FederalAuthorityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $federalAuthorities = FederalAuthority::query()->where('agency_id', auth()->user()->agency_id)->with('user')->orderBy('id', 'desc')->get();

        return view('admin.federal-authorities.index', compact('federalAuthorities', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();


        return view('admin.federal-authorities.create', compact('authors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $federalAuthorities = FederalAuthority::create($data);

        return redirect()->route('admin.federalAuthorities.index');
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
    public function edit(FederalAuthority $federalAuthority)
    {

        $authors = User::query()->where('role', 10)->get();

        return view('admin.federal-authorities.edit', compact('federalAuthority', 'authors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, FederalAuthority $federalAuthority)
    {
        $data = $request->validated();
        $federalAuthority->update($data);

        return redirect()->route('admin.federalAuthorities.index')->with('federal Authorities', 'resources updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FederalAuthority $federalAuthority)
    {
        $federalAuthority->delete();

        return to_route('admin.federalAuthorities.index');
    }
}
