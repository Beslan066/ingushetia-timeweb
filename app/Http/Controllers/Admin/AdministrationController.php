<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Administration\StoreRequest;
use App\Http\Requests\Admin\Administration\UpdateRequest;
use App\Models\Administration;
use App\Models\AdministrationType;
use Illuminate\Support\Facades\Storage;

class AdministrationController extends Controller
{
  public function index()
  {
    $administrations = Administration::query()->orderBy('id', 'desc')->paginate(10);

    return view('admin.administration.index', compact('administrations'));
  }

  public function create()
  {
    $types = AdministrationType::query()->orderBy('id', 'desc')->get();

    return view('admin.administration.create', compact('types'));
  }

  public function store(StoreRequest $request)
  {
    $data = $request->validated();

    // ТОТ ЖЕ диск, что и в update — без disk('public'), дефолтный
    $data['image_main'] = $request->hasFile('image_main')
      ? Storage::put('images', $request->file('image_main'))
      : null;

    Administration::create($data);

    return redirect()->route('admin.administrations.index')
      ->with('success', 'Запись успешно создана');
  }

  public function show(string $id)
  {
    //
  }

  public function edit(Administration $administration)
  {
    $types = AdministrationType::query()->orderBy('id', 'desc')->get();

    return view('admin.administration.edit', [
      'administration' => $administration,
      'types'          => $types,
    ]);
  }

  public function update(UpdateRequest $request, Administration $administration)
  {
    $data = $request->validated();

    // 1. Загружено новое фото
    if ($request->hasFile('image_main')) {
      if ($administration->image_main && Storage::exists($administration->image_main)) {
        Storage::delete($administration->image_main);
      }
      $data['image_main'] = Storage::put('images', $request->file('image_main'));
    }
    // 2. Удалить
    elseif ($request->input('remove_image') == '1') {
      if ($administration->image_main && Storage::exists($administration->image_main)) {
        Storage::delete($administration->image_main);
      }
      $data['image_main'] = null;
    }
    // 3. Оставить старое
    else {
      $data['image_main'] = $administration->image_main;
    }

    unset($data['remove_image']);

    $administration->update($data);

    return redirect()
      ->route('admin.administrations.index')
      ->with('success', 'Запись успешно обновлена');
  }

  public function destroy(Administration $administration)
  {
    if ($administration->image_main && Storage::exists($administration->image_main)) {
      Storage::delete($administration->image_main);
    }

    $administration->delete();

    return to_route('admin.administrations.index')
      ->with('success', 'Запись успешно удалена');
  }
}
