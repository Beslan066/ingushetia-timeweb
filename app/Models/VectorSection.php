<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VectorSection extends Model
{
    use HasFactory;

  protected $fillable = [
    'vector_id',
    'title',
    'content',
    'section_id',
  ];

  public function vector()
  {
    return $this->belongsTo(Vector::class);
  }
}
