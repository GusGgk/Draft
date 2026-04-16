<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInstituicaoProfileRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if ($this->has('sport_ids') && is_array($this->sport_ids)) {
            $this->merge([
                'sport_ids' => array_map('intval', $this->sport_ids),
            ]);
        }
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'organization_name' => 'required|string|max:255',
            'cnpj' => ['nullable', 'string', 'max:20', 'regex:/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/'],
            'institution_type' => 'required|string|max:255',
            'sport_ids' => 'nullable|array',
            'sport_ids.*' => 'exists:sports,id',
            'founded_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'website' => 'nullable|url|max:500',
            'phone' => 'nullable|string|max:30',
            'logo_path' => 'nullable|url|max:500',
            'headline' => 'nullable|string|max:120',
            'instagram' => 'nullable|string|max:100',
        ];
    }
}