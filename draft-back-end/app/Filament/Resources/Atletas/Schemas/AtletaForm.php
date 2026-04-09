<?php

namespace App\Filament\Resources\Atletas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AtletaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nickname'),
                TextInput::make('birth_date'),
                TextInput::make('nationality'),
                TextInput::make('primary_sport'),
                TextInput::make('position'),
                TextInput::make('height_cm'),
                TextInput::make('weight_kg'),
                TextInput::make('dominant_foot'),
                TextInput::make('dominant_hand'),
                TextInput::make('avaliability'),
                TextInput::make('avatar_path'),
                TextInput::make('bio'),
                TextInput::make('endereco'),
                TextInput::make('users_id')
                    ->required()
                    ->numeric(),
            ]);
    }
}
