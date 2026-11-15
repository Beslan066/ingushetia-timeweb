<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\StoreRequest;
use App\Http\Requests\Admin\Tag\UpdateRequest;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class TagController extends Controller
{

  /**
   * Display a listing of the resource.
   */
  public function index()
  {

    $tags = Tag::orderBy('id', 'desc')->paginate(10);

    return view('admin.tag.index', compact('tags'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

    $tags = Tag::all();
    return view('admin.tag.create',  compact('tags'));

  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreRequest $request)
  {
    $data = $request->validated();

    $tag = Tag::firstOrCreate($data);

    $tag->save();


    return to_route('admin.tags.index');
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
  public function edit(Tag  $tag)
  {
    return view('admin.tag.edit', compact('tag'));
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateRequest $request, Tag $tag)
  {
    $data = $request->validated();


    $tag->update($data);

    return to_route('admin.tags.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Tag $tag)
  {
    $tag->delete();

    return to_route('admin.tags.index');
  }

  public function search(Request $request)
  {
    $search = $request->get('q');
    $tags = Tag::where('name', 'like', "%$search%")->get();
    return response()->json($tags);
  }
}
