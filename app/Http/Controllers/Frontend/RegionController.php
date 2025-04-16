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


    return Inertia::render('Region/Region', [
      'region' => $region,
      'sections' => $sections,
    ]);
  }

    public function economic()
    {
        return Inertia::render('Region/Economics');
    }

    public function history()
    {
        return Inertia::render('Region/History');
    }

    public function municipalities()
    {
        $cities = Municipality::query()->with('supervisor')->where('type', 2)->get();
        $districts = Municipality::query()->with('supervisor')->where('type', 20)->get();

        return Inertia::render('Region/Municipality', [
            'cities' => $cities,
            'districts' => $districts
        ]);
    }

    public function socialEconomicDevelopment()
    {
        $socialEconomicDevelopment = SocialEconomicDevelopment::query()->orderBy('id', 'desc')->get();

        return Inertia::render('Region/SocialEconomics', [
            'socialEconomicDevelopment' => $socialEconomicDevelopment
        ]);
    }

  public function nationalProjects()
  {
    return Inertia::render('Region/NationalProjects');
  }
}
