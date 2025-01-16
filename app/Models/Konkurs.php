<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konkurs extends Model
{
    use HasFactory;

    protected $dates = ['deleted_at'];
    public static function getTypes() {

        return [
            [
                'id' => 0,
                'title' => 'Акты'
            ],
            [
                'id' => 1,
                'title' => 'Законы'
            ],
            [
                'id' => 2,
                'title' => 'Отчеты'
            ],
            [
                'id' => 3,
                'title' => 'Указы'
            ]
        ];
    }


    protected $fillable = [
        'title',
        'file',
        'type',
        'published_at',
        'agency_id'
    ];


    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id', 'id');
    }
}
