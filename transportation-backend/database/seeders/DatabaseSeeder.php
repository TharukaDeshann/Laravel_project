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

    }
}
