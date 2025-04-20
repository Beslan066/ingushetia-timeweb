<?php
declare(strict_types=1);

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Minister;
use Inertia\Inertia;

class GovernmentController extends Controller
{
  public function government()
  {
    return Inertia::render('Administration/Administration');
  }
  public function structure()
  {

    $ministers = Minister::query()->whereNot('priority', 1)->get();

    return Inertia::render('Administration/AdministrationStructure', ['ministers' => $ministers]);
  }
  public function abilities()
  {
    return Inertia::render('Administration/GovernmentAbilities');
  }
  public function sessions()
  {
    return Inertia::render('Administration/GovernmentSessions');
  }
  public function plan()
  {
    return Inertia::render('Administration/GovernmentPlan');
  }
  public function colleagues()
  {
    return Inertia::render('Administration/GovernmentColleagues');
  }
  public function directories()
  {
    return Inertia::render('Administration/Directories');
  }
}
