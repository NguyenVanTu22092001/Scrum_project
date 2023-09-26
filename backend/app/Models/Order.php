<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Request; // Import the Request facade
use Illuminate\Support\Facades\Auth; // Import the Auth facade
class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'user_ip',
        'full_name',
        'email',
        'phone',
        'sub_total',
        'postcode',
        'city',
        'address_line_1',
        'address_line_2',
        'country',
        'status',
        'shipped_date'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($Product) {
            // $Product->user_ip =  \Request::ip();
            // $Product->users_id =  \Auth::id();
            $Product->user_ip =  Request::ip();
            $Product->users_id =  Auth::id();
        });
    }
}
