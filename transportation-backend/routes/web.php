<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\assignmentCreateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserCreateController;
use App\Http\Controllers\VehicleCreateController;
use App\Http\Controllers\AssignmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;


Route::redirect('/', '/register');

Route::middleware(['auth', 'verified'])->group(function () {
        
                Route::get('/dashboard', [DashboardController::class, 'index'])
                        ->name('dashboard');
                Route::get('/user/{user}', [UserController::class, 'show'])

                        ->name('user.show');

                Route::get('/user', [UserController::class, 'index'])
                        ->name('user.index');



                Route::get('/vehicle', [VehicleController::class, 'index'])
                        ->name('vehicle.index');

                Route::get('/vehicle/{vehicle}', [VehicleController::class, 'show'])
                        ->name('vehicle.show');

                Route::get('/assignment', [AssignmentController::class, 'index'])
                        ->name('assignment.index');

                Route::get('/assignment/{assignment}', [AssignmentController::class, 'show'])
                        ->name('assignment.show');
        

        Route::get("/admin/dashboard", [DashboardController::class, 'adminindex'])
                ->name('admin.dashboard')
                ->middleware('can:' . PermissionsEnum::ManageDrivers->value)
                ->middleware('can:' . PermissionsEnum::ManageVehicles->value)
                ->middleware('can:' . PermissionsEnum::ManageFeatures->value);
        
        Route::resource('assignment', AssignmentController::class)
                ->except(['index', 'show'])
                ->middleware('can:' . PermissionsEnum::ManageDrivers->value)
                ->middleware('can:' . PermissionsEnum::ManageVehicles->value)
                ->middleware('can:' . PermissionsEnum::ManageFeatures->value);

        Route::resource('vehicle', VehicleController::class)
                ->except(['index', 'show'])
                ->middleware('can:' . PermissionsEnum::ManageVehicles->value);

        Route::resource('user', UserController::class)
                ->except(['index', 'show'])
                ->middleware('can:' . PermissionsEnum::ManageDrivers->value);
        
        Route::resource('usercreate', UserCreateController::class)    
                ->middleware('can:' . PermissionsEnum::ManageDrivers->value);
        
        Route::resource('vehiclecreate', VehicleCreateController::class)    
                ->middleware('can:' . PermissionsEnum::ManageDrivers->value);
        Route::resource('assignmentcreate', assignmentCreateController::class)    
                ->middleware('can:' . PermissionsEnum::ManageDrivers->value);
});





Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::get('/user{user}', [ProfileController::class, 'profile'])->name('user.profile');
});

require __DIR__ . '/auth.php';
