<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory;
 
    protected $fillable = [
        'image_path',
        'model',
        'status',
        'license_plate', 
        'type' ,
        'capacity' , 
        'description',
        'assigned_user_id', 
        'created_by', 
        'updated_by'
    ];


    

    public function createdBy(){
        return $this->belongsTo(User::class,'created_by');
    }

    public function updatedBy(){
        return $this->belongsTo(User::class,'updated_by');
    }

    public function assignedUser(){
        return $this->belongsTo(User::class, 'assigned_user_id');
    }
}
