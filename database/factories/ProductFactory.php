<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'prod_name' => $faker->domainWord,
        'type_id' => function () {
            return factory('App\ProductType')->create()->id;
        },
        'stock' => $faker->randomNumber(4),
        'price' => $faker->randomFloat(2, 1, 99999),
        'brand_id'=> function () {
            return factory('App\Brand')->create()->id;
        } 
    ];
});
