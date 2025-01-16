<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'supervisor_id',
        'supervisor_type',
        'logo',
        'full_title',
        'slug'
    ];
    protected $dates = ['deleted_at'];

    public  function supervisor() {
        return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
