# INFOCO Gestão Pública — Site Institucional

Site institucional da **INFOCO Gestão Pública Ltda.**, empresa de software para gestão pública sediada em Itabuna-BA.

O produto apresentado é o **SICC — Sistema Integrado de Compras e Contratações**: do Plano de Contratação Anual ao contrato assinado, sob a Lei 14.133/2021.

> Este repositório é **apenas o site**. A aplicação do produto é separada: `https://app2.infocolicitacoes.com.br`.

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 4** com code-splitting
- **react-router-dom v6** — URLs em pt-BR
- **framer-motion** — movimento dirigido por scroll
- **Playwright** — testes desktop (Chromium) e mobile (WebKit)
- Deploy na **Vercel**

## Design

O sistema visual segue o [`DESIGN-apple.md`](DESIGN-apple.md): fotografia e produto em primeiro plano, chrome quase invisível, tiles alternando claro e escuro, **um único azul de ação** (`#0066cc`), **uma única sombra** (reservada à imagem de produto) e **zero gradiente decorativo**.

As superfícies escuras são uma família **navy** (`#1e2a3b` / `#223040` / `#1a2534`) em vez do near-black neutro do spec — a mesma do FAQ em `faq.infocogestaopublica.com.br`, para os dois produtos lerem como um só.

`index.css` é a implementação — 20 seções numeradas, todas ancoradas nos tokens do spec.

## Como rodar

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
npm install
npm run dev          # http://localhost:5173
```

Outros comandos:

```bash
npm run build        # tsc strict + vite build → dist/
npm run preview      # serve o build de produção
npm test             # Playwright (faz o build e sobe o preview sozinho)
```

Antes do primeiro `npm test`:

```bash
npx playwright install chromium webkit
```

## Testes

[`tests/site.spec.ts`](tests/site.spec.ts) cobre:

- as 9 rotas + o 404, sem erro de JS
- navegação, CTA externo e âncoras
- os 3 formulários, com o POST interceptado e o payload conferido
- conformidade com o design system (paleta, 17px, pílula, zero gradiente, zero box-shadow no chrome)
- acessibilidade (um h1, alt em imagens, aria-label, sem scroll horizontal, alvo de toque ≥ 44px)
- o conteúdo do SICC (6 fases, acordeão, filtro de módulos, Lei 14.133/2021)

Há também um subagente do Claude Code em [`.claude/agents/testador-site.md`](.claude/agents/testador-site.md) que roda a suíte e interpreta as falhas.

## Variáveis de ambiente

**Nenhuma.** O site funciona sem `.env`.

## Estrutura

```
src/
├── main.tsx              # bootstrap
├── App.tsx               # rotas + scroll manager
├── data/sicc.ts          # todo o conteúdo do SICC (fonte única)
├── hooks/                # useContactForm (reCAPTCHA + envio)
├── components/
│   ├── motion/           # Reveal, Stagger, WordReveal, CountUp, parallax
│   └── ...               # Header, Footer, Hero, VideoSection, Clients
└── pages/                # Home, Sicc, Solucoes, Institucional, Fornecedor,
                          # Cadastro, Contact, Noticias, TrabalheConosco, NotFound
index.css                 # design system
DESIGN-apple.md           # o spec visual
```

## Deploy

Automático via **Vercel** ([`vercel.json`](vercel.json)): `vite build` → `dist/`. O `rewrites` garante o fallback de SPA.

## Documentação

Arquitetura, convenções e histórico: **[CLAUDE.md](CLAUDE.md)**.

---

© INFOCO Gestão Pública Ltda. — CNPJ 46.554.439/0001-67.
