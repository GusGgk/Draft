# Prova de Autoria - Passo a Passo Rapido

Objetivo: inserir um campo extra em formularios e provar autoria com alert/console no frontend.

## Escopo ja implementado neste projeto

1. Cadastro de Atleta: input date (proof_date)
2. Cadastro de Instituicao: input password (proof_password)
3. Cadastro de Agente: input email (proof_email)
4. Pesquisa Agente -> Atleta: input number (proof_number)
5. Pesquisa Atleta -> Instituicao: input text (proofSearchText)

## Arquivos alterados

- draft-front-end/src/view/onboarding/Onboarding.jsx
- draft-front-end/src/view/page-main/page-main.jsx

## Roteiro de demonstracao em 5 minutos

1. Abrir o cadastro de Atleta.
2. Preencher Data de Certificacao (Prova de Autoria).
3. Sair do campo (blur) e mostrar:
- alert na tela
- console.log no DevTools
4. Repetir para Instituicao (senha) e Agente (email).
5. Entrar na tela principal:
- perfil Agente: preencher Codigo Numerico (Prova de Autoria) na busca de atletas e sair do campo
- perfil Atleta: preencher Palavra-chave (Prova de Autoria) na busca de instituicoes e sair do campo

## Checklist de execucao na hora da prova

1. Frontend rodando (npm run dev)
2. Usuario autenticado para acessar onboarding/page-main
3. Abrir DevTools na aba Console
4. Testar cada campo novo
5. Confirmar mensagem de alert e log do console

## Como alterar rapidamente o tipo de campo na hora

1. Mudar o atributo type (text/number/date/email/password)
2. Ajustar nome do campo no state
3. Ajustar mensagem de alert
4. Validar em 30 segundos no navegador

## Trilha opcional se o avaliador pedir persistencia no banco

1. Criar migration da coluna

```bash
cd draft-back-end
php artisan make:migration add_proof_field_to_atleta_table --table=atleta
```

2. Editar migration gerada

```php
Schema::table('atleta', function (Blueprint $table) {
    $table->string('proof_field')->nullable()->after('endereco');
});
```

3. Rodar migration

```bash
php artisan migrate
```

4. Atualizar model e controller
- app/models/Atleta.php: incluir proof_field no fillable
- app/Http/Controllers/OnboardingController.php: validar e incluir proof_field no create

5. Testar criando um atleta e verificar valor salvo.

## Rollback rapido

Se algo der errado na persistencia opcional:

```bash
php artisan migrate:rollback
```

No front-only, basta remover o campo do JSX e do state para voltar ao estado anterior.
