<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('prod_name', 150);
            $table->unsignedInteger('type_id');
            $table->unsignedInteger('stock');
            $table->unsignedDecimal('price', 7, 2);
            $table->unsignedInteger('brand_id');
            $table->timestamps();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreign('type_id')
                ->references('id')
                ->on('product_types')
                ->onUpdate('cascade');

            $table->foreign('brand_id')
                ->references('id')
                ->on('brands')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}