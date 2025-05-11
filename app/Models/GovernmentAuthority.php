<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GovernmentAuthority extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'description',
    'image_main',
  ];


  public function sections()
  {
    return $this->hasMany(GovernmentAuthoritySection::class);
  }
}
