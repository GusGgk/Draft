# Draft Front-end

Aplicacao web da plataforma Draft, desenvolvida com React e Vite.

## Objetivo

Entregar a interface de autenticacao, onboarding e exploracao de perfis esportivos consumindo a API Laravel.

## Stack

- React 19
- Vite 8
- React Router 7
- Axios
- ESLint 9

## Requisitos

- Node.js 20+
- npm 10+
- Back-end Draft executando em http://localhost:8000

## Instalacao

No diretorio draft-front-end:

~~~bash
npm install
~~~

## Executando em Desenvolvimento

~~~bash
npm run dev
~~~

App padrao:

~~~text
http://localhost:5173
~~~

## Build e Preview

~~~bash
npm run build
npm run preview
~~~

## Qualidade de Codigo

~~~bash
npm run lint
~~~

## Integracao com API

O cliente HTTP principal esta em src/lib/axios.js com:

- baseURL apontando para http://localhost:8000
- withCredentials ativado para cookies
- cabecalhos de CSRF configurados

Principais chamadas atuais:

- POST /api/register
- POST /api/login
- GET /api/user
- POST /api/logout
- GET /api/sports
- GET /api/search/instituicoes
- GET /api/search/atletas
- POST /api/onboarding/atleta
- POST /api/onboarding/instituicao
- POST /api/onboarding/agente

## Estrutura de Pastas

~~~text
src/
  assets/
  common/
  lib/
  view/
  App.jsx
  AppRoutes.jsx
  routes.js
~~~

## Problemas Comuns

Erro de CORS ou cookie de sessao:

1. Garanta que o back-end esteja ativo em http://localhost:8000.
2. Verifique configuracoes de CORS e Sanctum no back-end.
3. Limpe cookies antigos do dominio local se necessario.

Erro de requisicao 419 (CSRF):

1. Confirme que withCredentials esta ativo no axios.
2. Valide se a sessao do Laravel esta funcionando.

Porta 5173 ocupada:

- Inicie novamente o Vite e use a porta alternativa sugerida no terminal.

## Referencias

- [README da raiz](../README.md)
- [Contributing.md](../Contributing.md)
