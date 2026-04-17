<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchAtletaRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if ($this->filled('dominance')) {
            $this->merge([
                'dominance' => mb_strtolower(trim((string) $this->input('dominance'))),
            ]);
        }

        /*if ($this->filled('endereco')) {
            $this->merge([
                'endereco' => trim((string) $this->input('endereco')),
            ]);
        } */
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'weight_min' => 'nullable|numeric|min:0',
            'weight_max' => 'nullable|numeric|min:0',
            'height_min' => 'nullable|numeric|min:0',
            'height_max' => 'nullable|numeric|min:0',
            'dominance'  => 'nullable|string|in:destro,canhoto,ambidestro,direito,direita,esquerdo,esquerda',
            //'endereco'   => 'nullable|string|max:255',
        ];
    }
}
