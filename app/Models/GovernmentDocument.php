<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GovernmentDocument extends Model
{
    use HasFactory;

  protected $fillable = [
    'title',
    'file',
    'published_at',
    'agency_id',
    'government_document_category_id',
  ];


  public function agency()
  {
    return $this->belongsTo(Agency::class, 'agency_id', 'id');
  }

  public function governmentDocumentCategory() {
    return $this->belongsTo(GovernmentDocumentCategory::class, 'government_document_category_id', 'id');
  }
}
