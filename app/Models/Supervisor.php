<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'bio',
        'image_main',
        'position',
        'user_id'
    ];
    protected $dates = ['deleted_at'];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
