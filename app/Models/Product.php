<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'prod_name', 'type_id', 'stock', 'price', 'brand_id'
    ];

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
