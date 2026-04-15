# Draft

> Conectando atletas a oportunidades reais.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-0a7ea4)
![Front-end](https://img.shields.io/badge/front--end-React%20%2B%20Vite-222)
![Back-end](https://img.shields.io/badge/back--end-Laravel%2013-c0392b)
![Banco](https://img.shields.io/badge/database-MySQL%208-00618a)

## Visao rapida

Plataforma para conectar atletas, instituicoes e oportunidades no ecossistema esportivo, com foco em visibilidade, onboarding e descoberta de talentos.

---

## Menu

- [Visao rapida](#visao-rapida)
- [Personalizacao rapida](#personalizacao-rapida)
- [Sobre o projeto](#sobre-o-projeto)
- [Arquitetura](#arquitetura)
- [Stack tecnologica](#stack-tecnologica)
- [Roadmap](#roadmap)
- [Como rodar localmente](#como-rodar-localmente)
- [Padrao de branches](#padrao-de-branches)
- [Como contribuir](#como-contribuir)
- [Time](#time)
- [Licenca](#licenca)

---

## Personalizacao rapida

Edite apenas os campos abaixo para adaptar este README sem mexer no restante:

~~~txt
[NOME_PROJETO]            = Draft
[SLOGAN_CURTO_AQUI]       = Conectando atletas a oportunidades reais.
[DESCRICAO_CURTA_DO_PROJETO] = Plataforma focada em visibilidade esportiva.
[STATUS_PROJETO]          = Em desenvolvimento
[VERSAO_ATUAL]            = v0.1.0
[LINK_DEMO]               = Em breve
[LINK_DOCS]               = README da raiz + READMEs de modulo
[EMAIL_CONTATO]           = A definir
~~~

Blocos opcionais (pode remover se nao usar):

- [BADGES_OPCIONAIS_AQUI]
- Secao Roadmap
- Secao Demo
- Secao Contato

---

## Sobre o projeto

### Problema
Muitos atletas com alto potencial nao sao encontrados por clubes, agentes ou patrocinadores por falta de um canal estruturado de exposicao.

### Solucao
A Draft centraliza autenticacao, onboarding e busca de perfis esportivos, facilitando conexoes entre atletas e instituicoes.

### Publico-alvo
Atletas, instituicoes esportivas, agentes e recrutadores.

### Status
Em desenvolvimento.

### Versao
v0.1.0

---

## Arquitetura

Estrutura principal do workspace:

- draft-back-end: API e regras de negocio
- draft-front-end: aplicacao web
- instructions: materiais de apoio interno

Modifique os itens acima conforme o projeto evoluir.

---

## Stack tecnologica

| Camada | Tecnologia | Observacoes |
|---|---|---|
| Front-end | React 19 + Vite 8 | SPA com React Router e Axios |
| Back-end | Laravel 13 (PHP 8.3+) | API REST com Sanctum e Filament |
| Banco de dados | MySQL 8 | Execucao local via docker compose |
| Infra local | Docker Compose | Servico mysql mapeado em 3307:3306 |

---

## Roadmap

Use este bloco como checklist vivo:

- [ ] Finalizar onboarding completo por perfil (atleta, instituicao, agente)
- [ ] Evoluir filtros avancados de busca de atletas
- [ ] Adicionar testes automatizados de endpoints criticos
- [ ] Publicar ambiente de homologacao para validacao externa

---

## Como rodar localmente

### Requisitos

- PHP 8.3+
- Composer 2+
- Node.js 20+
- Docker Desktop

### Passo a passo

~~~bash
# 1) Back-end
cd draft-back-end
docker compose up -d
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed

# 2) Front-end
cd ../draft-front-end
npm install
npm run dev
~~~

### Enderecos padrao

- API: http://localhost:8000
- Front-end: http://localhost:5173

Se quiser, troque estes enderecos para o seu ambiente.

---

## Padrao de branches

~~~txt
main          -> versao estavel / producao
develop       -> integracao principal
feat/nome     -> nova funcionalidade
fix/nome      -> correcao de bug
docs/nome     -> documentacao
refactor/nome -> melhoria interna
~~~

Fluxo sugerido:

1. Crie branch a partir de develop.
2. Realize commits pequenos e claros.
3. Abra Pull Request para develop.
4. Aguarde revisao e aprovacao.

Guia completo em [Contributing.md](Contributing.md).

---

## Como contribuir

1. Leia [Contributing.md](Contributing.md).
2. Siga o padrao de branch e commits.
3. Abra PR com descricao objetiva do impacto.

---

## Time

Todos atuam em varias frentes, com ownership principal por area:

| Nome | Papel principal |
|---|---|
| Gustavo Giacoia Kumagai | Git Manager, Tech Lead e Front-end Lead |
| Mateus Dos Santos Furtado | Product Manager e Database Developer |
| Andre Gritten | Database Lead e Developer |
| Djames Ranunza | Documentation Lead e Back-end Lead |
| Eduardo Blasczak | Scrum Master e Back-end Developer |
| Joao Carlos Mezari | Scrum Helper e Front-end Developer |

Personalize esta tabela conforme mudancas do time.

---

## Demo

- Link: Em breve
- Documentacao: [README da raiz](README.md), [Back-end](draft-back-end/README.md) e [Front-end](draft-front-end/README.md)

---

## Contato

- Email: A definir
- Organizacao: Time Draft

---

## Licenca

Uso academico (TCC) com definicao de licenca formal pendente.

Se aplicavel, inclua o arquivo LICENSE na raiz.