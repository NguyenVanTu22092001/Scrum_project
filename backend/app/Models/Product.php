<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_ip',
        'users_id',
        'categories_id',
        'sku',
        'title',
        'description',
        'image',
        'price',
        'stock_unit',
        'sold_unit'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($Product) {
            $Product->user_ip =  Request::ip();
            $Product->users_id =  Auth::id();
            $Product->sku =  Str::upper(Str::random(8));
        });
    }
}
