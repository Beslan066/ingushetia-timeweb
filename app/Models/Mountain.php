<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class Mountain extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'lead',
        'content',
        'image_main',
        'image_author',
        'image_description',
        'year',
        'location',
        'coordinates',
        'see_height',
        'structure',
        'reportage_id',
        'user_id'
    ];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function reportage()
    {
        return $this->belongsTo(PhotoReportage::class, 'reportage_id');
    }

    protected static function booted()
{
    static::saved(function ($model) {
        // Очищаем кеш при сохранении
        Redis::del('photo_reportages_last_4', 'videos_last_4', 'main_posts_agency_5');
    });

    static::deleted(function ($model) {
        // Очищаем кеш при удалении
        Redis::del('photo_reportages_last_4', 'videos_last_4', 'main_posts_agency_5');
    });
}

}
