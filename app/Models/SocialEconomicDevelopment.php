<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialEconomicDevelopment extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_type',
        'document_size',
        'document_path',
        'title'
    ];
}
