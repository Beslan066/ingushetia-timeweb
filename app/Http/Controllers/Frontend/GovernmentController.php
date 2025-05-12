<?php
declare(strict_types=1);

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\GovernmentAuthority;
use App\Models\GovernmentAuthoritySection;
use App\Models\GovernmentDocument;
use App\Models\Minister;
use App\Models\Government;
use App\Models\GovernmentSection;
use Inertia\Inertia;

class GovernmentController extends Controller
{
  public function government()
  {

    $government = Government::first();
    $sections = GovernmentSection::all();

    return Inertia::render('Government/Government', [
      'government' => $government,
      'sections' => $sections,
    ]);
  }

  public function structure()
  {

    $headMember = Minister::query()
      ->where('priority', 1)
      ->orderBy('priority', 'desc')
      ->take(1)
      ->first();

    $ministers = Minister::query()
      ->whereNot('priority', 1)
      ->orderBy('priority', 'desc')
      ->get();

    return Inertia::render('Government/GovernmentStructure',
      [
        'ministers' => $ministers,
        'headMember' => $headMember,
      ]);
  }
  public function abilities()
  {

    $governmentAuthority = GovernmentAuthority::first();
    $sections = GovernmentAuthoritySection::all();

    return Inertia::render('Government/GovernmentAbilities', [
      'governmentAuthority' => $governmentAuthority,
      'sections' => $sections,
    ]);
  }
  public function sessions()
  {

    $sessions = GovernmentDocument::whereHas('governmentDocumentCategory', function($query) {
      $query->where('title', 'Заседания правительства');
    })->get();

    return Inertia::render('Government/GovernmentSessions', [
      'sessions' => $sessions,
    ]);
  }
  public function plan()
  {

    $documents = GovernmentDocument::whereHas('governmentDocumentCategory', function($query) {
      $query->where('title', 'План работы правительства');
    })->get();

    return Inertia::render('Government/GovernmentPlan', [
        'documents' => $documents,
    ]);
  }
  public function colleagues()
  {
    $documents = GovernmentDocument::whereHas('governmentDocumentCategory', function($query) {
      $query->where('title', 'Коллегии правительства');
    })->get();

    return Inertia::render('Government/GovernmentColleagues', [
      'documents' => $documents,
    ]);
  }
  public function directories()
  {
    return Inertia::render('Government/Directories');
  }
}
