<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class UserController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        // $users = User::with(['owner', 'createdBy', 'updatedBy'])->get();
        if(request("name")){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("role")){
            $query->where("role", request("role"));
        }

        $users = $query->paginate(10)->onEachSide(1);

        return inertia("User/Index", [
            "users" => UserCrudResource::collection($users),
            'success' =>  session('success'),
            'queryParams' => request()->query() ?: null,
        ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     return inertia("User/Create");
    // }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();

        $data['password'] = bcrypt($data['password']);
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        if($image){
            $data['image_path'] = $image->store('user/' .Str::random(), 'public');
        }
        User::create($data);
        return to_route('user.index')->with('success', 'User was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        
        return inertia("User/Show", [
            'user' => new UserResource($user),
        ]);
    }
    
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        
        return inertia('User/Edit' , [
            'user' => new UserCrudResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        
        $data = $request->validated();

        
        $user->syncRoles($data['roles']);
        

        return to_route('user.index')
        ->with('success',"User Roles were updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        

        $name = $user->name;
        $user->delete();
        if($user->image_path){
            Storage::disk('public')->deleteDirectory(dirname($user->image_path));
        }
        return to_route('user.index')->with('success' , "User
         \"$name\" was deleted");

    }
}
