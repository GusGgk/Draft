<?php
// database/seeders/TestDataSeeder.php

namespace Database\Seeders;

use App\Models\Atleta;
use App\Models\Instituicao;
use App\Models\Sport;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestDataSeeder extends Seeder
{
    /**
     * Gera dados de teste: usuários, atletas e instituições com esportes variados.
     * Roda o SportsSeeder antes para garantir que as modalidades existam.
     *
     * Uso: php artisan db:seed --class=TestDataSeeder
     */
    public function run(): void
    {
        // 1. Garantir que os esportes existam
        $this->call(SportsSeeder::class);

        $sports = Sport::all();
        $this->command->info("✅ {$sports->count()} modalidades esportivas carregadas.");

        // ============================================================
        // 2. CRIAR ATLETAS (20 atletas com características variadas)
        // ============================================================
        $atletas = [
            // Futebol (6 atletas)
            ['nickname' => 'Zé Carlos',       'sport' => 'futebol',     'position' => 'Atacante',      'height' => 178.0, 'weight' => 75.5,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'São Paulo'],
            ['nickname' => 'Thiago Mendes',    'sport' => 'futebol',     'position' => 'Meio-campo',    'height' => 182.0, 'weight' => 78.0,  'foot' => 'canhoto',    'hand' => 'canhoto',    'city' => 'Rio de Janeiro'],
            ['nickname' => 'Lucas Paixão',     'sport' => 'futebol',     'position' => 'Goleiro',       'height' => 192.0, 'weight' => 88.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'Belo Horizonte'],
            ['nickname' => 'Rafael Souza',     'sport' => 'futebol',     'position' => 'Zagueiro',      'height' => 186.5, 'weight' => 83.2,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'Curitiba'],
            ['nickname' => 'Pedro Lima',       'sport' => 'futebol',     'position' => 'Lateral',       'height' => 174.0, 'weight' => 70.0,  'foot' => 'ambidestro', 'hand' => 'destro',     'city' => 'Porto Alegre'],
            ['nickname' => 'Anderson Silva',   'sport' => 'futebol',     'position' => 'Volante',       'height' => 180.0, 'weight' => 77.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'Salvador'],

            // Basquete (4 atletas)
            ['nickname' => 'João Victor',      'sport' => 'basquete',    'position' => 'Armador',       'height' => 188.0, 'weight' => 84.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'São Paulo'],
            ['nickname' => 'Bruno Almeida',    'sport' => 'basquete',    'position' => 'Pivô',          'height' => 205.0, 'weight' => 105.0, 'foot' => 'destro',     'hand' => 'canhoto',    'city' => 'Franca'],
            ['nickname' => 'Marcos Vinícius',  'sport' => 'basquete',    'position' => 'Ala',           'height' => 196.0, 'weight' => 92.0,  'foot' => 'canhoto',    'hand' => 'canhoto',    'city' => 'Bauru'],
            ['nickname' => 'Felipe Costa',     'sport' => 'basquete',    'position' => 'Ala-Pivô',      'height' => 200.0, 'weight' => 98.0,  'foot' => 'destro',     'hand' => 'ambidestro', 'city' => 'Campinas'],

            // Vôlei (3 atletas)
            ['nickname' => 'Maria Fernanda',   'sport' => 'volei',       'position' => 'Levantadora',   'height' => 178.0, 'weight' => 68.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'Belo Horizonte'],
            ['nickname' => 'Ana Paula',        'sport' => 'volei',       'position' => 'Oposta',        'height' => 190.0, 'weight' => 79.0,  'foot' => 'canhoto',    'hand' => 'canhoto',    'city' => 'Osasco'],
            ['nickname' => 'Camila Santos',    'sport' => 'volei',       'position' => 'Líbero',        'height' => 168.0, 'weight' => 62.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'Curitiba'],

            // Natação (2 atletas)
            ['nickname' => 'Igor Nascimento',  'sport' => 'natacao',     'position' => 'Velocista',     'height' => 190.0, 'weight' => 85.0,  'foot' => 'destro',     'hand' => 'ambidestro', 'city' => 'Rio de Janeiro'],
            ['nickname' => 'Larissa Oliveira', 'sport' => 'natacao',     'position' => 'Fundista',      'height' => 175.0, 'weight' => 65.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'São Paulo'],

            // Futsal (2 atletas)
            ['nickname' => 'Diego Ribeiro',    'sport' => 'futsal',      'position' => 'Pivô',          'height' => 172.0, 'weight' => 72.0,  'foot' => 'canhoto',    'hand' => 'destro',     'city' => 'Cascavel'],
            ['nickname' => 'Matheus Ferreira', 'sport' => 'futsal',      'position' => 'Fixo',          'height' => 176.0, 'weight' => 74.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'Joinville'],

            // Handebol (2 atletas)
            ['nickname' => 'Juliana Rocha',    'sport' => 'handebol',    'position' => 'Armadora',      'height' => 174.0, 'weight' => 70.0,  'foot' => 'destro',     'hand' => 'canhoto',    'city' => 'Maringá'],
            ['nickname' => 'Roberto Mendes',   'sport' => 'handebol',    'position' => 'Pivô',          'height' => 195.0, 'weight' => 100.0, 'foot' => 'destro',     'hand' => 'destro',     'city' => 'Guarulhos'],

            // Tênis de Mesa (1 atleta)
            ['nickname' => 'Hugo Tanaka',      'sport' => 'tenis-de-mesa', 'position' => 'Caneta',     'height' => 170.0, 'weight' => 65.0,  'foot' => 'destro',     'hand' => 'destro',     'city' => 'São Paulo'],
        ];

        foreach ($atletas as $index => $data) {
            $sport = $sports->firstWhere('slug', $data['sport']);

            // Criar um usuário para cada atleta
            $user = User::create([
                'name'     => $data['nickname'],
                'email'    => 'atleta' . ($index + 1) . '@draft.test',
                'password' => Hash::make('password123'),
            ]);

            Atleta::create([
                'nickname'      => $data['nickname'],
                'birth_date'    => fake()->dateTimeBetween('-30 years', '-16 years')->format('Y-m-d'),
                'nationality'   => 'Brasileiro(a)',
                'sport_id'      => $sport?->id,
                'primary_sport' => $sport?->name,
                'position'      => $data['position'],
                'height_cm'     => $data['height'],
                'weight_kg'     => $data['weight'],
                'dominant_foot' => $data['foot'],
                'dominant_hand' => $data['hand'],
                'avaliability'  => 'disponivel',
                'bio'           => "{$sport?->name} - {$data['city']}",
                'endereco'      => $data['city'],
                'users_id'      => $user->id,
            ]);
        }

        $this->command->info("✅ " . count($atletas) . " atletas criados com sucesso.");

        // ============================================================
        // 3. CRIAR INSTITUIÇÕES (12 instituições com esportes variados)
        // ============================================================
        $instituicoes = [
            // Clubes multiesportivos
            ['name' => 'Clube Flamengo',       'type' => 'Clube',       'city' => 'Rio de Janeiro', 'state' => 'RJ', 'sports' => ['futebol', 'basquete', 'volei', 'natacao', 'futsal']],
            ['name' => 'SC Corinthians',       'type' => 'Clube',       'city' => 'São Paulo',      'state' => 'SP', 'sports' => ['futebol', 'basquete', 'futsal']],
            ['name' => 'SE Palmeiras',         'type' => 'Clube',       'city' => 'São Paulo',      'state' => 'SP', 'sports' => ['futebol', 'volei', 'handebol']],
            ['name' => 'Grêmio FBPA',          'type' => 'Clube',       'city' => 'Porto Alegre',   'state' => 'RS', 'sports' => ['futebol', 'futsal']],

            // Universidades
            ['name' => 'USP Esportes',         'type' => 'Universidade','city' => 'São Paulo',      'state' => 'SP', 'sports' => ['natacao', 'atletismo', 'volei', 'basquete', 'tenis-de-mesa']],
            ['name' => 'UFMG Esportes',        'type' => 'Universidade','city' => 'Belo Horizonte', 'state' => 'MG', 'sports' => ['futebol', 'handebol', 'atletismo']],

            // Escolinhas / Academias
            ['name' => 'Futsal Cascavel',      'type' => 'Academia',   'city' => 'Cascavel',       'state' => 'PR', 'sports' => ['futsal']],
            ['name' => 'AquaSport Natação',    'type' => 'Escola',     'city' => 'Curitiba',       'state' => 'PR', 'sports' => ['natacao']],
            ['name' => 'CT Vôlei Osasco',      'type' => 'CT',         'city' => 'Osasco',         'state' => 'SP', 'sports' => ['volei']],
            ['name' => 'Instituto Basket BR',  'type' => 'Instituto',  'city' => 'Franca',         'state' => 'SP', 'sports' => ['basquete']],
            ['name' => 'Clube Handebol MGA',   'type' => 'Clube',      'city' => 'Maringá',        'state' => 'PR', 'sports' => ['handebol']],
            ['name' => 'Assoc. Tênis Mesa SP', 'type' => 'Associação', 'city' => 'São Paulo',      'state' => 'SP', 'sports' => ['tenis-de-mesa']],
        ];

        foreach ($instituicoes as $index => $data) {
            // Criar um usuário para cada instituição
            $user = User::create([
                'name'     => $data['name'],
                'email'    => 'inst' . ($index + 1) . '@draft.test',
                'password' => Hash::make('password123'),
            ]);

            $instituicao = Instituicao::create([
                'organization_name' => $data['name'],
                'cnpj'              => fake()->numerify('##.###.###/####-##'),
                'institution_type'  => $data['type'],
                'founded_year'      => fake()->numberBetween(1890, 2020),
                'city'              => $data['city'],
                'state'             => $data['state'],
                'country'           => 'Brasil',
                'description'       => "{$data['city']}/{$data['state']}",
                'users_id'          => $user->id,
            ]);

            // Associar esportes via pivot
            $sportIds = $sports->whereIn('slug', $data['sports'])->pluck('id')->toArray();
            $instituicao->sportsRelation()->attach($sportIds);
        }

        $this->command->info("✅ " . count($instituicoes) . " instituições criadas com sucesso.");

        // ============================================================
        // 4. RESUMO PARA TESTES
        // ============================================================
        $this->command->newLine();
        $this->command->info('╔══════════════════════════════════════════════════╗');
        $this->command->info('║          DADOS DE TESTE CRIADOS                 ║');
        $this->command->info('╠══════════════════════════════════════════════════╣');
        $this->command->info('║  Atletas:      ' . str_pad(count($atletas), 4) .      '                          ║');
        $this->command->info('║  Instituições: ' . str_pad(count($instituicoes), 4) . '                          ║');
        $this->command->info('║  Modalidades:  ' . str_pad($sports->count(), 4) .     '                          ║');
        $this->command->info('╠══════════════════════════════════════════════════╣');
        $this->command->info('║  Senha de todos os usuários: password123        ║');
        $this->command->info('║  E-mails atletas:  atleta1@draft.test ...       ║');
        $this->command->info('║  E-mails instit.:  inst1@draft.test ...         ║');
        $this->command->info('╠══════════════════════════════════════════════════╣');
        $this->command->info('║  FILTROS PARA TESTAR:                           ║');
        $this->command->info('║  • Peso 60-75kg → ~8 atletas                    ║');
        $this->command->info('║  • Peso 80-110kg → ~7 atletas                   ║');
        $this->command->info('║  • Altura 170-180cm → ~9 atletas                ║');
        $this->command->info('║  • Altura 190-210cm → ~6 atletas                ║');
        $this->command->info('║  • Canhotos → ~5 atletas                        ║');
        $this->command->info('║  • Ambidestros → ~3 atletas                     ║');
        $this->command->info('║  • Futebol (instituições) → 5 instituições      ║');
        $this->command->info('║  • Natação (instituições) → 3 instituições      ║');
        $this->command->info('║  • Tênis de Mesa (instituições) → 2 instit.     ║');
        $this->command->info('╚══════════════════════════════════════════════════╝');
    }
}
