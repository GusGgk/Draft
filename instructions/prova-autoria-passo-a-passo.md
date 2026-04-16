# Prova de Autoria - Passo a Passo Universal

Objetivo: adicionar um campo extra em qualquer formulario do projeto, sem obrigacao de salvar no banco.

Este guia cobre 3 niveis de persistencia:
1. Sem persistencia: so alert e console.log
2. Persistencia local no navegador: localStorage ou sessionStorage
3. Persistencia no banco (opcional): quando o avaliador exigir

## Onde aplicar no projeto

Formularios comuns para demonstracao:
1. [draft-front-end/src/view/onboarding/Onboarding.jsx](draft-front-end/src/view/onboarding/Onboarding.jsx)
2. [draft-front-end/src/view/page-main/page-main.jsx](draft-front-end/src/view/page-main/page-main.jsx)
3. [draft-front-end/src/view/editarPerfil/editarPerfil.jsx](draft-front-end/src/view/editarPerfil/editarPerfil.jsx)

Observacao importante sobre Editar Perfil:
1. Essa tela usa `formData` com helper `setField(name, value)`
2. Prefira usar `onChange={(e) => setField('proof_field', e.target.value)}`
3. O submit dessa tela salva no backend por padrao (PATCH `/api/profile/{tipo}`)

## Passo a passo rapido (sem banco)

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

### Passo 4: validar no navegador

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

## Persistencia local (sem banco)

Se quiser provar que o valor fica salvo sem backend, use localStorage.

### Passo 5 (opcional): salvar no localStorage no blur

```jsx
onBlur={(e) => {
    const value = e.target.value;
    if (!String(value || '').trim()) return;

    localStorage.setItem('proof_field', value);
    console.log('[Prova Autoria] Salvo localmente:', value);
    alert(`Salvo localmente: ${value}`);
}}
```

### Passo 6 (opcional): carregar valor salvo ao abrir tela

```jsx
useEffect(() => {
    const saved = localStorage.getItem('proof_field');
    if (!saved) return;
    setFormData((prev) => ({ ...prev, proof_field: saved }));
}, []);
```

Quando usar sessionStorage:
1. Se o valor deve durar apenas na sessao atual do navegador
2. Troque localStorage por sessionStorage

## Persistencia no envio (sem criar coluna no banco)

Se quiser enviar o valor no request so para rastreio temporario:
1. Inclua proof_field no payload do post
2. No backend, aceite e registre em log, sem salvar em tabela

Observacao para Editar Perfil:
1. Como a tela ja envia PATCH para salvar perfil, se `proof_field` estiver em `formData` ele tende a ir no payload
2. Se nao quiser salvar no banco, remova `proof_field` dentro de `normalizePayload` antes de enviar

Exemplo de log no backend:

```php
\Log::info('Prova de autoria recebida', [
        'proof_field' => $request->input('proof_field'),
        'user_id' => auth()->id(),
]);
```

## Persistencia no banco (opcional, quando exigido)

### Passo 7: criar migration

```bash
cd draft-back-end
php artisan make:migration add_proof_field_to_atleta_table --table=atleta
```

### Passo 8: editar migration

```php
Schema::table('atleta', function (Blueprint $table) {
        $table->string('proof_field')->nullable()->after('endereco');
});
```

### Passo 9: executar migration

```bash
php artisan migrate
```

### Passo 10: liberar no model e controller

1. Model: incluir proof_field no fillable
2. Controller: validar e incluir proof_field no create ou update

## Roteiro de demonstracao em 5 minutos

1. Abra um formulario existente
2. Mostre o campo extra
3. Digite valor e saia do campo
4. Mostre alert e console.log
5. Recarregue a pagina e prove valor persistido (se usou localStorage)
6. Se pedirem banco: execute trilha opcional

Roteiro sugerido incluindo Editar Perfil:
1. Onboarding: inserir um input `date` ou `email`
2. Page Main: inserir um input `number` ou `text` de busca
3. Editar Perfil: inserir um input `select` ou `password` com `setField`
4. Mostrar onBlur (alert + console)
5. Mostrar persistencia local (localStorage)

## Checklist rapido para prova

1. Frontend rodando
2. Tela correta aberta
3. Campo novo visivel
4. onBlur funcionando
5. Log e alert funcionando
6. Persistencia escolhida funcionando (nenhuma, local, ou banco)
7. Se foi Editar Perfil, confirmar se o campo deve ou nao ir no PATCH

## Rollback rapido

Sem banco:
1. Remova o input do JSX
2. Remova o campo do estado
3. Remova localStorage/sessionStorage usado para prova

Com banco:

```bash
cd draft-back-end
php artisan migrate:rollback
```
