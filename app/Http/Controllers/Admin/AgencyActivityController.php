<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AgencyActivity\StoreRequest;
use App\Http\Requests\Admin\AgencyActivity\UpdateRequest;
use App\Models\AgencyActivity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AgencyActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $agencies = AgencyActivity::orderBy('id', 'desc')->paginate(10);

        return view('admin.agency-activity.index', compact('agencies'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authors = User::query()->where('role', 10)->get();
        return view('admin.agency-activity.create', compact('authors'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $agencyActivity = AgencyActivity::firstOrCreate($data);

        $agencyActivity->save();


        return to_route('admin.agenciesActivity.index');
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
    public function edit(AgencyActivity  $agencyActivity)
    {
       return view('admin.agency-activity.edit', compact('agencyActivity'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, AgencyActivity $agencyActivity)
    {
        $data = $request->validated();


        $agencyActivity->update($data);

        return to_route('admin.agenciesActivity.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AgencyActivity $agencyActivity)
    {
        $agencyActivity->delete();

        return to_route('admin.agenciesActivity.index');
    }
}
