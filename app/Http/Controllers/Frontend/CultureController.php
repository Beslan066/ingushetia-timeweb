<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CultureController extends Controller
{
  public function culture()
  {
    return Inertia::render('Culture/Culture');
  }

  public function architecture() {
    return Inertia::render('Culture/Architecture');
  }

  public function folklore() {
    return Inertia::render('Culture/Folklor');
  }

  public function islam() {
    return Inertia::render('Culture/Islam');
  }

  public function crafts() {
    return Inertia::render('Culture/Crafts');
  }

  public function tools() {
    return Inertia::render('Culture/Tools');
  }
  public function weapon() {
    return Inertia::render('Culture/Weapon');
  }

}
