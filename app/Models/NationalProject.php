<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NationalProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'lead',
        'content',
        'image_main',
        'user_id',
        'published_at',
        'reportage_id',
    ];

    protected $dates = ['deleted_at'];
    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function reportage()
    {
        return $this->belongsTo(PhotoReportage::class, 'reportage_id');
    }
}
