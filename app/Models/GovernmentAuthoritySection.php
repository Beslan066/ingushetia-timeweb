<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GovernmentAuthoritySection extends Model
{
    use HasFactory;

  protected $fillable = [
    'government_authority_id',
    'title',
    'content',
    'section_id',
  ];

  public function governmentAuthority()
  {
    return $this->belongsTo(GovernmentAuthority::class);
  }
}
