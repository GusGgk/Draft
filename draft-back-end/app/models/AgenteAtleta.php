<?php
// app/Models/AgenteAtleta.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgenteAtleta extends Model
{
    protected $table = 'agenteAtleta';
    protected $primaryKey = 'idAgenteAtleta';

    // Não usa timestamps automáticos (tem seus próprios campos de data)
    public $timestamps = false;

    protected $fillable = [
        'status',
        'requested_at',
        'responded_at',
        'ended_at',
        'notes',
        'agente_idAgente',
        'atleta_idAtleta',
    ];

    /**
     * Esta relação PERTENCE a um Agente.
     */
    public function agente(): BelongsTo
    {
        return $this->belongsTo(Agente::class, 'agente_idAgente', 'idAgente');
    }

    /**
     * Esta relação PERTENCE a um Atleta.
     */
    public function atleta(): BelongsTo
    {
        return $this->belongsTo(Atleta::class, 'atleta_idAtleta', 'idAtleta');
    }
}
