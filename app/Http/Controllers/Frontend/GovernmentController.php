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

    $meta = [
      'title' => 'Правительство Республики Ингушетия',
      'description' => 'Структура и функции, Экономическое развитие, Социальная политика,
      Культура и традиции, Внешние связи, Инновации и технологии, Безопасность и правопорядок',
    ];

    return Inertia::render('Government/Government', [
      'government' => $government,
      'sections' => $sections,
      'meta' => $meta,
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
      ->orderBy('priority', 'asc')
      ->get();

    $meta = [
      'title' => 'Состав правительства',
      'description' => '',
    ];


    return Inertia::render('Government/GovernmentStructure',
      [
        'ministers' => $ministers,
        'headMember' => $headMember,
        'meta' => $meta,
      ]);
  }

  public function abilities()
  {

    $governmentAuthority = GovernmentAuthority::first();
    $sections = GovernmentAuthoritySection::all();

    $meta = [
      'title' => 'Полномочия правительства',
      'description' => 'Правительство Республики Ингушетия в соответствии с Конституцией Республики Ингушетия и
      Конституционным законом Республики Ингушетия от 12.05.2003 г. № 12-РКЗ «О Правительстве Республики Ингушетия»
      осуществляет руководство работой республиканских органов исполнительной власти и контролирует их деятельность.',
    ];


    return Inertia::render('Government/GovernmentAbilities', [
      'governmentAuthority' => $governmentAuthority,
      'sections' => $sections,
      'meta' => $meta,
    ]);
  }

  public function sessions()
  {

    $sessions = GovernmentDocument::whereHas('governmentDocumentCategory', function ($query) {
      $query->where('title', 'Заседания правительства');
    })->get();

    $meta = [
      'title' => 'Заседания правительства',
      'description' => '',
    ];


    return Inertia::render('Government/GovernmentSessions', [
      'sessions' => $sessions,
      'meta' => $meta,
    ]);
  }

  public function plan()
  {

    $documents = GovernmentDocument::whereHas('governmentDocumentCategory', function ($query) {
      $query->where('title', 'План работы правительства');
    })->get();

    $meta = [
      'title' => 'План работы правительства',
      'description' => '',
    ];


    return Inertia::render('Government/GovernmentPlan', [
      'documents' => $documents,
      'meta' => $meta,
    ]);
  }

  public function colleagues()
  {
    $documents = GovernmentDocument::whereHas('governmentDocumentCategory', function ($query) {
      $query->where('title', 'Коллегии правительства');
    })->get();

    $meta = [
      'title' => 'Коллегии правительства',
      'description' => '',
    ];

    return Inertia::render('Government/GovernmentColleagues', [
      'documents' => $documents,
      'meta' => $meta,
      ]);
  }

  public function directories()
  {

    $meta = [
      'title' => '',
      'description' => '',
    ];

    return Inertia::render('Government/Directories', [
      'meta' => $meta,
    ]);
  }
}
