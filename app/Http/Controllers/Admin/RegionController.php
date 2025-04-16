<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Models\RegionSection;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $region = Region::query()->take(1)->get()->last();

        $regionCount = $region->count();

        return view('admin.region.index', compact('regionCount', 'region'));
    }

    /**
     * Show the form for creating a new resource.
     */
  public function create()
  {
    return view('admin.region.create');
  }

  /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'image_main' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
      'sections.*.title' => 'required|string|max:255',
      'sections.*.content' => 'required|string',
    ]);

    // Создаем регион
    $region = Region::create([
      'name' => $request->name,
      'description' => $request->description,
      'image_main' => $request->file('image_main') ? $request->file('image_main')->store('regions') : null,
    ]);

    // Создаем секции
    if ($request->sections) {
      foreach ($request->sections as $index => $sectionData) {
        RegionSection::create([
          'region_id' => $region->id,
          'title' => $sectionData['title'],
          'content' => $sectionData['content'],
        ]);
      }
    }

    return redirect()->route('admin.regions.index')->with('success', 'Регион успешно создан');
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
    public function edit(Region $region)
    {
        $region->load('sections');
        return view('admin.region.edit', compact('region'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Region $region)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image_main' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'sections.*.title' => 'required|string|max:255',
        'sections.*.content' => 'required|string',
        'sections.*.id' => 'nullable|exists:region_sections,id', // для существующих секций
    ]);

    // Обновляем регион
    $region->update([
        'name' => $request->name,
        'description' => $request->description,
        'image_main' => $request->file('image_main')
            ? $request->file('image_main')->store('regions')
            : $region->image_main,
    ]);

    // Обрабатываем секции
    $existingSectionIds = [];
    if ($request->sections) {
        foreach ($request->sections as $sectionData) {
            if (isset($sectionData['id'])) {
                // Обновляем существующую секцию
                $section = RegionSection::find($sectionData['id']);
                $section->update([
                    'title' => $sectionData['title'],
                    'content' => $sectionData['content'],
                ]);
                $existingSectionIds[] = $section->id;
            } else {
                // Создаем новую секцию
                $newSection = RegionSection::create([
                    'region_id' => $region->id,
                    'title' => $sectionData['title'],
                    'content' => $sectionData['content'],
                    'section_id' => 'drawer-' . (count($region->sections) + 1),
                ]);
                $existingSectionIds[] = $newSection->id;
            }
        }
    }

    // Удаляем секции, которых нет в запросе
    RegionSection::where('region_id', $region->id)
        ->whereNotIn('id', $existingSectionIds)
        ->delete();

    return redirect()->route('admin.regions.index')->with('success', 'Регион успешно обновлен');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
