# CLAUDE.md

Este arquivo orienta o Claude Code ao trabalhar neste repositório.

## Visão Geral

**Site institucional/marketing da INFOCO Gestão Pública** — empresa de software para gestão pública (licitações, contratos, patrimônio, almoxarifado, protocolo). Sediada em Itabuna-BA, atende prefeituras e câmaras municipais, com foco inicial em municípios da Bahia.

- **Idioma do produto:** Português Brasileiro (pt-BR) — todo texto visível ao usuário é em português.
- **Empresa:** Infoco Gestão Pública Ltda. — CNPJ 46.554.439/0001-67.
- **Plataforma externa (CTA):** `https://app2.infocolicitacoes.com.br/cadastro/` (aplicação separada — este repo é só o site).
- **Deploy:** Vercel (`vercel.json` → `vite build` → `dist/`).

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Bundler | Vite 4 (`@vitejs/plugin-react`) |
| Roteamento | `react-router-dom` v6 (BrowserRouter) |
| Animação | `framer-motion` |
| Ícones | `react-icons` (FA + Material) |
| IA | `@google/genai` (Gemini 2.5 Flash) — usado em Notícias |
| Vídeo | `@mux/mux-player-react` |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` |
| Hospedagem | Vercel |
| Formulário | submit-form.com (endpoint `Z4G5K3MOm`) + Google reCAPTCHA v2 |

> Nota: `index.html` tem um `importmap` apontando para React 19 / framer-motion 12 do `aistudiocdn.com`. Em build/dev pelo Vite, as versões reais vêm de `node_modules` conforme `package.json`. Não confundir as duas fontes.

## Estrutura do projeto

```
.
├── index.html                # entry HTML (lang="pt-BR", fontes Poppins/Inter, reCAPTCHA)
├── index.css                 # CSS global único (~1777 linhas — todo o estilo do site mora aqui)
├── vite.config.ts            # define process.env.API_KEY a partir do .env
├── vercel.json               # buildCommand + outputDirectory
├── tsconfig.json             # strict, noUnusedLocals, noUnusedParameters
├── public/
│   ├── Logo.png, favicon.png, hero-background.png, patrao.png
│   ├── animated-banner.gif
│   └── clients/              # brasões dos municípios atendidos
└── src/
    ├── main.tsx              # bootstrap React
    ├── App.tsx               # roteamento por estado (useState<Page>), AnimatePresence
    ├── hooks/
    │   └── useIntersectionObserver.ts
    ├── components/           # Header, Footer, Hero, Features, Stats, HowItWorks,
    │                         # banners de página, botões flutuantes (WhatsApp/Insta/ScrollTop),
    │                         # AnimatedSection, AnimatedCard, AnimatedIdentityCard, etc.
    └── pages/
        ├── Home.tsx          # Hero + Video + Features + tecnologia + HowItWorks + clientes
        ├── Solucoes.tsx      # Tabs (Estratégica / Licitações / Administrativa) + modal por solução
        ├── Institucional.tsx # Quem somos, Meta, Valores
        ├── Noticias.tsx      # Gemini API → 6 notícias (e-TCM, UPB, Lei 14.133, STF)
        ├── Contact.tsx       # cards de contato + formulário com reCAPTCHA
        ├── Cadastro.tsx      # form simples (alert no submit — não envia para lugar nenhum)
        ├── Fornecedor.tsx    # landing para fornecedores
        ├── Sicc.tsx          # página de produto SICC (não está no roteamento de App.tsx)
        └── AmxDigital.tsx    # idem (não está no roteamento de App.tsx)
```

### Roteamento

Usa `react-router-dom` v6 (`BrowserRouter`). URLs em pt-BR. Rotas em [App.tsx](src/App.tsx):

| URL | Componente |
|---|---|
| `/` | `Home` |
| `/solucoes` | `Solucoes` |
| `/institucional` | `Institucional` |
| `/fornecedor` | `Fornecedor` |
| `/cadastro` | `Cadastro` |
| `/contato` | `Contact` |
| `/noticias` | `Noticias` |
| `*` | redireciona para `Home` |

Para adicionar uma rota:

1. Criar a página em `src/pages/`.
2. Adicionar `<Route path="/slug" element={<MinhaPagina />} />` em [App.tsx](src/App.tsx).
3. Adicionar item ao array `navItems` em [Header.tsx](src/components/Header.tsx) (aparece desktop + mobile).
4. (Opcional) Adicionar `<Link to="/slug">` no Footer.

**Navegação programática:** use `useNavigate()` de `react-router-dom`. Para CTAs externos use `<a target="_blank">`.

**SPA fallback Vercel:** [vercel.json](vercel.json) tem `rewrites` que mapeia `/(.*)` → `/index.html`. Sem isso, recarregar `/solucoes` no browser daria 404.

> `Sicc.tsx` e `AmxDigital.tsx` existem mas **não estão registradas em `<Routes>`**. Ainda usam o padrão antigo `setCurrentPage` (não convertidas).

## Scripts

```bash
npm run dev      # vite dev server
npm run build    # tsc && vite build  (TypeScript precisa passar)
npm run preview  # serve dist/ localmente
```

## Variáveis de ambiente

- `API_KEY` — chave do Google Gemini, lida em `Noticias.tsx:35` via `process.env.API_KEY`. Injetada pelo Vite via `define` em `vite.config.ts:11`. Sem ela, a página de Notícias mostra erro mas o resto do site funciona.

## Convenções e padrões

- **Componentes funcionais** com TypeScript estrito. Variants do framer-motion são tipadas com `Variants`/`Transition` (há comentários `// Fix:` mostrando que TS estava reclamando antes).
- **Estilo:** classes CSS globais definidas em `index.css`. **Não há CSS Modules nem styled-components.** Antes de inventar uma classe nova, procure por classes similares em `index.css`.
- **Animações de entrada:** padrão `animated-item` + `transitionDelay` inline (via IntersectionObserver) **ou** `motion.div` com `variants` + `whileInView`. Os dois padrões coexistem — siga o padrão do arquivo que você está editando.
- **Imagens:** ficam em `public/` e são referenciadas por caminho absoluto (`/Logo.png`, `/clients/itabuna.png`). Não importar imagens via JS.
- **CTAs externos:** `target="_blank" rel="noopener noreferrer"` sempre.
- **Acessibilidade:** botões de navegação são `<button>`, não `<a>`. Manter `aria-label` em controles sem texto (hamburger, fechar modal, etc.).

## Dados de contato (footer / página Contact)

- Telefone fixo: (73) 3301-2710
- Administrativo: (73) 98118-5210
- Comercial: (71) 98205-3822
- Suporte: (73) 98101-9313
- E-mail: contato@infocogestaopublica.com.br
- Endereço: Av. Princesa Isabel, 1206 – 2º andar, Salas 201/202, São Caetano, Itabuna/BA – 45607-127

## Clientes atuais (carousel da Home)

Almadina, Itamaraju, Nova Viçosa, Itororó, Anagé, Itabela, Prado (todos da Bahia). Logos em `public/clients/`.

## Soluções oferecidas (resumo de `Solucoes.tsx`)

- **Gestão Estratégica:** PCA (Plano de Contratações Anual).
- **Licitações e Compras:** Plataforma de Licitações, Gestão de Compras, Planejamento (PA → DFD/ETP/TR com IA), Banco de Preços (Lei 14.133/2021).
- **Gestão Administrativa:** Protocolo Web, Patrimônio (integra com SIGA), Almoxarifado Web.

## Pontos de atenção

- **`Cadastro.tsx` não envia formulário** — só faz `alert('Formulário enviado!')`. Provável TODO.
- **`Sicc.tsx` e `AmxDigital.tsx` órfãos** no roteamento.
- **Links placeholder do Footer** (FAQ, LGPD, Trabalhe Conosco, etc.) usam `href="#"` + `preventDefault` — não navegam para lugar nenhum. Substituir por páginas reais quando existirem.
- **`index.css` é monolítico (~1777 linhas).** Cuidado ao renomear classes — pode quebrar coisas distantes.
- **Sem testes, sem linter configurado.** A única verificação é `tsc` no build.
- **`README.md` está vazio.** Documentação real é este arquivo.

## Histórico de manutenção

- **2026-05-16:** removido componente `Stats` (banner azul "150+ / 5.000+ / 10+") da Home — usuário considerou inadequado. Componente `src/components/Contact.tsx` (órfão, e-mail desatualizado) removido. Corrigidos 15 erros de TypeScript estrito. Corrigido número do WhatsApp em `WhatsAppButton.tsx` (faltava dígito 9 do celular). Em `Noticias.tsx`, leitura do API key feita via `import.meta.env.VITE_API_KEY` com fallback para `process.env.API_KEY`; `response.text` agora tem tratamento de `undefined`. Build limpo.
- **2026-05-16:** migração para `react-router-dom` v6. SPA agora tem URLs reais (`/solucoes`, `/contato`, etc.) em vez de `useState<Page>`. `Header` usa `NavLink` com classe `.nav-link.is-active`. `Footer` usa `Link`. `Fornecedor` usa `useNavigate()`. `vercel.json` recebeu rewrite `/(.*)` → `/index.html` para SPA fallback. Tipos `Page` duplicados eliminados.

## Ao fazer alterações

- Antes de propor uma feature nova, confirmar o escopo (este é um site institucional, não a aplicação `app2.infocolicitacoes.com.br`).
- Mudanças em textos: preservar o tom institucional em pt-BR (formal, foco em "gestão pública", "transparência", "eficiência").
- Mudanças visuais: validar mobile (header tem hamburger + overlay; o site usa `mobile-nav-is-open` no `body`).
- Rodar `npm run build` antes de declarar pronto — o `tsc` strict pega muita coisa.
