<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'driver_id',
        'status',
        'start_date',
        'end_date',
    ];

    /**
     * Relationship with Vehicle model.
     */
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Relationship with Driver model.
     */
    public function driver()
    {
        return $this->belongsTo(User::class);
    }
}
