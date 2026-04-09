<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    // 1. Mude de 'false' para 'true' para permitir que qualquer um use este form
    public function authorize(): bool
    {
        return true; 
    }

    // 2. Aqui você define as regras de preenchimento
    public function rules(): array
    {
        return [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users', // o email já possui validação  de formato (ex: @)
            'password' => 'required|string|min:8|confirmed',
        ];
    }
}