# INFOCO Gestão Pública — Site Institucional

Site institucional/marketing da **INFOCO Gestão Pública Ltda.** — empresa de software para gestão pública (licitações, contratos, patrimônio, almoxarifado, protocolo), sediada em Itabuna-BA.

> Este repositório é **apenas o site**. A aplicação do produto é separada: `https://app2.infocolicitacoes.com.br`.

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 4** (bundler)
- **react-router-dom v6** (roteamento, URLs em pt-BR)
- **framer-motion** (animações)
- **react-icons** + SVGs inline
- Deploy na **Vercel**

## Como rodar localmente

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
```

Outros comandos:

```bash
npm run build    # build de produção (tsc + vite) → dist/
npm run preview  # servir o build de produção localmente
```

## Variáveis de ambiente

Nenhuma variável é obrigatória — o site funciona sem `.env`. Veja [`.env.example`](.env.example) para detalhes sobre a `API_KEY` (legada, opcional).

## Estrutura

```
src/
├── main.tsx          # bootstrap React
├── App.tsx           # rotas (BrowserRouter)
├── components/       # Header, Footer, Hero, Features, botões flutuantes, etc.
├── pages/            # Home, Solucoes, Institucional, Noticias, Contact, Cadastro, Fornecedor
└── hooks/
index.css             # CSS global único (design system "Modern SaaS Blue")
```

## Deploy

Deploy automático via **Vercel** (`vercel.json`): `vite build` → `dist/`. O `rewrites` garante o fallback de SPA (rotas como `/solucoes` funcionam ao recarregar).

## Documentação

Para detalhes de arquitetura, design system, convenções e histórico de manutenção, veja **[CLAUDE.md](CLAUDE.md)**.

---

© INFOCO Gestão Pública Ltda. — CNPJ 46.554.439/0001-67.
