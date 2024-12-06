<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;

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
        Vehicle::create($data);

        return to_route(route('vehicle.index'));

        
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        //
    }
}
