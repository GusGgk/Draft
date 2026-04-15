<?php
// database/seeders/SportsSeeder.php

namespace Database\Seeders;

use App\Models\Sport;
use Illuminate\Database\Seeder;

class SportsSeeder extends Seeder
{
    public function run(): void
    {
        $sports = [
            ['name' => 'Futebol',       'slug' => 'futebol'],
            ['name' => 'Basquete',      'slug' => 'basquete'],
            ['name' => 'Vôlei',         'slug' => 'volei'],
            ['name' => 'Tênis de Mesa', 'slug' => 'tenis-de-mesa'],
            ['name' => 'Natação',       'slug' => 'natacao'],
            ['name' => 'Atletismo',     'slug' => 'atletismo'],
            ['name' => 'Handebol',      'slug' => 'handebol'],
            ['name' => 'Futsal',        'slug' => 'futsal'],
        ];

        foreach ($sports as $sport) {
            Sport::updateOrCreate(
                ['slug' => $sport['slug']],
                $sport
            );
        }
    }
}
