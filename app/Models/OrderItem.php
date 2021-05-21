<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    public function orders () {
        return $this->belongsTo('App\Order');
    }

    public function products () {
        return $this->belongsTo('App\'Product');
    }
}
