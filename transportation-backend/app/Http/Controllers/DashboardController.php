<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\VehicleResource;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        return inertia('Dashboard');
    }
    public function adminindex()
    {
        // Fetch all users and vehicles
        $users = UserResource::collection(User::all());
        $vehicles = VehicleResource::collection(Vehicle::all());
    
        // Pass the data to the Dashboard page
        return inertia('Admin/Dashboard', [
            'users' => $users,
            'vehicles' => $vehicles,
        ]);
    }
}
