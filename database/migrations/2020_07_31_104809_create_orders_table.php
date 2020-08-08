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
            $table->date('date_to_deliver');
            $table->text('address_to_deliver');
            $table->text('customer_name');
            $table->text('customer_address');
            $table->enum('status', ['Pending', 'Consolidating', 'On Delivery', 'Done']);
            $table->unsignedDecimal('total_amount', 7, 2);
            $table->text('notes')->nullable();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('mop_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade');

            $table->foreign('mop_id')
                ->references('id')
                ->on('mode_of_payments')
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
