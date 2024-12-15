<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Vehicle;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model' => fake()->sentence,
            'license_plate' => $this->faker->unique()->bothify('??-####'),
            'type' => fake()->randomElement(['Car', 'Truck' , 'Bus', 'Ship' ]),
            'status' => fake()->randomElement(['Active', 'Inactive']),
            'capacity' => fake()->randomElement([100, 200 , 300 , 450 ]),
            'description' => fake()->realText(),
            'image_path' => fake()->imageUrl(),
            'assigned_user_id' => fake()->randomElement([1, 2]),
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time(),
        ];


       
    }
}
