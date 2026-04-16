# Templates Default - Prova de Autoria

Este arquivo tem snippets prontos para inserir um campo extra no front com alerta e log de console.

## 1) Template Base de Estado

```jsx
const [formData, setFormData] = useState({
  // campos existentes...
  proof_field: '',
});
```

## 2) Template Input Text

```jsx
<div className="form-group full-width">
  <label>Campo Extra (Prova de Autoria)</label>
  <input
    type="text"
    name="proof_field"
    value={formData.proof_field}
    onChange={(e) => setFormData({ ...formData, proof_field: e.target.value })}
    onBlur={(e) => {
      if (e.target.value.trim()) {
        console.log('[Prova Autoria] Texto informado:', e.target.value);
        alert(`Campo de prova preenchido: ${e.target.value}`);
      }
    }}
    placeholder="Digite um valor"
  />
</div>
```

## 3) Template Input Number

```jsx
<div className="form-group full-width">
  <label>Código Numérico (Prova de Autoria)</label>
  <input
    type="number"
    name="proof_number"
    value={formData.proof_number}
    onChange={(e) => setFormData({ ...formData, proof_number: e.target.value })}
    onBlur={(e) => {
      if (e.target.value) {
        console.log('[Prova Autoria] Número informado:', e.target.value);
        alert(`Código de prova registrado: ${e.target.value}`);
      }
    }}
    placeholder="Ex: 2026"
  />
</div>
```

## 4) Template Input Date

```jsx
<div className="form-group full-width">
  <label>Data de Prova de Autoria</label>
  <input
    type="date"
    name="proof_date"
    value={formData.proof_date}
    onChange={(e) => setFormData({ ...formData, proof_date: e.target.value })}
    onBlur={(e) => {
      if (e.target.value) {
        console.log('[Prova Autoria] Data informada:', e.target.value);
        alert(`Data de prova registrada: ${e.target.value}`);
      }
    }}
  />
</div>
```

## 5) Template Input Email

```jsx
<div className="form-group full-width">
  <label>E-mail de Verificação (Prova de Autoria)</label>
  <input
    type="email"
    name="proof_email"
    value={formData.proof_email}
    onChange={(e) => setFormData({ ...formData, proof_email: e.target.value })}
    onBlur={(e) => {
      if (e.target.value) {
        console.log('[Prova Autoria] E-mail informado:', e.target.value);
        alert(`Prova registrada para: ${e.target.value}`);
      }
    }}
    placeholder="email@dominio.com"
  />
</div>
```

## 6) Template Input Password

```jsx
<div className="form-group full-width">
  <label>Senha de Confirmação (Prova de Autoria)</label>
  <input
    type="password"
    name="proof_password"
    value={formData.proof_password}
    onChange={(e) => setFormData({ ...formData, proof_password: e.target.value })}
    onBlur={(e) => {
      if (e.target.value) {
        console.log('[Prova Autoria] Senha preenchida (mascarada).');
        alert('Campo de prova de autoria (senha) preenchido com sucesso.');
      }
    }}
    placeholder="Digite uma senha temporaria"
  />
</div>
```

## 6.1) Template Input Select

```jsx
<div className="form-group full-width">
  <label>Nivel de Prova (Select)</label>
  <select
    name="proof_level"
    value={formData.proof_level}
    onChange={(e) => setFormData({ ...formData, proof_level: e.target.value })}
    onBlur={(e) => {
      if (!e.target.value) return;
      console.log('[Prova Autoria] Nivel selecionado:', e.target.value);
      alert(`Nivel de prova selecionado: ${e.target.value}`);
    }}
  >
    <option value="">Selecione</option>
    <option value="basico">Basico</option>
    <option value="intermediario">Intermediario</option>
    <option value="avancado">Avancado</option>
  </select>
</div>
```

## 6.2) Template para Editar Perfil (setField)

Use quando a tela tiver helper `setField(name, value)`, como em Editar Perfil.

```jsx
<div className="field">
  <label>Campo de Prova (Editar Perfil)</label>
  <input
    type="text"
    value={formData.proof_field || ''}
    onChange={(e) => setField('proof_field', e.target.value)}
    onBlur={(e) => {
      if (!String(e.target.value || '').trim()) return;
      console.log('[Prova Autoria] Editar Perfil:', e.target.value);
      alert(`Editar Perfil - prova registrada: ${e.target.value}`);
    }}
    placeholder="Digite um valor"
  />
</div>
```

## 7) Template de Handler Reutilizavel

```jsx
const handleProofFieldBlur = (label, value) => {
  if (!String(value || '').trim()) return;
  console.log(`[Prova Autoria] ${label}:`, value);
  alert(`${label} registrado com sucesso: ${value}`);
};
```

Uso:

```jsx
onBlur={(e) => handleProofFieldBlur('Codigo de prova', e.target.value)}
```

## 8) Template de Persistencia Local (Sem Banco)

### Salvar no localStorage no blur

```jsx
const handleProofFieldBlurWithLocalSave = (key, label, value) => {
  const normalized = String(value || '').trim();
  if (!normalized) return;

  localStorage.setItem(key, normalized);
  console.log(`[Prova Autoria] ${label} salvo localmente:`, normalized);
  alert(`${label} salvo localmente com sucesso: ${normalized}`);
};
```

Uso:

```jsx
onBlur={(e) => handleProofFieldBlurWithLocalSave('proof_field', 'Campo de prova', e.target.value)}
```

### Reidratar estado ao abrir a tela

```jsx
useEffect(() => {
  const saved = localStorage.getItem('proof_field');
  if (!saved) return;

  setFormData((prev) => ({
    ...prev,
    proof_field: saved,
  }));
}, []);
```

## 9) Template de Persistencia Opcional (Somente se exigido)

### Migration

```php
Schema::table('atleta', function (Blueprint $table) {
    $table->string('proof_field')->nullable()->after('endereco');
});
```

### Model

```php
protected $fillable = [
    // campos existentes...
    'proof_field',
];
```

### Controller

```php
$request->validate([
    // validacoes existentes...
    'proof_field' => 'nullable|string|max:255',
]);

Atleta::create([
    ...$request->only([
        // campos existentes...
        'proof_field',
    ]),
    'users_id' => Auth::id(),
]);
```

## 10) Template para Campo em Search (Formulario com Submit)

### Estado

```jsx
const [searchFilters, setSearchFilters] = useState({
  proof_search_text: '',
  weight_min: '',
  weight_max: '',
});
```

### Input de busca

```jsx
<div className="search-field">
  <label className="search-label">Palavra-chave (Prova)</label>
  <input
    type="text"
    className="search-input"
    placeholder="Digite um termo"
    value={searchFilters.proof_search_text}
    onChange={(e) => setSearchFilters({ ...searchFilters, proof_search_text: e.target.value })}
    onBlur={(e) => {
      if (!String(e.target.value || '').trim()) return;
      console.log('[Prova Autoria][Search] Texto:', e.target.value);
      alert(`Filtro de busca informado: ${e.target.value}`);
    }}
  />
</div>
```

### Incluir no request da busca

```jsx
const params = new URLSearchParams();

if (searchFilters.proof_search_text) {
  params.append('proof_search_text', searchFilters.proof_search_text);
}

const response = await api.get(`/api/search/atletas?${params.toString()}`);
```

## 11) Template para Campo em Search (Busca imediata no onChange)

```jsx
<select
  className="search-select"
  value={searchFilters.proof_level}
  onChange={(e) => {
    const value = e.target.value;
    setSearchFilters({ ...searchFilters, proof_level: value });

    console.log('[Prova Autoria][Search] Nivel:', value);
    if (value) alert(`Nivel selecionado para busca: ${value}`);

    // Disparo imediato da busca
    handleSearchByLevel(value);
  }}
>
  <option value="">Selecione</option>
  <option value="basico">Basico</option>
  <option value="intermediario">Intermediario</option>
  <option value="avancado">Avancado</option>
</select>
```

## 12) Template de Persistencia Local para Search

```jsx
useEffect(() => {
  const saved = localStorage.getItem('proof_search_text');
  if (!saved) return;

  setSearchFilters((prev) => ({
    ...prev,
    proof_search_text: saved,
  }));
}, []);

const handleSearchBlurSave = (value) => {
  const normalized = String(value || '').trim();
  if (!normalized) return;

  localStorage.setItem('proof_search_text', normalized);
  console.log('[Prova Autoria][Search] Filtro salvo localmente:', normalized);
};
```
