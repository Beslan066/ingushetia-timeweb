<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Government;
use App\Models\GovernmentSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GovernmentController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $government = Government::query()->take(1)->get()->last();

    if (isset($government)) {
      $governmentCount = $government->count();

      return view('admin.government.index', compact('government', 'governmentCount'));
    }else {

      $governmentCount = 0;

      return view('admin.government.index', compact('government', 'governmentCount'));
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

    return view('admin.government.create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'image_main' => 'nullable|image|mimes:webp,jpg,jpeg,png|max:2048',
      'sections.*.title' => 'required|string|max:255',
      'sections.*.content' => 'required|string',
    ]);

    // Создаем  правительство
    $government = Government::create([
      'name' => $request->name,
      'description' => $request->description,
      'image_main' => $request->file('image_main') ? $request->file('image_main')->store('government') : null,
    ]);

    // Создаем секции
    if ($request->sections) {
      foreach ($request->sections as $index => $sectionData) {
        GovernmentSection::create([
          'government_id' => $government->id,
          'title' => $sectionData['title'],
          'content' => $sectionData['content'],
        ]);
      }
    }

    return redirect()->route('admin.governments.index')->with('success', 'Правительство успешно создано');
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
  public function edit(Government $government)
  {

    $government->load('sections');
    return view('admin.government.edit', compact('government'));
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Government $government)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'image_main' => 'nullable|image|mimes:webp|max:2048',
      'sections.*.title' => 'required|string|max:255',
      'sections.*.content' => 'required|string',
    ]);

    // Обновляем основную информацию вектора
    $governmentData = [
      'name' => $request->name,
      'description' => $request->description,
    ];

    if ($request->hasFile('image_main')) {
      // Удаляем старое изображение, если оно есть
      if ($government->image_main) {
        Storage::delete($government->image_main);
      }
      $governmentData['image_main'] = $request->file('image_main')->store('government');
    }

    $government->update($governmentData);

    // Работаем с секциями
    if ($request->has('sections')) {
      $existingSectionIds = $government->sections->pluck('id')->toArray();
      $updatedSectionIds = [];

      foreach ($request->sections as $sectionData) {
        if (isset($sectionData['id'])) {
          // Обновляем существующую секцию
          $section = GovernmentSection::find($sectionData['id']);
          if ($section) {
            $section->update([
              'title' => $sectionData['title'],
              'content' => $sectionData['content'],
            ]);
            $updatedSectionIds[] = $section->id;
          }
        } else {
          // Создаем новую секцию
          $newSection = GovernmentSection::create([
            'government_id' => $government->id,
            'title' => $sectionData['title'],
            'content' => $sectionData['content'],
          ]);
          $updatedSectionIds[] = $newSection->id;
        }
      }

      // Удаляем секции, которых нет в обновленных данных
      $sectionsToDelete = array_diff($existingSectionIds, $updatedSectionIds);
      if (!empty($sectionsToDelete)) {
        GovernmentSection::whereIn('id', $sectionsToDelete)->delete();
      }
    }

    return redirect()->route('admin.governments.index')->with('success', 'Правительство успешно обновлено');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
