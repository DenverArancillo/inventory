<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    protected $fillable = [
        'type'
    ];

    public function products () {
        return $this->hasMany('App\Product');
    }
}
