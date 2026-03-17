# Guia de Contribuição — Draft

Bem-vindo(a) ao repositório da Draft! Leia este guia antes de começar a trabalhar.
Seguir essas convenções garante que o histórico do projeto fique limpo e fácil de entender para todo o time.

---

## 1. Fluxo de trabalho

```
develop  ──→  feat/sua-branch  ──→  Pull Request  ──→  develop  ──→  main
```

**Regras inegociáveis:**
- Nunca faça push direto em `main` ou `develop`
- Todo trabalho começa em uma branch criada a partir de `develop`
- Todo trabalho termina em um Pull Request revisado e aprovado

---

## 2. Criando sua branch

Sempre crie sua branch a partir de `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feat/nome-da-sua-feature
```

### Convenção de nomes

| Prefixo | Quando usar | Exemplo |
|---------|-------------|---------|
| `feat/` | Nova funcionalidade | `feat/tela-perfil-atleta` |
| `fix/` | Correção de bug | `fix/erro-login-mobile` |
| `docs/` | Documentação | `docs/atualiza-readme` |
| `refactor/` | Melhoria sem nova feature | `refactor/componente-header` |

> Use nomes em português, com hífen e sem espaços. Seja descritivo — `feat/feed` é ruim, `feat/listagem-oportunidades` é bom.

---

## 3. Fazendo commits

### Padrão de mensagem

```
tipo: descrição curta no imperativo
```

### Tipos aceitos

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Mudança em documentação |
| `style` | Formatação, sem mudança de lógica |
| `refactor` | Refatoração de código |
| `chore` | Tarefas de configuração |

### Exemplos

```bash
# ✅ Bons commits
git commit -m "feat: adiciona tela de perfil do atleta"
git commit -m "fix: corrige validação do formulário de cadastro"
git commit -m "docs: atualiza instruções de instalação no README"

# ❌ Commits ruins — evite
git commit -m "ajustes"
git commit -m "wip"
git commit -m "teste"
git commit -m "atualizando coisas"
```

---

## 4. Abrindo um Pull Request

Quando sua feature estiver pronta:

1. Suba sua branch para o GitHub:
```bash
git push origin feat/nome-da-sua-feature
```

2. Vá até o repositório no GitHub e clique em **"Compare & pull request"**

3. Preencha o template de PR que aparecerá automaticamente

4. Marque o **tech lead** como revisor

5. Aguarde a revisão — não faça merge você mesmo

### Checklist antes de abrir o PR

- [ ] Minha branch está atualizada com `develop`
- [ ] O código roda localmente sem erros
- [ ] O título do PR descreve claramente o que foi feito
- [ ] Preenchi todos os campos do template

---

## 5. Resolvendo conflitos

Se sua branch estiver desatualizada em relação ao `develop`:

```bash
git checkout develop
git pull origin develop
git checkout feat/sua-branch
git merge develop
# Resolva os conflitos, depois:
git add .
git commit -m "chore: resolve conflitos com develop"
git push origin feat/sua-branch
```

---

## 6. Dúvidas?

Fale com o tech lead antes de fazer qualquer coisa que não está descrita aqui. É melhor perguntar do que quebrar o repositório. 😅