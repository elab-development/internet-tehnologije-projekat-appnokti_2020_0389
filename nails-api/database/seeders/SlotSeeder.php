<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slotsInADay = [
            '08:00 - 09:00',
            '09:00 - 10:00',
            '10:00 - 12:00',
            '12:00 - 13:00',
            '13:00 - 15:00',
            '17:00 - 18:00',
            '18:00 - 19:00',
            '19:00 - 20:00',
            '20:00 - 21:00',
        ];

        foreach ($slotsInADay as $slot) {
            \App\Models\Slot::create([
                'time_slot' => $slot,
            ]);
        }
    }
}
