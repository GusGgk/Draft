<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OnboardingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotas Públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas Protegidas (Exigem login via Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rotas de Onboarding
    Route::post('/onboarding/atleta', [OnboardingController::class, 'storeAtleta']);
    Route::post('/onboarding/instituicao', [OnboardingController::class, 'storeInstituicao']);
    Route::post('/onboarding/agente', [OnboardingController::class, 'storeAgente']);
});