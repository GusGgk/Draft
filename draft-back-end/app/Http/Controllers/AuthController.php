<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Models\Atleta;
use App\Models\Instituicao;
use App\Models\Agente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Criar novo usuário
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json($this->userWithProfile($user), 201);
    }

    // Entrar no sistema
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais estão incorretas.'],
            ]);
        }

        $request->session()->regenerate();

        return response()->json($this->userWithProfile(Auth::user()));
    }

    // Ver quem está logado
    public function user(Request $request)
    {
        return response()->json($this->userWithProfile($request->user()));
    }

    // Sair do sistema
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Deslogado com sucesso']);
    }

    /**
     * Verifica se o usuário já tem perfil (atleta, instituição ou agente)
     * e retorna os dados do usuário com as flags has_profile e user_type.
     */
    private function userWithProfile($user)
    {
        $userData = $user->toArray();

        // Verificar em qual tabela o usuário está e trazer os dados do perfil
        $atleta = Atleta::where('users_id', $user->id)->first();
        if ($atleta) {
            $userData['has_profile'] = true;
            $userData['user_type'] = 'atleta';
            $userData['profile'] = $atleta->toArray();
            return $userData;
        }

        $instituicao = Instituicao::where('users_id', $user->id)->first();
        if ($instituicao) {
            $userData['has_profile'] = true;
            $userData['user_type'] = 'instituicao';
            $userData['profile'] = $instituicao->toArray();
            return $userData;
        }

        $agente = Agente::where('users_id', $user->id)->first();
        if ($agente) {
            $userData['has_profile'] = true;
            $userData['user_type'] = 'agente';
            $userData['profile'] = $agente->toArray();
            return $userData;
        }

        $userData['has_profile'] = false;
        $userData['user_type'] = null;
        $userData['profile'] = null;

        return $userData;
    }
}