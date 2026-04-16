<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAtletaProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nickname' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'nationality' => 'required|string|max:255',
            'sport_id' => 'required|exists:sports,id',
            'position' => 'nullable|string|max:255',
            'height_cm' => 'nullable|numeric|min:0|max:300',
            'weight_kg' => 'nullable|numeric|min:0|max:400',
            'dominant_foot' => 'nullable|string|in:direito,esquerdo,ambidestro,destro,canhoto,Direito,Esquerdo,Ambidestro',
            'dominant_hand' => 'nullable|string|in:direita,esquerda,ambidestro,destro,canhoto,Direita,Esquerda,Ambidestro',
            'bio' => 'nullable|string|max:1000',
            'endereco' => 'nullable|string|max:500',
            'avaliability' => 'nullable|string|max:45',
            'avatar_path' => 'nullable|url|max:500',
            'headline' => 'nullable|string|max:120',
            'instagram' => 'nullable|string|max:100',
        ];
    }
}