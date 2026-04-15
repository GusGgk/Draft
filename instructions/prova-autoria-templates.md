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

## 8) Template de Persistencia Opcional (Somente se exigido)

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
