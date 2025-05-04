<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Administration extends Model
{
  use HasFactory, SoftDeletes;

  protected $fillable = [
    'name',
    'bio',
    'image_main',
    'position',
    'user_id',
    'priority',
    'administration_types_id',
    'contact',
  ];






  protected $dates = ['deleted_at'];


  public function type()
  {
    return $this->belongsTo(AdministrationType::class, 'administration_types_id', 'id');
  }


  public function user()
  {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }
}
