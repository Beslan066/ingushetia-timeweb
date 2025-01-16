<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MilitarySupport extends Model
{
    use HasFactory;
    protected $dates = ['deleted_at'];

    protected $fillable = [
      'title',
      'content',
      'user_id',
    ];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
