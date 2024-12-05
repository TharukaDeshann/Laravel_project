<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Tharuka Deshan',
            'email' => 'tharukadeshan@example.com',
            'password'=> bcrypt('Tharuka.123'),
            'email_verified_at' => now()
        ]);

        // Assign vehicles to the created user
        Vehicle::factory()
            ->count(10)
            ->for($user, 'owner') // Associate vehicles with this user
            ->create();

        // Create additional users with vehicles
        User::factory(10)
            ->hasVehicles(3, [ // Each user has 3 vehicles
                'type' => 'Car',
                'capacity' => 5
            ])
            ->create();
    }
}
