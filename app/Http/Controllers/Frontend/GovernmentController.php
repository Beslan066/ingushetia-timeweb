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
    return Inertia::render('Government/Government');
  }
  public function structure()
  {

    $headMember = Minister::query()
      ->where('priority', 1)
      ->orderBy('priority', 'desc')
      ->take(1)
      ->first();

    $ministers = Minister::query()->whereNot('priority', 1)->get();

    return Inertia::render('Government/GovernmentStructure',
      [
        'ministers' => $ministers,
        'headMember' => $headMember,
      ]);
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
