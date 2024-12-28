<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateVehiclesForeignKey extends Migration
{
    public function up()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropForeign(['assigned_user_id']);
            
            $table->foreign('assigned_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropForeign(['assigned_user_id']);
            
            $table->foreign('assigned_user_id')
                ->references('id')
                ->on('users');
        });
    }
}