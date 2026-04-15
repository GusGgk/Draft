# Draft Back-end

API da plataforma Draft desenvolvida com Laravel.

## Objetivo

Este servico concentra autenticacao, onboarding e busca de dados esportivos para consumo do front-end.

## Stack

- PHP 8.3+
- Laravel 13
- Laravel Sanctum
- Filament
- MySQL 8

## Requisitos

- PHP 8.3+
- Composer 2+
- Node.js 20+ e npm
- Docker Desktop (opcional, recomendado para MySQL)

## Configuracao Inicial

No diretorio draft-back-end:

~~~bash
composer install
copy .env.example .env
php artisan key:generate
~~~

## Banco de Dados

### Opcao recomendada: MySQL via Docker

~~~bash
docker compose up -d
~~~

O compose atual cria:

- host: 127.0.0.1
- porta: 3307
- database: xxxx
- usuario: xxxx
- senha: xxxx

Ajuste o arquivo .env para usar MySQL, por exemplo:

~~~env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=xxxx
DB_USERNAME=xxxx
DB_PASSWORD=xxxx
~~~

### Migracoes e Seed

~~~bash
php artisan migrate
php artisan db:seed
~~~

Observacao importante:
Se o seed falhar por tabela inexistente, rode migracao antes do seed.

Usuario seedado para desenvolvimento:

- email: test@example.com
- senha: password123

## Executando em Desenvolvimento

### API apenas

~~~bash
php artisan serve
~~~

### Ambiente completo do back-end

Executa servidor, fila, logs e vite em paralelo:

~~~bash
composer run dev
~~~

API padrao:

~~~text
http://localhost:8000
~~~

## Assets

~~~bash
npm install
npm run dev
~~~

Para build de assets:

~~~bash
npm run build
~~~

## Testes

~~~bash
composer run test
~~~

Ou diretamente:

~~~bash
php artisan test
~~~

## Endpoints Principais

Publicos:

- POST /api/register
- POST /api/login

Protegidos (auth:sanctum):

- GET /api/user
- POST /api/logout
- POST /api/onboarding/atleta
- POST /api/onboarding/instituicao
- POST /api/onboarding/agente
- GET /api/sports
- GET /api/search/instituicoes?sport_id={id}
- GET /api/search/atletas?parametros

## Problemas Comuns

Conexao com banco falhando:

1. Verifique se o container MySQL esta ativo.
2. Confira credenciais no .env.
3. Valide se a porta 3307 esta livre na maquina.

Erro de chave da aplicacao:

~~~bash
php artisan key:generate
~~~

Caches inconsistentes:

~~~bash
php artisan optimize:clear
~~~

## Referencias

- [README da raiz](../README.md)
- [Contributing.md](../Contributing.md)
