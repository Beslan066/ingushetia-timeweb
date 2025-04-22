<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Administration;
use Inertia\Inertia;


class AdministrationController extends Controller {
  public function index() {

    $headMember = Administration::query()
      ->where('priority', 1)
      ->orderBy('priority', 'desc')->take(1)->first();

    $admnistrators = Administration::query()
      ->whereNot('priority', 1)
      ->orderBy('priority', 'asc')->get();

    return Inertia::render('Administration/AdministrationStructure', [
      'admnistrators' => $admnistrators,
      'headMember' => $headMember,
    ]);
  }
}
