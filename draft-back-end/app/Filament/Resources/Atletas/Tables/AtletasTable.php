<?php

namespace App\Filament\Resources\Atletas\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AtletasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nickname')
                    ->searchable(),
                TextColumn::make('birth_date')
                    ->searchable(),
                TextColumn::make('nationality')
                    ->searchable(),
                TextColumn::make('primary_sport')
                    ->searchable(),
                TextColumn::make('position')
                    ->searchable(),
                TextColumn::make('height_cm')
                    ->searchable(),
                TextColumn::make('weight_kg')
                    ->searchable(),
                TextColumn::make('dominant_foot')
                    ->searchable(),
                TextColumn::make('dominant_hand')
                    ->searchable(),
                TextColumn::make('avaliability')
                    ->searchable(),
                TextColumn::make('avatar_path')
                    ->searchable(),
                TextColumn::make('bio')
                    ->searchable(),
                TextColumn::make('endereco')
                    ->searchable(),
                TextColumn::make('users_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
