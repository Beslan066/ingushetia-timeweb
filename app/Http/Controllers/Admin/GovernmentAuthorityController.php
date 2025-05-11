<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\GovernmentAuthority;
use App\Models\GovernmentAuthoritySection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GovernmentAuthorityController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $governmentAuthority = GovernmentAuthority::query()->take(1)->get()->last();

    if (isset($governmentAuthority)) {
      $governmentAuthorityCount = $governmentAuthority->count();

      return view('admin.government-authority.index', compact('governmentAuthority', 'governmentAuthorityCount'));
    }else {
      $governmentAuthorityCount = 0;
      return view('admin.government-authority.index', compact('governmentAuthority', 'governmentAuthorityCount'));
    }
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

    return view('admin.government-authority.create');
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
    $governmentAuthority = GovernmentAuthority::create([
      'name' => $request->name,
      'description' => $request->description,
      'image_main' => $request->file('image_main') ? $request->file('image_main')->store('governmentAuthority') : null,
    ]);

    // Создаем секции
    if ($request->sections) {
      foreach ($request->sections as $index => $sectionData) {
        GovernmentAuthoritySection::create([
          'government_authority_id' => $governmentAuthority->id,
          'title' => $sectionData['title'],
          'content' => $sectionData['content'],
        ]);
      }
    }

    return redirect()->route('admin.governmentAuthoritys.index')->with('success', 'успешно создано');
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
  public function edit(GovernmentAuthority $governmentAuthority)
  {

    $governmentAuthority->load('sections');
    return view('admin.government-authority.edit', compact('governmentAuthority'));
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, GovernmentAuthority $governmentAuthority)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'image_main' => 'nullable|image|mimes:webp|max:2048',
      'sections.*.title' => 'required|string|max:255',
      'sections.*.content' => 'required|string',
    ]);

    // Обновляем основную информацию вектора
    $governmentAuthorityData = [
      'name' => $request->name,
      'description' => $request->description,
    ];

    if ($request->hasFile('image_main')) {
      // Удаляем старое изображение, если оно есть
      if ($governmentAuthority->image_main) {
        Storage::delete($governmentAuthority->image_main);
      }
      $governmentAuthorityData['image_main'] = $request->file('image_main')->store('governmentAuthority');
    }

    $governmentAuthority->update($governmentAuthorityData);

    // Работаем с секциями
    if ($request->has('sections')) {
      $existingSectionIds = $governmentAuthority->sections->pluck('id')->toArray();
      $updatedSectionIds = [];

      foreach ($request->sections as $sectionData) {
        if (isset($sectionData['id'])) {
          // Обновляем существующую секцию
          $section = GovernmentAuthoritySection::find($sectionData['id']);
          if ($section) {
            $section->update([
              'title' => $sectionData['title'],
              'content' => $sectionData['content'],
            ]);
            $updatedSectionIds[] = $section->id;
          }
        } else {
          // Создаем новую секцию
          $newSection = GovernmentAuthoritySection::create([
            'government_authority_id' => $governmentAuthority->id,
            'title' => $sectionData['title'],
            'content' => $sectionData['content'],
          ]);
          $updatedSectionIds[] = $newSection->id;
        }
      }

      // Удаляем секции, которых нет в обновленных данных
      $sectionsToDelete = array_diff($existingSectionIds, $updatedSectionIds);
      if (!empty($sectionsToDelete)) {
        GovernmentAuthoritySection::whereIn('id', $sectionsToDelete)->delete();
      }
    }

    return redirect()->route('admin.governmentAuthoritys.index')->with('success', 'успешно обновлено');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
