# Guia de Deploy no Vercel

## Alterações Realizadas para Vercel

### 1. **Otimização do Pool de Conexão** (`lib/db.ts`)
- Implementado padrão **Singleton** para reutilizar conexões
- Limite máximo de 5 conexões simultâneas (adequado para serverless)
- Timeout de inatividade e reconexão configurados
- Error handling para reset do pool em caso de falhas

### 2. **Package.json - Remoção do Turbopack**
```json
"dev": "next dev",
"build": "next build",
```
- Removido `--turbopack` que pode causar incompatibilidades

### 3. **Novo: vercel.json**
Arquivo de configuração com:
- Versão Node.js: 20.x
- Limite de timeout para APIs: 30 segundos
- Headers de cache controle para APIs
- Configurações de build otimizadas

### 4. **next.config.ts - Otimizações de Produção**
- Desabilitados source maps em produção
- Compressão gzip ativada
- Headers de segurança adicionados
- Removed `X-Powered-By` header

### 5. **.env.example**
Template criado para documentar variáveis necessárias

---

## Passo a Passo para Deploy

### Pré-requisitos
- Conta no Vercel (https://vercel.com)
- Repositório Git (GitHub, GitLab, Bitbucket)
- Variáveis de ambiente configuradas

### 1. Prepare seu Git
```bash
git add .
git commit -m "Preparar para deploy no Vercel"
git push origin master
```

### 2. Configure Variáveis de Ambiente no Vercel

No Dashboard do Vercel, vá para **Settings > Environment Variables** e adicione:

| Variable | Value |
|----------|-------|
| `NEON_DATABASE_URL` | Sua string de conexão Neon |

### 3. Deploy no Vercel

**Opção A - Via Dashboard (Recomendado)**
1. Acesse https://vercel.com/dashboard
2. Clique em "New Project"
3. Selecione seu repositório
4. Framework: **Next.js** será detectado automaticamente
5. Configure as variáveis de ambiente
6. Clique em "Deploy"

**Opção B - Via CLI**
```bash
npm i -g vercel
vercel
```

### 4. Verificação pós-deploy

1. Teste a homepage em `https://seu-projeto.vercel.app`
2. Teste a API de contatos:
```bash
curl -X POST https://seu-projeto.vercel.app/api/contatos \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"123456789"}'
```

---

## Troubleshooting

### Erro: "Cannot find module 'pg'"
- Certifique-se que `pg` está em `dependencies` (não devDependencies)

### Erro: "NEON_DATABASE_URL not found"
- Verifique se a variável foi adicionada em Settings > Environment Variables

### Timeout na API de contatos
- Aumente o timeout em `vercel.json`: `"maxDuration": 60`
- Verifique se o banco de dados está acessível

### Pool de conexões cheio
- Verifique se há conexões presas em seu banco de dados Neon
- Acesse Neon Console > Branches > close idle connections

---

## Monitoramento

- **Logs**: Acesse Deployments > Production > Logs no Dashboard Vercel
- **Analytics**: Settings > Analytics para ver performance
- **Alerts**: Configure notificações em Settings > Alerts

---

## Dados Sensíveis

⚠️ **IMPORTANTE**: Nunca commitar arquivo `.env.local` no Git!
- `.env.local` está em `.gitignore`
- Use `.env.example` como template
- Configure variáveis apenas no Dashboard Vercel
