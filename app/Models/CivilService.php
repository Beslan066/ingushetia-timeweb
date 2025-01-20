<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CivilService extends Model
{
    use HasFactory;

    public static function getTypes() {

        return [
            [
                'id' => 0,
                'title' => 'Объявления'
            ],
            [
                'id' => 1,
                'title' => 'Нормативная база'
            ],
            [
                'id' => 2,
                'title' => 'Формы мониторинга для Минтруда России'
            ],
            [
                'id' => 3,
                'title' => 'Условия и порядок поступления на государственную гражданскую службу в Администрацию Главы и Правительства Республики Ингушетия'
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
