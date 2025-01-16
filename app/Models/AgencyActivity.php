<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgencyActivity extends Model
{
    use HasFactory;

    protected $fillable = [
      'title',
      'content',
      'agency_id',
      'user_id'
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
