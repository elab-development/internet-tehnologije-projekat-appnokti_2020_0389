<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        //'user_id',
        //        'service_id',
        //        'slot_id',
        //        'reservation_date',

        $services = \App\Models\Service::all();
        $slots = \App\Models\Slot::all();
        $users = \App\Models\User::all();

        for ($i = 0; $i < 100; $i++) {
            \App\Models\Reservation::create([
                'user_id' => $faker->randomElement($users)->id,
                'service_id' => $faker->randomElement($services)->id,
                'slot_id' => $faker->randomElement($slots)->id,
                'reservation_date' => $faker->dateTimeBetween('-1 month', '+1 month'),
            ]);
        }
    }
}
