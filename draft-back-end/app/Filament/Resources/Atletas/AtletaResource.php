<?php

namespace App\Filament\Resources\Atletas;

use App\Filament\Resources\Atletas\Pages\CreateAtleta;
use App\Filament\Resources\Atletas\Pages\EditAtleta;
use App\Filament\Resources\Atletas\Pages\ListAtletas;
use App\Filament\Resources\Atletas\Pages\ViewAtleta;
use App\Filament\Resources\Atletas\Schemas\AtletaForm;
use App\Filament\Resources\Atletas\Schemas\AtletaInfolist;
use App\Filament\Resources\Atletas\Tables\AtletasTable;
use App\Models\Atleta;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AtletaResource extends Resource
{
    protected static ?string $model = Atleta::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Atleta';

    public static function form(Schema $schema): Schema
    {
        return AtletaForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return AtletaInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AtletasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAtletas::route('/'),
            'create' => CreateAtleta::route('/create'),
            'view' => ViewAtleta::route('/{record}'),
            'edit' => EditAtleta::route('/{record}/edit'),
        ];
    }
}
