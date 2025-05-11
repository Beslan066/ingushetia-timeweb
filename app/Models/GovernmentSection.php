<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GovernmentSection extends Model
{
    use HasFactory;

  protected $fillable = [
    'government_id',
    'title',
    'content',
    'section_id',
  ];

  public function government()
  {
    return $this->belongsTo(Government::class);
  }
}
