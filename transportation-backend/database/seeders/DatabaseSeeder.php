<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Driver;
use App\Models\User;
use App\Models\Vehicle;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $driverRole = Role::create(['name' => RolesEnum::Driver->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);
        
        $manageFeaturesPermission = Permission::create([
            'name' => PermissionsEnum::ManageFeatures->value,
        ]);
        $manageDriversPermission = Permission::create([
            'name' => PermissionsEnum::ManageDrivers->value,
        ]);

        $manageVehiclesPermission = Permission::create([
            'name' => PermissionsEnum::ManageVehicles->value,
        ]);

        $adminRole->syncPermissions([
            $manageFeaturesPermission,
            $manageDriversPermission,
            $manageVehiclesPermission,
        ]);


        $user = User::factory()->create([
            'name' => 'Tharuka Deshan',
            'email' => 'tharukadeshan@example.com',
            'password'=> bcrypt('tharuka123@'),
            'email_verified_at' => now(),
            'role' => 'admin',
        ])->assignRole(RolesEnum::Admin);


        $user = User::factory()->create([
            'name' => 'Main Admin',
            'email' => 'admin@example.com',
            'password'=> bcrypt('admin123@'),
            'email_verified_at' => now(),
            'role' => 'admin',
        ])->assignRole(RolesEnum::Admin);

        $user = User::factory()->create([
            'name' => 'Driver',
            'email' => 'driver@example.com',
            'password'=> bcrypt('driver123@'),
            'email_verified_at' => now(),
            'role' => 'driver',
        ])->assignRole(RolesEnum::Driver);

    }
}
