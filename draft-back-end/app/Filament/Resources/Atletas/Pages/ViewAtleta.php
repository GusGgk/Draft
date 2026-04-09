<?php

namespace App\Filament\Resources\Atletas\Pages;

use App\Filament\Resources\Atletas\AtletaResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewAtleta extends ViewRecord
{
    protected static string $resource = AtletaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
