<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('vehicle_id'); // Foreign key to vehicles
            $table->unsignedBigInteger('driver_id');  // Foreign key to users
            $table->enum('status', ['Pending', 'Completed'])->default('Pending');
            $table->timestamps();
        
            $table->date('start_date')->nullable(); // Assignment start date
            $table->date('end_date')->nullable();   // Assignment end date
            // Foreign key constraints
            $table->foreign('vehicle_id')->references('id')->on('vehicles')->onDelete('cascade');
            $table->foreign('driver_id')->references('id')->on('users')->onDelete('cascade'); // This must match the `id` in `users`
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assignments');
    }
}
