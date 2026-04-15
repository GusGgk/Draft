<?php
// app/Models/Sport.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sport extends Model
{
    protected $fillable = ['name', 'slug'];

    /**
     * Uma modalidade pode estar em MUITAS instituições.
     */
    public function instituicoes(): BelongsToMany
    {
        return $this->belongsToMany(
            Instituicao::class,
            'instituicao_sport',
            'sport_id',
            'instituicao_id',
            'id',
            'idInstituicao'
        );
    }

    /**
     * Uma modalidade pode ter MUITOS atletas (via sport_id).
     */
    public function atletas(): HasMany
    {
        return $this->hasMany(Atleta::class, 'sport_id', 'id');
    }
}
