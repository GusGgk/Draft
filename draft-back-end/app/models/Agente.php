<?php
// app/Models/Agente.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Agente extends Model
{
    protected $table = 'agente';
    protected $primaryKey = 'idAgente';

    protected $fillable = [
        'agency_name',
        'license_number',
        'sports_represented',
        'countries_active',
        'bio',
        'headline',
        'avatar_path',
        'phone',
        'website',
        'linkedin',
        'users_id',
    ];

    /**
     * Um agente PERTENCE a um usuário.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    /**
     * Um agente pode representar MUITOS atletas (via tabela pivot agenteAtleta).
     */
    public function atletas(): BelongsToMany
    {
        return $this->belongsToMany(
            Atleta::class,
            'agenteAtleta',
            'agente_idAgente',
            'atleta_idAtleta',
            'idAgente',
            'idAtleta'
        )->withPivot(['status', 'requested_at', 'responded_at', 'ended_at', 'notes']);
    }
}
