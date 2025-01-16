<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AwardPolitic\UpdateRequest;
use App\Http\Requests\Admin\AwardPolitic\StoreRequest;
use App\Models\Agency;
use App\Models\AwardPolitic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class AwardPoliticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $awardPolitics = AwardPolitic::query()->where('agency_id', auth()->user()->agency_id)->orderBy('id', 'desc')->paginate(10);

        return view('admin.award-politic.index', compact('awardPolitics', ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $types = AwardPolitic::getTypes();


        return view('admin.award-politic.create', compact('types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('awardPolitic', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }


        $awardPolitics = AwardPolitic::create($data);

        return redirect()->route('admin.awardPolitics.index');
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
    public function edit(AwardPolitic $awardPolitic)
    {


        $types = AwardPolitic::getTypes();

        return view('admin.award-politic.edit', compact('awardPolitic', 'types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, AwardPolitic $awardPolitic)
    {
        $data = $request->validated();

        if (isset($data['file'])) {
            $path = Storage::put('awardPolitic', $data['file']);
            // Сохранение пути к изображению в базе данных
            $data['file'] = $path ?? null;
        }

        $awardPolitic->update($data);

        return redirect()->route('admin.awardPolitics.index')->with('success', 'Award Politic updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AwardPolitic $awardPolitic)
    {
        $awardPolitic->delete();

        return to_route('admin.awardPolitics.index');
    }
}
