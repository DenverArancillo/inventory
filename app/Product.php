<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function brand () {
        return $this->belongsTo('App\Brand');
    }
    
    public function product_type () {
        return $this->belongsTo('App\ProductType');
    }

    public function order_items () {
        return $this->hasOne('App\OrderItem');
    }
}

