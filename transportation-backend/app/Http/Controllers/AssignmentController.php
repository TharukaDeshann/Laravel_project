<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\User;
use App\Models\Vehicle;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Resources\AssignmentResource;
use Illuminate\Support\Facades\Auth;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Assignment::with(['vehicle', 'driver']);
        
        // Filters
        if (request("status")) {
            $query->where("status", request("status"));
        }
        if (request("start_date")) {
            $query->whereDate("start_date", ">=", request("start_date"));
        }
        if (request("end_date")) {
            $query->whereDate("end_date", "<=", request("end_date"));
        }

        $assignments = $query->paginate(10)->onEachSide(1);

        return inertia("Assignment/Index", [
            "assignments" => AssignmentResource::collection($assignments),
            'success' => session('success'),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     $drivers = User::where('role', 'driver')->get();
    //     $vehicles = Vehicle::all();

    //     return inertia("Assignment/Create", [
    //         'drivers' => $drivers,
    //         'vehicles' => $vehicles,
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignmentRequest $request)
    {
        $data = $request->validated();
        
        // Assign authenticated user as the creator if needed
        $data['created_by'] = Auth::id();

        Assignment::create($data);

        return to_route('assignment.index')->with('success', 'Assignment was created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Assignment $assignment)
    {
        $assignment->load(['vehicle', 'driver']); // Load related data

        return inertia("Assignment/Show", [
            'assignment' => new AssignmentResource($assignment),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Assignment $assignment)
    {
        $drivers = User::where('role', 'driver')->get();
        $vehicles = Vehicle::all();

        return inertia("Assignment/Edit", [
            'assignment' => new AssignmentResource($assignment),
            'drivers' => $drivers,
            'vehicles' => $vehicles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $data = $request->validated();

        $assignment->update($data);

        return to_route('assignment.index')->with('success', "Assignment was updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return to_route('assignment.index')->with('success', "Assignment was deleted successfully.");
    }
}
