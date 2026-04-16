<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAgenteProfileRequest;
use App\Http\Requests\UpdateAtletaProfileRequest;
use App\Http\Requests\UpdateInstituicaoProfileRequest;
use App\Models\Agente;
use App\Models\Atleta;
use App\Models\Instituicao;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Retorna o perfil do usuario autenticado no formato esperado pelo frontend.
     */
    public function show(Request $request)
    {
        return response()->json($this->resolveUserProfile($request->user()->id));
    }

    public function updateAtleta(UpdateAtletaProfileRequest $request)
    {
        $atleta = Atleta::where('users_id', $request->user()->id)->firstOrFail();

        $atleta->fill($request->validated());

        if ($request->filled('sport_id')) {
            $atleta->loadMissing('sport');
            $atleta->primary_sport = $atleta->sport?->name;
        }

        $atleta->save();

        return response()->json([
            'message' => 'Perfil de atleta atualizado com sucesso.',
            'data' => $this->resolveUserProfile($request->user()->id),
        ]);
    }

    public function updateInstituicao(UpdateInstituicaoProfileRequest $request)
    {
        $instituicao = Instituicao::where('users_id', $request->user()->id)->firstOrFail();

        $payload = $request->safe()->except('sport_ids');
        $instituicao->fill($payload);
        $instituicao->save();

        if ($request->has('sport_ids')) {
            $instituicao->sportsRelation()->sync($request->input('sport_ids', []));
        }

        return response()->json([
            'message' => 'Perfil de instituicao atualizado com sucesso.',
            'data' => $this->resolveUserProfile($request->user()->id),
        ]);
    }

    public function updateAgente(UpdateAgenteProfileRequest $request)
    {
        $agente = Agente::where('users_id', $request->user()->id)->firstOrFail();

        $agente->fill($request->validated());
        $agente->save();

        return response()->json([
            'message' => 'Perfil de agente atualizado com sucesso.',
            'data' => $this->resolveUserProfile($request->user()->id),
        ]);
    }

    private function resolveUserProfile(int $userId): array
    {
        $atleta = Atleta::with('sport')->where('users_id', $userId)->first();
        if ($atleta) {
            return [
                'user_type' => 'atleta',
                'profile' => $atleta,
            ];
        }

        $instituicao = Instituicao::with('sportsRelation')->where('users_id', $userId)->first();
        if ($instituicao) {
            $profile = $instituicao->toArray();
            $profile['sport_ids'] = $instituicao->sportsRelation->pluck('id')->values();

            return [
                'user_type' => 'instituicao',
                'profile' => $profile,
            ];
        }

        $agente = Agente::where('users_id', $userId)->first();
        if ($agente) {
            return [
                'user_type' => 'agente',
                'profile' => $agente,
            ];
        }

        return [
            'user_type' => null,
            'profile' => null,
        ];
    }
}