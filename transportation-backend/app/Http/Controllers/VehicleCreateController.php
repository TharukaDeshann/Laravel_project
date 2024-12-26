<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class VehicleCreateController extends Controller
{
    public function create(){
        $users = User::all();
        return inertia("Vehicle/Create", [
            'users' => UserResource::collection($users),
        ]);
    }
}
