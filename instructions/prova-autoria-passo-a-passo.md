# Prova de Autoria - Passo a Passo Universal

Objetivo: adicionar um campo extra em qualquer formulario do projeto, com persistencia no banco (migration, model e controller).

Este guia cobre 2 camadas de demonstracao:
1. Frontend: input novo no formulario com estado e onBlur
2. Persistencia no banco: migration + model + controller (fluxo principal)

## Onde aplicar no projeto

Formularios comuns para demonstracao:
1. [draft-front-end/src/view/onboarding/Onboarding.jsx](draft-front-end/src/view/onboarding/Onboarding.jsx)
2. [draft-front-end/src/view/page-main/page-main.jsx](draft-front-end/src/view/page-main/page-main.jsx)
3. [draft-front-end/src/view/editarPerfil/editarPerfil.jsx](draft-front-end/src/view/editarPerfil/editarPerfil.jsx)

Observacao importante sobre Editar Perfil:
1. Essa tela usa `formData` com helper `setField(name, value)`
2. Prefira usar `onChange={(e) => setField('proof_field', e.target.value)}`
3. O submit dessa tela salva no backend por padrao (PATCH `/api/profile/{tipo}`)

## Passo a passo rapido (com banco)

### Passo 1: escolher formulario e tipo de campo

Escolha um formulario existente e um tipo de input:
1. text
2. number
3. date
4. email
5. password
6. select

### Passo 2: adicionar campo no estado do formulario

No objeto de estado, inclua um novo campo, por exemplo:

```jsx
const [formData, setFormData] = useState({
    // campos existentes
    proof_field: '',
});
```

### Passo 3: inserir input no JSX

Exemplo base:

```jsx
<div className="form-group full-width">
    <label>Campo de Prova</label>
    <input
        type="text"
        name="proof_field"
        value={formData.proof_field}
        onChange={(e) => setFormData({ ...formData, proof_field: e.target.value })}
        onBlur={(e) => {
            if (!e.target.value.trim()) return;
            console.log('[Prova Autoria] Campo preenchido:', e.target.value);
            alert(`Prova registrada: ${e.target.value}`);
        }}
        placeholder="Digite um valor"
    />
</div>
```

### Passo 3.1: variante para Editar Perfil (setField)

Use este formato quando estiver em [draft-front-end/src/view/editarPerfil/editarPerfil.jsx](draft-front-end/src/view/editarPerfil/editarPerfil.jsx):

```jsx
<div className="field">
    <label>Campo de Prova</label>
    <input
        type="text"
        value={formData.proof_field || ''}
        onChange={(e) => setField('proof_field', e.target.value)}
        onBlur={(e) => {
            if (!String(e.target.value || '').trim()) return;
            console.log('[Prova Autoria] Editar Perfil:', e.target.value);
            alert(`Prova (Editar Perfil) registrada: ${e.target.value}`);
        }}
        placeholder="Digite um valor"
    />
</div>
```

### Passo 4: validar no navegador (frontend)

1. Rode o frontend:

```bash
cd draft-front-end
npm run dev
```

2. Abra a tela do formulario
3. Preencha o campo novo
4. Tire o foco do campo
5. Confirme:
     1. alert na tela
     2. log no console do DevTools

## Persistencia no banco (fluxo obrigatorio deste roteiro)

### Passo 5: criar migration

```bash
cd draft-back-end
php artisan make:migration add_proof_field_to_atleta_table --table=atleta
```

### Passo 6: editar migration

```php
Schema::table('atleta', function (Blueprint $table) {
    $table->string('proof_field')->nullable()->after('endereco');
});
```

### Passo 7: executar migration

```bash
php artisan migrate
```

### Passo 8: liberar no model e controller

1. Model: incluir `proof_field` no `fillable`
2. Controller: validar e incluir `proof_field` no create ou update
3. Se houver Request dedicado (FormRequest), adicionar regra de validacao

### Passo 9: validar persistencia real no banco

1. Rode frontend e backend
2. Preencha e envie o formulario
3. Confira o payload no DevTools Network
4. Confira no banco (ou tinker) se `proof_field` foi salvo
5. Edite novamente o registro e confirme update do campo

## Passo a passo especifico para campos em Search

Use esta trilha quando o professor pedir um campo novo dentro de uma busca.

### Cenario recomendado no projeto

1. Tela: [draft-front-end/src/view/page-main/page-main.jsx](draft-front-end/src/view/page-main/page-main.jsx)
2. Busca de Atletas (perfil agente): formulario com `onSubmit`
3. Busca de Instituicoes (perfil atleta): select com busca no `onChange`

### Passo S1: adicionar filtro no estado

Se a busca usa objeto de filtros, adicione um campo novo.

```jsx
const [atletaFilters, setAtletaFilters] = useState({
    weight_min: '',
    weight_max: '',
    height_min: '',
    height_max: '',
    dominance: '',
    proof_search_text: '',
});
```

### Passo S2: adicionar input no bloco da busca

```jsx
<div className="search-field">
    <label className="search-label">Palavra-chave (Prova)</label>
    <input
        type="text"
        className="search-input"
        placeholder="Ex: base, sub-20"
        value={atletaFilters.proof_search_text}
        onChange={(e) => setAtletaFilters({ ...atletaFilters, proof_search_text: e.target.value })}
        onBlur={(e) => {
            if (!String(e.target.value || '').trim()) return;
            console.log('[Prova Autoria][Search] Palavra-chave:', e.target.value);
            alert(`Filtro de busca aplicado: ${e.target.value}`);
        }}
    />
</div>
```

### Passo S3: enviar o campo na busca

No handler da busca, inclua o campo nos query params.

```jsx
if (atletaFilters.proof_search_text) {
    params.append('proof_search_text', atletaFilters.proof_search_text);
}
```

### Passo S4: validar sem banco

1. Digite no campo da busca
2. Saia do campo para disparar onBlur
3. Clique no botao de buscar
4. Confira no DevTools Network se `proof_search_text` foi enviado
5. Se o backend ignorar esse parametro, a busca continua funcionando (sem quebrar)

### Passo S5 (opcional): busca em tempo real com debounce

Se quiser mostrar maturidade tecnica, aplique debounce de 300 a 500 ms antes de disparar a busca automatica.

## Roteiro de demonstracao em 5 minutos

1. Abra um formulario existente
2. Mostre o campo extra
3. Digite valor e saia do campo
4. Mostre alert e console.log
5. Envie o formulario e mostre no Network o `proof_field`
6. Mostre no banco (ou tinker) que o valor foi persistido
7. Edite novamente e mostre que o valor foi atualizado no banco

Roteiro sugerido incluindo Editar Perfil:
1. Onboarding: inserir um input `date` ou `email`
2. Page Main: inserir um input `number` ou `text` de busca
3. Editar Perfil: inserir um input `select` ou `password` com `setField`
4. Mostrar onBlur (alert + console)
5. Mostrar persistencia no banco (Network + banco)

## Checklist rapido para prova

1. Frontend rodando
2. Tela correta aberta
3. Campo novo visivel
4. onBlur funcionando
5. Log e alert funcionando
6. Persistencia no banco funcionando (migration aplicada e campo salvo)
7. Se foi Editar Perfil, confirmar se o campo deve ou nao ir no PATCH

## Rollback rapido

Frontend:
1. Remova o input do JSX
2. Remova o campo do estado

Banco:

```bash
cd draft-back-end
php artisan migrate:rollback
```
