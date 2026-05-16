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
| Animação | `framer-motion` + CSS transitions |
| Ícones | `react-icons` (FA + Material) + SVGs inline |
| IA | `@google/genai` (Gemini 2.5 Flash) — usado em Notícias |
| Vídeo | `@mux/mux-player-react` |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` |
| Hospedagem | Vercel |
| Formulário | submit-form.com (endpoint `Z4G5K3MOm`) + Google reCAPTCHA v2 |

## Design System — "Modern SaaS Blue"

**Tipografia (Google Fonts)**
- **Body/Display:** `Plus Jakarta Sans` (300–800) — sans humanista moderna, weight 700+ para headlines.
- **Acento serif:** `Instrument Serif` italic — usado em palavras-chave dentro de headlines (`<em>` ou `.serif`), cor azul.

**Paleta (CSS vars em `:root`)**
```
--white       #FFFFFF       fundo predominante
--paper       #F6F8FE       fundo alt (azul tint sutil)
--paper-deep  #EDF2FE       fundo de seções secundárias
--blue        #2253F0       brand vivido
--blue-600    #1B43C9       hover
--blue-700    #0F2FA0       deep (gradiente)
--blue-300    #6F8DFF       light variant
--blue-100    #DDE6FF       backgrounds suaves
--blue-50     #EDF2FE       eyebrows/icons
--ink         #0E1A3D       texto/dark surfaces
--ink-soft    rgba ink/.66
--accent      #FFD338       yellow para destaques (mín. uso)
--rule        rgba ink/.08  bordas leves
```

**Radii / Sombras**
- `--radius-sm/md/lg/xl/full` — 10/16/24/32/999px.
- `--shadow-sm/md/lg`, `--shadow-blue` (sombra azul colorida para CTAs), `--shadow-card` (sombra de card SaaS).

**Padrões visuais**
- Hero "toggl-inspired": grid 2 colunas (texto esq. + visual dir.), 4 cards UI flutuantes animados (motion floating loops), mesh gradient blur de fundo (`.hero-mesh`), trustline com avatares overlapping.
- Cards arredondados com hover lift (translateY(-4px) + shadow-md).
- CTAs: pílulas azuis com `box-shadow: var(--shadow-blue)` que aumenta no hover.
- Eyebrows pílulas com fundo `--blue-50` e dot azul.
- `<em>` global mapeia para Instrument Serif italic azul (ou amarelo dentro do banner editorial gradient).
- Editorial banner com gradient azul + accent yellow glow.
- Floating buttons (`.float-stack`): círculos com hover colorido por marca (verde WhatsApp, gradient Instagram, azul scroll-top).
- Sem grids hairline — substituído por cards independentes com gap.

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
- **2026-05-16:** redesign completo "Editorial Civic". Novo design system com Fraunces (display serif variável) + Manrope (sans body) + JetBrains Mono (labels), paleta paper warm (#F4EFE4) + ink (#0A1429) + blue (#1947E5) + accent orange (#FF4A1C). `index.css` reescrito do zero (~1100 linhas). Todas as páginas e componentes refatorados para o novo layout: hero editorial com marquee, grids com bordas hairline (estilo `.features-grid`/`.solutions-grid`/`.values-grid`/etc.), eyebrows mono `01 — Seção`, headlines com `<em>` italic em accent. Botões flutuantes (WhatsApp/Instagram/ScrollTop) unificados em `.float-stack` com a classe `.float-btn`. Componentes órfãos apagados: `SolucoesBanner`, `NoticiasBanner`, `BannerGestaoPublica`, `AnimatedCard`, `Sicc.tsx`, `AmxDigital.tsx`. `AnimatedIdentityCard` substituído por flip card que usa o novo CSS. Novas fontes carregadas via Google Fonts em `index.html`.
- **2026-05-16:** pivot estético para **Modern SaaS Blue** após feedback do usuário (cream warm e laranja não funcionaram). Fontes trocadas para Plus Jakarta Sans + Instrument Serif. Paleta agora azul + branco predominantes com amarelo `#FFD338` como accent mínimo. Hero refeito toggl.com-inspired: layout responsivo com 4 cards UI flutuantes animados (Licitação aprovada, Economia anual, Contratos, Patrimônio), mesh gradient azul/amarelo blur de fundo, trustline com avatares. Cards arredondados + sombras em vez de grids hairline. Hover lift padrão em todos os cards. CTAs com sombra azul colorida. `<em>` global mapeia para Instrument Serif italic azul. Floating buttons com hover por marca (verde WhatsApp, gradient Instagram).

## Ao fazer alterações

- Antes de propor uma feature nova, confirmar o escopo (este é um site institucional, não a aplicação `app2.infocolicitacoes.com.br`).
- Mudanças em textos: preservar o tom institucional em pt-BR (formal, foco em "gestão pública", "transparência", "eficiência").
- Mudanças visuais: validar mobile (header tem hamburger + overlay; o site usa `mobile-nav-is-open` no `body`).
- Rodar `npm run build` antes de declarar pronto — o `tsc` strict pega muita coisa.
