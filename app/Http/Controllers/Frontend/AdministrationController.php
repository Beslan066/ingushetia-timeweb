<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Administration;
use Inertia\Inertia;


class AdministrationController extends Controller {
  public function index() {
    $headMember = Administration::query()
      ->where('priority', 1)
      ->orderBy('priority', 'desc')
      ->take(1)
      ->first();

    // Получаем администраторов с их типами и группируем
    $administratorsByType = Administration::query()
      ->whereNot('priority', 1)
      ->with('type') // Загружаем связанные типы
      ->orderBy('priority', 'asc')
      ->get()
      ->groupBy('administration_types_id');

    return Inertia::render('Administration/AdministrationStructure', [
      'administratorsByType' => $administratorsByType,
      'headMember' => $headMember,
    ]);
  }
}
