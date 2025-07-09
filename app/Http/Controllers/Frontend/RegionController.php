<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Contact;
use App\Models\MilitarySupport;
use App\Models\Municipality;
use App\Models\NationalProject;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\Region;
use App\Models\RegionSection;
use App\Models\Resource;
use App\Models\SocialEconomicDevelopment;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegionController extends Controller
{
  public function index()
  {
    $region = Region::first();
    $sections = RegionSection::all();

    $meta = [
      'title' => 'Республика Ингушетия',
      'description' => 'Правовой статус, правовое устройство, Географическое положение,природные ресурсы, история, население и трудовые ресурсы Ингушетии'
    ];


    return Inertia::render('Region/Region', [
      'region' => $region,
      'sections' => $sections,
      'meta' => $meta
    ]);
  }

  public function economic()
  {

    $meta = [
      'title' => 'Экономика Ингушетии',
      'description' => 'Основная информация по экономике Ингушетии'
    ];

    return Inertia::render('Region/Economics', [
      'meta' => $meta,
    ]);
  }

  public function history()
  {
    $meta = [
      'title' => 'История Ингушетии',
      'description' => 'Основная информация по истории Ингушетии'
    ];

    return Inertia::render('Region/History', [
      'meta' => $meta,
    ]);
  }

  public function municipalities()
  {
    $cities = Municipality::query()->with('supervisor')->where('type', 2)->get();
    $districts = Municipality::query()->with('supervisor')->where('type', 20)->get();

    $meta = [
      'title' => 'Города и районы Ингушетии',
      'description' => 'Основная информация по муниципальным образованиям Ингушетии'
    ];

    return Inertia::render('Region/Municipality', [
      'cities' => $cities,
      'districts' => $districts,
      'meta' => $meta
    ]);
  }

  public function socialEconomicDevelopment()
  {
    $socialEconomicDevelopment = SocialEconomicDevelopment::query()->orderBy('id', 'desc')->get();

    $meta = [
      'title' => 'Социально-экономическое развитие Ингушетии',
      'description' => 'Основная информация по Социально-экономическому развитию Ингушетии'
    ];

    return Inertia::render('Region/SocialEconomics', [
      'socialEconomicDevelopment' => $socialEconomicDevelopment,
      'meta' => $meta
    ]);
  }

  public function nationalProjects()
  {

    $nationalProjects = NationalProject::query()->orderBy('id', 'asc')->get();


    $meta = [
      'title' => 'Национальные проекты Ингушетии',
      'description' => 'В Республике Ингушетия с 2019 года реализуются 14 национальных проектов.'
    ];

    return Inertia::render('Region/NationalProjects', [
      'nationalProjects' => $nationalProjects,
      'meta' => $meta
    ]);
  }
}
