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

    $meta = [
      'title' => 'Администрация Главы и Правительства Республики Ингушетия',
      'description' => "Страница Администрации Главы и Правительства Республики Ингушетия, состав Администрации Главы"
    ];

    return Inertia::render('Administration/AdministrationStructure', [
      'administratorsByType' => $administratorsByType,
      'headMember' => $headMember,
      'meta' => $meta
    ]);
  }
}
