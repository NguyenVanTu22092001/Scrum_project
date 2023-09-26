<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    public $timestamps = false;
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description',
        'slug'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($Category) {
            $Category->slug = Str::slug($Category->name);
        });

        static::updating(function ($Category) {
            $Category->slug = Str::slug($Category->name);
        });
    }
}
