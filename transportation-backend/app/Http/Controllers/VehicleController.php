<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\VehicleResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Vehicle::query();
        
        if(request("model")){
            $query->where("model", "like", "%".request("model")."%");
        }
        if(request("type")){
            $query->where("type", request("type"));
        }
        if(request("status")){
            $query->where("status", request("status"));
        }

        $vehicles = $query->paginate(10)->onEachSide(1);

        return inertia("Vehicle/Index", [
            "vehicles" => VehicleResource::collection($vehicles),
            'success' =>  session('success'),
            'queryParams' => request()->query() ?: null,
        ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     $users = User::all();
    //     return inertia("Vehicle/Create", [
    //         'users' => UserResource::collection($users),
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        $data = $request->validated();
        
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image){
            $data['image_path'] = $image->store('vehicle/' .Str::random(), 'public');
        }
        Vehicle::create($data);
        return to_route('vehicle.index')->with('success', 'Vehicle was created');

        
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        return inertia('Vehicle/Show' , [
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        $users = User::all();
        return inertia('Vehicle/Edit' , [
            'users' => UserResource::collection($users),
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if($image){
            if($vehicle->image_path){
                Storage::disk('public')->deleteDirectory(dirname($vehicle->image_path));
            }
            $data['image_path'] = $image->store('vehicle/' .Str::random(), 'public');
        }
        $vehicle->update($data);
        return to_route('vehicle.index')
        ->with('success',"Vehicle \"$vehicle->model\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $model = $vehicle->model;
        $vehicle->delete();
        if($vehicle->image_path){
            Storage::disk('public')->deleteDirectory(dirname($vehicle->image_path));
        }
        return to_route('vehicle.index')->with('success' , "Vehicle 
        \"$model\" was deleted");

    }
}
