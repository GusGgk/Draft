<?php

namespace App\Filament\Resources\Atletas\Pages;

use App\Filament\Resources\Atletas\AtletaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAtletas extends ListRecords
{
    protected static string $resource = AtletaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
