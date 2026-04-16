<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchAtletaRequest;
use App\Models\Atleta;
use App\Models\Instituicao;
use App\Models\Sport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Mapeia termos equivalentes de dominancia para pe e mao.
     */
    private function resolveDominanceTerms(string $dominance): array
    {
        $map = [
            'destro' => [
                'foot' => ['destro', 'direito'],
                'hand' => ['destro', 'direita'],
            ],
            'direito' => [
                'foot' => ['destro', 'direito'],
                'hand' => ['destro', 'direita'],
            ],
            'direita' => [
                'foot' => ['destro', 'direito'],
                'hand' => ['destro', 'direita'],
            ],
            'canhoto' => [
                'foot' => ['canhoto', 'esquerdo'],
                'hand' => ['canhoto', 'esquerda'],
            ],
            'esquerdo' => [
                'foot' => ['canhoto', 'esquerdo'],
                'hand' => ['canhoto', 'esquerda'],
            ],
            'esquerda' => [
                'foot' => ['canhoto', 'esquerdo'],
                'hand' => ['canhoto', 'esquerda'],
            ],
            'ambidestro' => [
                'foot' => ['ambidestro'],
                'hand' => ['ambidestro'],
            ],
        ];

        return $map[$dominance] ?? [
            'foot' => [$dominance],
            'hand' => [$dominance],
        ];
    }

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
                        $terms = $this->resolveDominanceTerms($request->dominance);

                        $query->where(function ($q) use ($terms) {
                                $q->whereIn(DB::raw('LOWER(dominant_foot)'), $terms['foot'])
                                    ->orWhereIn(DB::raw('LOWER(dominant_hand)'), $terms['hand']);
            });
        }

        $atletas = $query->get();

        return response()->json([
            'data' => $atletas,
            'total' => $atletas->count(),
        ]);
    }
}
