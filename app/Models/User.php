<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use  HasFactory, Notifiable;
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */


    protected $guarded = false;

    const ROLE_ADMIN = 1;
    const ROLE_SUPER_ADMIN = 10;
    const ROLE_USER = 0;
    const ROLE_CORRECTOR = 2;


    public static function getRoles() {

        return [
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_SUPER_ADMIN => 'SuperAdmin',
            self::ROLE_USER => 'User',
            self::ROLE_CORRECTOR => 'Редактор',
        ];
    }

    protected $fillable = [
        'name',
        'email',
        'avatar',
        'password',
        'role',
        'agency_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id', 'id');
    }
}
