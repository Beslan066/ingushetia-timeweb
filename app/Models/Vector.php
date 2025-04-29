<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vector extends Model
{
    use HasFactory;

  protected $fillable = [
    'name',
    'description',
    'image_main',
    'category_id',
  ];


  public function sections()
  {
    return $this->hasMany(VectorSection::class);
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'category_id', 'id');
  }
}
