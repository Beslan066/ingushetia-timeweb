<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id',
        'title',
        'address',
        'date',
        'user_id',
        'agency_id',
    ];

    public  function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }


    public function agency() {
        return $this->belongsTo(Agency::class, 'agency_id', 'id');
    }
}
