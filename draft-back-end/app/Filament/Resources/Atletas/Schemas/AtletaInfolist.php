<?php

namespace App\Filament\Resources\Atletas\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class AtletaInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('nickname')
                    ->placeholder('-'),
                TextEntry::make('birth_date')
                    ->placeholder('-'),
                TextEntry::make('nationality')
                    ->placeholder('-'),
                TextEntry::make('primary_sport')
                    ->placeholder('-'),
                TextEntry::make('position')
                    ->placeholder('-'),
                TextEntry::make('height_cm')
                    ->placeholder('-'),
                TextEntry::make('weight_kg')
                    ->placeholder('-'),
                TextEntry::make('dominant_foot')
                    ->placeholder('-'),
                TextEntry::make('dominant_hand')
                    ->placeholder('-'),
                TextEntry::make('avaliability')
                    ->placeholder('-'),
                TextEntry::make('avatar_path')
                    ->placeholder('-'),
                TextEntry::make('bio')
                    ->placeholder('-'),
                TextEntry::make('endereco')
                    ->placeholder('-'),
                TextEntry::make('users_id')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
