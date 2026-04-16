<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAgenteProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'agency_name' => 'required|string|max:255',
            'license_number' => 'nullable|string|max:255',
            'sports_represented' => 'nullable|string|max:500',
            'countries_active' => 'nullable|string|max:500',
            'bio' => 'nullable|string|max:1000',
            'phone' => 'nullable|string|max:30',
            'website' => 'nullable|url|max:500',
            'avatar_path' => 'nullable|url|max:500',
            'headline' => 'nullable|string|max:120',
            'linkedin' => 'nullable|url|max:500',
        ];
    }
}