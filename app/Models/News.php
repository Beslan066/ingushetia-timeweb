<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class News extends Model
{
  use HasFactory;

  protected $primaryKey = 'news_uid'; // Указываем, что первичный ключ - это UUID
  protected $keyType = 'string'; // Тип ключа - строка (для UUID)
  public $incrementing = false; // Отключаем автоинкремент, так как используем UUID


  protected $guarded = false;

  protected $fillable = [
    'id',
    'title',
    'lead',
    'content',
    'image_main',
    'news_id',
    'category_id',
    'user_id',
    'published_at',
    'main_material',
    'agency_id',
    'views',
    'reportage_id',
    'video_id',
    'image_author',
    'image_description',
    'url',
    'image_webp',
    'news_uid'
  ];

  protected $dates = ['deleted_at'];
  protected $appends = ['related_posts'];


  public function translate()
  {
    return $this->belongsTo(NewsIng::class, 'translate_id', 'id');
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'category_id', 'id');
  }

  public function tags()
  {
    return $this->belongsToMany(Tag::class, 'news_tag', 'news_uid', 'tag_id');
  }


  public function user()
  {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }

  public function agency()
  {
    return $this->belongsTo(Agency::class, 'agency_id', 'id');
  }

  public function incrementViews()
  {
    $this->views = $this->views + 1;
    $this->save();
  }

  public function video()
  {
    return $this->belongsTo(Video::class, 'video_id', 'id');
  }

  public function reportage()
  {
    return $this->belongsTo(PhotoReportage::class, 'reportage_id');
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

  public function getRelatedPostsAttribute()
  {
    return $this->relatedPosts ?? [];
  }

  public function scopeFilterCategory(Builder $query, $category)
  {
    if ($category) {
      $query->where('category_id', $category);
    }
  }


  public function getRouteKeyName()
  {
    return 'url'; // Указываем, что для маршрутов используется поле url
  }

  protected static function boot()
  {
    parent::boot();

    static::creating(function ($news) {
      if (empty($news->news_uid)) {
        $news->news_uid = (string) Str::uuid();
      }
    });
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
