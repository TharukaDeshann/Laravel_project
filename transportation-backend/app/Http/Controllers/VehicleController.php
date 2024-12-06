<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;
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

        // $vehicles = Vehicle::with(['owner', 'createdBy', 'updatedBy'])->get();


        $vehicles = $query->paginate(10)->onEachSide(1);

        return inertia("Vehicle/Index", [
            "vehicles" => VehicleResource::collection($vehicles),
            'queryParams' => request()->query() ?: null,
            'success' =>  session('success'),
        ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Vehicle/Create");
    }

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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        return inertia('Vehicle/Edit' , [
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
