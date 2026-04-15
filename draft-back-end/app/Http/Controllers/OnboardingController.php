<?php

namespace App\Http\Controllers;

use App\Models\Atleta;
use App\Models\Instituicao;
use App\Models\Agente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    /**
     * Salvar perfil de Atleta
     */
    public function storeAtleta(Request $request)
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'nationality' => 'required|string|max:255',
            'sport_id' => 'required|exists:sports,id',
            'position' => 'nullable|string|max:255',
            'height_cm' => 'nullable|numeric',
            'weight_kg' => 'nullable|numeric',
            'dominant_foot' => 'nullable|string|max:50',
            'dominant_hand' => 'nullable|string|max:50',
            'bio' => 'nullable|string',
            'endereco' => 'nullable|string|max:500',
        ]);

        $atleta = Atleta::create([
            ...$request->only([
                'nickname', 'birth_date', 'nationality', 'sport_id',
                'position', 'height_cm', 'weight_kg', 'dominant_foot',
                'dominant_hand', 'bio', 'endereco',
            ]),
            'users_id' => Auth::id(),
        ]);

        // Carregar o nome do esporte para retornar no response
        $atleta->load('sport');

        return response()->json([
            'message' => 'Perfil de atleta criado com sucesso!',
            'data' => $atleta,
            'user_type' => 'atleta',
        ], 201);
    }

    /**
     * Salvar perfil de Instituição
     */
    public function storeInstituicao(Request $request)
    {
        $request->validate([
            'organization_name' => 'required|string|max:255',
            'cnpj' => 'nullable|string|max:20',
            'institution_type' => 'required|string|max:255',
            'sport_ids' => 'nullable|array',
            'sport_ids.*' => 'exists:sports,id',
            'founded_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'website' => 'nullable|url|max:500',
        ]);

        $instituicao = Instituicao::create([
            ...$request->only([
                'organization_name', 'cnpj', 'institution_type',
                'founded_year', 'city', 'state', 'country',
                'description', 'website',
            ]),
            'users_id' => Auth::id(),
        ]);

        // Associar modalidades esportivas via tabela pivot
        if ($request->has('sport_ids')) {
            $instituicao->sportsRelation()->attach($request->sport_ids);
        }

        // Carregar os esportes para retornar no response
        $instituicao->load('sportsRelation');

        return response()->json([
            'message' => 'Perfil de instituição criado com sucesso!',
            'data' => $instituicao,
            'user_type' => 'instituicao',
        ], 201);
    }

    /**
     * Salvar perfil de Agente
     */
    public function storeAgente(Request $request)
    {
        $request->validate([
            'agency_name' => 'required|string|max:255',
            'license_number' => 'nullable|string|max:255',
            'sports_represented' => 'nullable|string|max:500',
            'countries_active' => 'nullable|string|max:500',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:30',
            'website' => 'nullable|url|max:500',
        ]);

        $agente = Agente::create([
            ...$request->only([
                'agency_name', 'license_number', 'sports_represented',
                'countries_active', 'bio', 'phone', 'website',
            ]),
            'users_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Perfil de agente criado com sucesso!',
            'data' => $agente,
            'user_type' => 'agente',
        ], 201);
    }
}
