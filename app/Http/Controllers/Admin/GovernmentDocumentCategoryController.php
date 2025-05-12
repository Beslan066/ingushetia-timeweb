<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GovernmentDocumentCategory\StoreRequest;
use App\Http\Requests\Admin\GovernmentDocumentCategory\UpdateRequest;
use App\Models\GovernmentDocumentCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GovernmentDocumentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $categories = GovernmentDocumentCategory::orderBy('id', 'desc')->paginate(10);

        return view('admin.governmentDocumentCategory.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return view('admin.governmentDocumentCategory.create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $category = GovernmentDocumentCategory::firstOrCreate($data);

        $category->save();


        return to_route('admin.governmentDocumentCategorys.index');
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
    public function edit(GovernmentDocumentCategory  $category)
    {
       return view('admin.governmentDocumentCategory.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, GovernmentDocumentCategory $category)
    {
        $data = $request->validated();


        $category->update($data);

        return to_route('admin.governmentDocumentCategorys.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GovernmentDocumentCategory $category)
    {
        $category->delete();

        return to_route('admin.governmentDocumentCategorys.index');
    }
}
