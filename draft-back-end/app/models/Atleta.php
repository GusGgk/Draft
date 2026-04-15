<?php
// app/Models/Atleta.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Atleta extends Model
{
    // Nome da tabela no banco (Laravel assumiria 'atletas' por padrão)
    protected $table = 'atleta';

    // Chave primária customizada
    protected $primaryKey = 'idAtleta';

    // Campos que podem ser preenchidos em massa (mass assignment)
    protected $fillable = [
        'nickname',
        'birth_date',
        'nationality',
        'sport_id',
        'primary_sport',
        'position',
        'height_cm',
        'weight_kg',
        'dominant_foot',
        'dominant_hand',
        'avaliability',
        'avatar_path',
        'bio',
        'endereco',
        'users_id',
    ];

    /**
     * Um atleta PERTENCE a um usuário.
     * FK: atleta.users_id → users.id
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    /**
     * Um atleta PERTENCE a uma modalidade esportiva.
     * FK: atleta.sport_id → sports.id
     */
    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class, 'sport_id', 'id');
    }

    /**
     * Um atleta TEM MUITOS históricos.
     * FK: historicoAtleta.atleta_idAtleta → atleta.idAtleta
     */
    public function historicos(): HasMany
    {
        return $this->hasMany(HistoricoAtleta::class, 'atleta_idAtleta', 'idAtleta');
    }

    /**
     * Um atleta pode ter MUITOS agentes (via tabela pivot agenteAtleta).
     */
    public function agentes(): BelongsToMany
    {
        return $this->belongsToMany(
            Agente::class,
            'agenteAtleta',         // tabela pivot
            'atleta_idAtleta',      // FK deste model na pivot
            'agente_idAgente',      // FK do model relacionado na pivot
            'idAtleta',             // PK deste model
            'idAgente'              // PK do model relacionado
        )->withPivot(['status', 'requested_at', 'responded_at', 'ended_at', 'notes']);
    }
}
