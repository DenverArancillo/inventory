<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date_ordered');
            // nullabel?
            $table->date('date_to_deliver');
            $table->text('location');
            $table->text('customer_name');
            // ask status of a order
            $table->enum('status', ['Pending', 'Consolidating', 'On Delivery', 'Done']);
            $table->text('notes')->nullable();
            $table->unsignedInteger('user_id');
        });

        // foreign key
        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('orders');
    }
}
