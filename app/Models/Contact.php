<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'content',
        'user_id',
        'agency_id',
    ];
    protected $dates = ['deleted_at'];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id', 'id');
    }
}
