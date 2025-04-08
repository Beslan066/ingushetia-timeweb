<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class Resource extends Model
{
    use HasFactory;
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'title',
        'link',
        'user_id',
        'agency_id',
    ];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id', 'id');
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
