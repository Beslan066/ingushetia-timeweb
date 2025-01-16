<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'main_info',
        'history_region',
        'geographic',
        'climate',
        'hydrography',
        'wild_nature',
        'ecology',
        'demography',
        'administrative_division',
        'economic',
        'gross_product',
        'industrial_production',
        'investments',
        'consumer_market',
        'live_standards',
        'construction',
        'transport',
        'finance',
        'comfortable_urban_environment',
        'gazification',
        'labor_and_employment',
        'sport',
        'culture',
        'tourism',
        'medicine',
        'education',
        'protection_of_motherhood',
        'people_social_protection',
        'types_of_economic_activities',


    ];
}
