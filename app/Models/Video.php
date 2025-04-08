<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class Video extends Model
{
    use HasFactory;
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id',
        'title',
        'lead',
        'image_main',
        'video',
        'news_id',
        'user_id',
        'published_at',
        'agency_id',
    ];


    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id', 'id');
    }

    public function news()
    {
        return $this->belongsTo(News::class, 'news_id', 'id');
    }

  public function scopePublishedBetween(Builder $query, ?Carbon $dateFrom, ?Carbon $dateTo)
  {
    if ($dateFrom) {
      $query->where('published_at', '>=', $dateFrom);
    }

    if ($dateTo) {
      $query->where('published_at', '<=', $dateTo);
    }
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
