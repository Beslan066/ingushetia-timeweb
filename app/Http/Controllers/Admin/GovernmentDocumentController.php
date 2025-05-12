<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GovernmentDocument\UpdateRequest;
use App\Http\Requests\Admin\GovernmentDocument\StoreRequest;
use App\Models\Agency;
use App\Models\GovernmentDocument;
use App\Models\GovernmentDocumentCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class GovernmentDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $documents = GovernmentDocument::query()->where('agency_id', auth()->user()->agency_id)->orderBy('id', 'desc')->paginate(10);

        return view('admin.government-document.index', compact('documents', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $types = GovernmentDocumentCategory::all();


        return view('admin.government-document.create', compact('types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('documents', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }


        $documents = GovernmentDocument::create($data);

        return redirect()->route('admin.governmentDocuments.index');
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
    public function edit(GovernmentDocument $document)
    {


        $types = GovernmentDocumentCategory::all();

        return view('admin.government-document.edit', compact('document', 'types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, GovernmentDocument $document)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('documents', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }

        $document->update($data);

        return redirect()->route('admin.governmentDocuments.index')->with('success', 'Document updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GovernmentDocument $document)
    {
        $document->delete();

        return to_route('admin.governmentDocuments.index');
    }
}
