<?php
// app/Models/Instituicao.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Instituicao extends Model
{
    protected $table = 'instituicao';
    protected $primaryKey = 'idInstituicao';

    protected $fillable = [
        'organization_name',
        'cnpj',
        'institution_type',
        'sports',
        'founded_year',
        'city',
        'state',
        'country',
        'description',
        'logo_path',
        'website',
        'users_id',
    ];

    /**
     * Uma instituição PERTENCE a um usuário.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    /**
     * Uma instituição tem MUITAS modalidades esportivas.
     */
    public function sportsRelation(): BelongsToMany
    {
        return $this->belongsToMany(
            Sport::class,
            'instituicao_sport',
            'instituicao_id',
            'sport_id',
            'idInstituicao',
            'id'
        );
    }
}
