<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mountain extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'lead',
        'content',
        'image_main',
        'image_author',
        'image_description',
        'year',
        'location',
        'coordinates',
        'see_height',
        'structure',
        'reportage_id',
        'user_id'
    ];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function reportage()
    {
        return $this->belongsTo(PhotoReportage::class, 'reportage_id');
    }

}
