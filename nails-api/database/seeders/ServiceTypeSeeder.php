<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $serviceTypes = [
            'Gel Lak',
            'Gel na Prirodne nokte',
            'Nadogradnja Noktiju',
            'Izlivanje Noktiju',
            'Dipping Powder (umakajući prah)',
            'Akril',
            'Shellac',
        ];

        foreach ($serviceTypes as $serviceType) {
            \App\Models\ServiceType::create([
                'type_name' => $serviceType,
            ]);
        }
    }
}
