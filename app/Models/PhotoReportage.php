<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class PhotoReportage extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'lead',
        'image_main',
        'slides',
        'user_id',
        'news_id',
        'published_at',
        'agency_id',
    ];

    protected $dates = ['deleted_at'];
    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id', 'id');
    }

    public function news()
    {
        return $this->hasOne(News::class, 'reportage_id');
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

  public function getSlidesArrayAttribute()
  {
    return $this->slides ? json_decode($this->slides, true) : [];
  }
}
