<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        // $users = User::with(['owner', 'createdBy', 'updatedBy'])->get();


        $users = $query->paginate(10)->onEachSide(1);

        return inertia("User/Index", [
            "users" => UserCrudResource::collection($users),
            'success' =>  session('success'),
        ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();

        $data['password'] = bcrypt($data['password']);
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
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password']?? null;
        if($password){
            $data['password'] = bcrypt($password);
        }else{
            unset($data['password']);
        }
        $user->update($data);

        return to_route('user.index')
        ->with('success',"User \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return to_route('user.index')->with('success' , "User
         \"$name\" was deleted");

    }
}
