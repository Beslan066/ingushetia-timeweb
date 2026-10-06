<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Minister\UpdateRequest;
use App\Http\Requests\Admin\Minister\StoreRequest;
use App\Models\Minister;
use Illuminate\Support\Facades\Storage;

class MinisterController extends Controller
{
  public function index()
  {
    $ministers = Minister::query()->orderBy('priority', 'asc')->paginate(10);

    return view('admin.minister.index', compact('ministers'));
  }

  public function create()
  {
    return view('admin.minister.create');
  }

  public function store(StoreRequest $request)
  {
    $data = $request->validated();

    $data['image_main'] = $request->hasFile('image_main')
      ? Storage::put('images', $request->file('image_main'))
      : null;

    Minister::create($data);

    return redirect()->route('admin.ministers.index')
      ->with('success', 'Запись успешно создана');
  }

  public function show(string $id)
  {
    //
  }

  public function edit(Minister $minister)
  {
    return view('admin.minister.edit', [
      'minister' => $minister,
    ]);
  }

  public function update(UpdateRequest $request, Minister $minister)
  {
    $data = $request->validated();

    if ($request->hasFile('image_main')) {
      if ($minister->image_main && Storage::exists($minister->image_main)) {
        Storage::delete($minister->image_main);
      }
      $data['image_main'] = Storage::put('images', $request->file('image_main'));
    }
    elseif ($request->input('remove_image') == '1') {
      if ($minister->image_main && Storage::exists($minister->image_main)) {
        Storage::delete($minister->image_main);
      }
      $data['image_main'] = null;
    }
    else {
      $data['image_main'] = $minister->image_main;
    }

    unset($data['remove_image']);

    $minister->update($data);

    return redirect()->route('admin.ministers.index')
      ->with('success', 'Запись успешно обновлена');
  }

  public function destroy(Minister $minister)
  {
    if ($minister->image_main && Storage::exists($minister->image_main)) {
      Storage::delete($minister->image_main);
    }

    $minister->delete();

    return to_route('admin.ministers.index')
      ->with('success', 'Запись успешно удалена');
  }
}
