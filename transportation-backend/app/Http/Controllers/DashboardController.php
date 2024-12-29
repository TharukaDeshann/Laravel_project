<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\VehicleResource;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request){
        $user = $request->user();

    // Fetch vehicles assigned to the user
    $assignedVehicles = Vehicle::where('assigned_user_id', $user->id)->get();

    return inertia('Dashboard', [
        
        'assignedVehicles' => $assignedVehicles,
    ]);
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

//     public function userdetails(Request $request) {
//         $users = UserResource::collection(User::all());
//         return $users;
//     }

//     public function vehicledetails(Request $request) {
//         $vehicles = VehicleResource::collection(Vehicle::all());
//         return $vehicles;
//     }

//     public function auser(Request $request, $id) {
//         $user = User::find($id);
    
//         if (!$user) {
//             return response()->json(['message' => 'User not found'], 404);
//         }
    
//         return new UserResource($user);
//     }
//     public function avehicle(Request $request, $id) {
//         $vehicle = Vehicle::find($id);
    
//         if (!$vehicle) {
//             return response()->json(['message' => 'Vehicle not found'], 404);
//         }
    
//         return new VehicleResource($vehicle);
//     }

//     public function deleteuser(Request $request, $id){
//         $user = User::find($id);
    
//         if (!$user) {
//             return response()->json(['message' => 'User not found'], 404);
//         }
    
//         $user->delete();
    
//         return response()->json(['message' => 'User deleted successfully'], 200);
//     }

//     public function updateuser(Request $request, $id){
//         $user = User::find($id);
    
//         if (!$user) {
//             return response()->json(['message' => 'User not found'], 404);
//         }
    
//         $user->update($request->all());
    
//         return response()->json(['message' => 'User updated successfully'], 200);
//     }

//     public function createuser(StoreUserRequest $request)
// {
//     $data = $request->validated();


    

//     User::create($data);

//     return response()->json(['message' => 'User created successfully'], 201);
// }

    
    

}      
        