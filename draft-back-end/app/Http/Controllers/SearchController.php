<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchAtletaRequest;
use App\Models\Atleta;
use App\Models\Instituicao;
use App\Models\Sport;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Listar todas as modalidades esportivas disponíveis.
     * GET /api/sports
     */
    public function listSports()
    {
        return response()->json(Sport::orderBy('name')->get());
    }

    /**
     * Buscar instituições por modalidade esportiva.
     * Usado pelo perfil Atleta.
     * GET /api/search/instituicoes?sport_id={id}
     */
    public function instituicoesBySport(Request $request)
    {
        $request->validate([
            'sport_id' => 'required|exists:sports,id',
        ]);

        $instituicoes = Instituicao::whereHas('sportsRelation', function ($query) use ($request) {
            $query->where('sports.id', $request->sport_id);
        })->with('sportsRelation')->get();

        return response()->json([
            'data' => $instituicoes,
            'total' => $instituicoes->count(),
        ]);
    }

    /**
     * Buscar atletas por características físicas.
     * Usado pelo perfil Agente.
     * GET /api/search/atletas?weight_min=&weight_max=&height_min=&height_max=&dominance=
     */
    public function atletasByCharacteristics(SearchAtletaRequest $request)
    {
        $query = Atleta::with('sport');

        if ($request->filled('weight_min')) {
            $query->where('weight_kg', '>=', $request->weight_min);
        }
        if ($request->filled('weight_max')) {
            $query->where('weight_kg', '<=', $request->weight_max);
        }
        if ($request->filled('height_min')) {
            $query->where('height_cm', '>=', $request->height_min);
        }
        if ($request->filled('height_max')) {
            $query->where('height_cm', '<=', $request->height_max);
        }
        if ($request->filled('dominance')) {
            $query->where(function ($q) use ($request) {
                $q->where('dominant_foot', $request->dominance)
                  ->orWhere('dominant_hand', $request->dominance);
            });
        }

        $atletas = $query->get();

        return response()->json([
            'data' => $atletas,
            'total' => $atletas->count(),
        ]);
    }
}
