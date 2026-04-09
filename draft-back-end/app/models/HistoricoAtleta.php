<?php
// app/Models/HistoricoAtleta.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoricoAtleta extends Model
{
    protected $table = 'historicoAtleta';
    protected $primaryKey = 'idhistoricoAtleta';

    protected $fillable = [
        'club_name',
        'sport',
        'level',
        'started_at',
        'ended_at',
        'description',
        'midia',
        'atleta_idAtleta',
    ];

    /**
     * Um histórico PERTENCE a um atleta.
     */
    public function atleta(): BelongsTo
    {
        return $this->belongsTo(Atleta::class, 'atleta_idAtleta', 'idAtleta');
    }
}
