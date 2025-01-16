<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $guarded = false;

    protected $fillable = [
      'id',
      'title',
      'user_id'
    ];
    protected $dates = ['deleted_at'];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
