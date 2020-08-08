<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function user () {
        return $this->belongsTo('App\User');
    }

    public function order_item () {
        return $this->hasMany('App\OrderItem');
    }

    public function mop () {
        return $this->belongsTo('App\ModeOfPayment');
    }

}
