<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Administration\StoreRequest;
use App\Http\Requests\Admin\Administration\UpdateRequest;
use App\Models\Administration;
use App\Models\AdministrationType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdministrationController extends Controller
{
  public function index()
  {


    $administrations = Administration::query()->orderBy('id', 'desc')->paginate(10);

    return view('admin.administration.index', compact('administrations', ));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {


    $types = AdministrationType::query()->orderBy('id', 'desc')->get();

    return view('admin.administration.create', compact('types'));
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreRequest $request)
  {
    $data = $request->validated();

    if (isset($data['image_main'])) {
      $path = Storage::put('images', $data['image_main']);
    }

    // Сохранение пути к изображению в базе данных
    $data['image_main'] = $path ?? null;


    $administrations = Administration::create($data);

    return redirect()->route('admin.administrations.index');
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
  public function edit(Administration $administration)
  {


    $types = AdministrationType::query()->orderBy('id', 'desc')->get();

    return view('admin.administration.edit', [
      'administration' => $administration,
      'types' => $types
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateRequest $request, Administration $administration)
  {
    $data = $request->validated();

    if (isset($data['image_main'])) {
      // Удаляем старое изображение, если оно существует
      if ($administration->image_main) {
        Storage::delete($administration->image_main);
      }

      // сохраняем новое изображение
      $data['image_main'] = Storage::put('images', $data['image_main']);
    } else {
      // если изображение не загружено, используем старое значение
      $data['image_main'] = $administration->image_main;
    }

    $administration->update($data);

    return redirect()->route('admin.administrations.index')->with('success', 'administration updated successfully');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Administration $administration)
  {
    $administration->delete();

    return to_route('admin.administrations.index');
  }
}
