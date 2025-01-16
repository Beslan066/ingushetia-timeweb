<?php
declare(strict_types=1);

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GovernmentController extends Controller
{
  public function government()
  {
    return Inertia::render('Government/Government');
  }
  public function structure()
  {
    return Inertia::render('Government/GovernmentStructure');
  }
  public function abilities()
  {
    return Inertia::render('Government/GovernmentAbilities');
  }
  public function sessions()
  {
    return Inertia::render('Government/GovernmentSessions');
  }
  public function plan()
  {
    return Inertia::render('Government/GovernmentPlan');
  }
  public function colleagues()
  {
    return Inertia::render('Government/GovernmentColleagues');
  }
  public function directories()
  {
    return Inertia::render('Government/Directories');
  }
}
