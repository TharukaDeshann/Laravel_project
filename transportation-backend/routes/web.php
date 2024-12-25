<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;


Route::redirect('/', '/dashboard');


Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

    Route::get("/admin/dashboard" , [DashboardController::class , 'adminindex'])
    ->name('admin.dashboard')
    ->middleware('can:' .PermissionsEnum::ManageDrivers->value)
    ->middleware('can:' .PermissionsEnum::ManageVehicles->value )
    ->middleware('can:' .PermissionsEnum::ManageFeatures->value );

    Route::resource('vehicle', VehicleController::class)
    ->except(['index', 'show'])
    ->middleware('can:' . PermissionsEnum::ManageVehicles->value);

    Route::resource('user', UserController::class)
    ->except([ 'index', 'show'])
    ->middleware('can:' . PermissionsEnum::ManageDrivers->value);
    
    Route::get('/user/{user}', [UserController::class, 'show'])
    
            ->name('user.show');

    Route::get('/user', [UserController::class, 'index'])
            ->name('user.index');

    
            

    Route::get('/vehicle', [VehicleController::class, 'index'])
            ->name('vehicle.index');

    Route::get('/vehicle/{vehicle}', [VehicleController::class, 'show'])
            ->name('vehicle.show');
});





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/user{user}', [ProfileController::class, 'profile'])->name('user.profile');
});

require __DIR__.'/auth.php';
