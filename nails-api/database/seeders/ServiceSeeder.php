<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //'service_name',
        //        'service_description',
        //        'service_type_id',
        //        'service_price',
        //ovo su polja u tabeli services, podaci su o manikiru, napravi mi niz nekih servisa koji salon moze da obavlja

        $services = [
            [
                'service_name' => 'Manikir',
                'service_description' => 'Manikir je tretman kojim se neguju ruke i nokti. Uključuje oblikovanje noktiju, negu zanoktica, masažu ruku i lakiranje noktiju.',
                'service_type_id' => 1,
                'service_price' => 1000,
            ],
            [
                'service_name' => 'Pedikir',
                'service_description' => 'Pedikir je tretman kojim se neguju stopala i nokti. Uključuje oblikovanje noktiju, negu zanoktica, masažu stopala i lakiranje noktiju.',
                'service_type_id' => 1,
                'service_price' => 1200,
            ],
            [
                'service_name' => 'Gel Lak',
                'service_description' => 'Gel lak je tretman kojim se nokti lakiraju gel lakom. Gel lak se suši u UV lampi i traje duže od običnog laka.',
                'service_type_id' => 2,
                'service_price' => 1500,
            ],
            [
                'service_name' => 'Gel na Prirodne nokte',
                'service_description' => 'Gel na prirodne nokte je tretman kojim se nokti izlivanju gelom kako bi se ojačali i produžili.',
                'service_type_id' => 3,
                'service_price' => 2000,
            ],
            [
                'service_name' => 'Nadogradnja Noktiju',
                'service_description' => 'Nadogradnja noktiju je tretman kojim se nokti produžuju veštačkim noktima.',
                'service_type_id' => 3,
                'service_price' => 2500,
            ],
            [
                'service_name' => 'Izlivanje Noktiju',
                'service_description' => 'Izlivanje noktiju je tretman kojim se nokti izlivanju akrilom ili gelom kako bi se ojačali i produžili.',
                'service_type_id' => 4,
                'service_price' => 3000,
            ],

        ];

        foreach ($services as $service) {
            \App\Models\Service::create($service);
        }
    }
}
