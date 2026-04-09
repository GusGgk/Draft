<?php

namespace App\Filament\Resources\Atletas\Pages;

use App\Filament\Resources\Atletas\AtletaResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditAtleta extends EditRecord
{
    protected static string $resource = AtletaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
