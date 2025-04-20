<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Administration;
use Inertia\Inertia;


class AdministrationController extends Controller {
  public function index() {

    $headMember = Administration::query()
      ->where('position', 1)
      ->orderBy('position', 'desc')->get();

    $admnistrators = Administration::query()
      ->whereNot('position', 1)
      ->orderBy('position', 'desc')->get();

    return Inertia::render('Administration/AdministrationStructure', [
      'admnistrators' => $admnistrators,
      'headMember' => $headMember,
    ]);
  }
}
