<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AwardPolitic extends Model
{
    use HasFactory;

    public static function getTypes() {

        return [
            [
                'id' => 0,
                'title' => 'Государственные награды Российской Федерации'
            ],
            [
                'id' => 1,
                'title' => 'Государственные награды Республики Ингушетия'
            ],
            [
                'id' => 2,
                'title' => 'Поощрения Главы Республики Ингушетия'
            ],
            [
                'id' => 3,
                'title' => 'Перечень государственных наград Республики Ингушетия и поощрений Главы Республики Ингушетия'
            ],
            [
                'id' => 4,
                'title' => 'Реализация Наградной политики Республики Ингушетия'
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
