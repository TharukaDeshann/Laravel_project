<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('model'); // Name of the vehicle
            $table->string('license_plate')->unique();
            $table->string('type');
            $table->string('status');
            $table->integer('capacity');
            $table->longText('description')->nullable();
            $table->string('image_path')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps(); // Created_at and Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
