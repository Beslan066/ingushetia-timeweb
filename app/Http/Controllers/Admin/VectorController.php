<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Vector;
use App\Models\VectorSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vectors = Vector::query()->get();

        $vectorsCount = $vectors->count();

        return view('admin.vector.index', compact('vectorsCount', 'vectors'));
    }

    /**
     * Show the form for creating a new resource.
     */
  public function create()
  {

    $categories = Category::all();


    return view('admin.vector.create', [
      'categories' => $categories,
    ]);
  }

  /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'category_id' => 'nullable',
      'image_main' => 'nullable|image|mimes:webp|max:2048',
      'sections.*.title' => 'required|string|max:255',
      'sections.*.content' => 'required|string',
    ]);

    // Создаем регион
    $vector = Vector::create([
      'name' => $request->name,
      'category_id' => $request->category_id,
      'description' => $request->description,
      'image_main' => $request->file('image_main') ? $request->file('image_main')->store('vectors') : null,
    ]);

    // Создаем секции
    if ($request->sections) {
      foreach ($request->sections as $index => $sectionData) {
        VectorSection::create([
          'vector_id' => $vector->id,
          'title' => $sectionData['title'],
          'content' => $sectionData['content'],
        ]);
      }
    }

    return redirect()->route('admin.vectors.index')->with('success', 'Вектор успешно создан');
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
    public function edit(Vector $vector)
    {

      $categories = Category::all();

      $vector->load('sections');
        return view('admin.vector.edit', compact('vector', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
  public function update(Request $request, Vector $vector)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'category_id' => 'nullable|exists:categories,id',
      'image_main' => 'nullable|image|mimes:webp|max:2048',
      'sections.*.title' => 'required|string|max:255',
      'sections.*.content' => 'required|string',
    ]);

    // Обновляем основную информацию вектора
    $vectorData = [
      'name' => $request->name,
      'description' => $request->description,
      'category_id' => $request->category_id,
    ];

    if ($request->hasFile('image_main')) {
      // Удаляем старое изображение, если оно есть
      if ($vector->image_main) {
        Storage::delete($vector->image_main);
      }
      $vectorData['image_main'] = $request->file('image_main')->store('vectors');
    }

    $vector->update($vectorData);

    // Работаем с секциями
    if ($request->has('sections')) {
      $existingSectionIds = $vector->sections->pluck('id')->toArray();
      $updatedSectionIds = [];

      foreach ($request->sections as $sectionData) {
        if (isset($sectionData['id'])) {
          // Обновляем существующую секцию
          $section = VectorSection::find($sectionData['id']);
          if ($section) {
            $section->update([
              'title' => $sectionData['title'],
              'content' => $sectionData['content'],
            ]);
            $updatedSectionIds[] = $section->id;
          }
        } else {
          // Создаем новую секцию
          $newSection = VectorSection::create([
            'vector_id' => $vector->id,
            'title' => $sectionData['title'],
            'content' => $sectionData['content'],
          ]);
          $updatedSectionIds[] = $newSection->id;
        }
      }

      // Удаляем секции, которых нет в обновленных данных
      $sectionsToDelete = array_diff($existingSectionIds, $updatedSectionIds);
      if (!empty($sectionsToDelete)) {
        VectorSection::whereIn('id', $sectionsToDelete)->delete();
      }
    }

    return redirect()->route('admin.vectors.index')->with('success', 'Вектор успешно обновлен');
  }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
