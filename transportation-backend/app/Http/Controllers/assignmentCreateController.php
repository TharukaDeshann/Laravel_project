<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class assignmentCreateController extends Controller
{
    public function create()
    {
        $drivers = User::where('role', 'driver')->get();
        $vehicles = Vehicle::all();

        return inertia("Assignment/Create", [
            'drivers' => $drivers,
            'vehicles' => $vehicles,
        ]);
    }
}
