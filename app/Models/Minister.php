<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Minister extends Model
{

  use HasFactory, SoftDeletes;

  protected $fillable = [
    'name',
    'bio',
    'image_main',
    'position',
    'user_id',
    'priority',
    'contact'
  ];
  protected $dates = ['deleted_at'];

  public  function user() {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }
}
