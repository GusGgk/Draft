<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Permite todos os métodos (GET, POST, etc)

    'allowed_origins' => ['http://localhost:5173'], // Permite apenas o frontend local

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permite todos os cabeçalhos

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // OBRIGATÓRIO ser true para login
];