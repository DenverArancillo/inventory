<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        'brand_name', 'tags'
    ];

    public function product () {
        return $this->hasMany('App\Product');
    }
}
