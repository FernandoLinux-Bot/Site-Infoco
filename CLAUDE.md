# CLAUDE.md

Este arquivo orienta o Claude Code ao trabalhar neste repositório.

## Visão Geral

**Site institucional da INFOCO Gestão Pública** — empresa de software para gestão pública sediada em Itabuna-BA, que atende prefeituras, câmaras municipais e consórcios.

O produto que o site apresenta é o **SICC — Sistema Integrado de Compras e Contratações**: PCA, ETP, mapa de riscos, cotação, demandas, processo eletrônico, solicitações, contratos, assinaturas, relatórios e integrações (PNCP, SIGA/TCM-BA), sob a **Lei 14.133/2021**.

- **Idioma:** Português Brasileiro (pt-BR). Todo texto visível e toda URL de rota em português.
- **Empresa:** Infoco Gestão Pública Ltda. — CNPJ 46.554.439/0001-67.
- **Porta de entrada do sistema (CTA):** `https://faq.infocogestaopublica.com.br` — o FAQ autentica contra o SICC do município e leva ao sistema. Todo link externo vive em [src/data/links.ts](src/data/links.ts); não repita URL em página.
- **Deploy:** Vercel (`vercel.json` → `vite build` → `dist/`).

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Bundler | Vite 4 (`@vitejs/plugin-react`), com `manualChunks` |
| Roteamento | `react-router-dom` v6 (BrowserRouter) |
| Animação | `framer-motion` 11 |
| Ícones | `react-icons` (FA) |
| Vídeo | `@mux/mux-player-react` (carregado por `lazy` + IntersectionObserver) |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` |
| Formulários | submit-form.com (endpoint `Z4G5K3MOm`) + Google reCAPTCHA v2 |
| Testes | Playwright (Chromium desktop + WebKit/iPhone 13) |

## Design System — Apple (`DESIGN-apple.md`)

O sistema visual segue o `DESIGN-apple.md` na raiz. **Ele é a fonte da verdade**; `index.css` é a implementação. As invariantes que não podem ser quebradas:

1. **Um único acento interativo:** `--primary: #0066cc` (Action Blue). `--primary-focus: #0071e3` só para o anel de foco; `--primary-on-dark: #2997ff` só sobre tile escuro. Não existe segunda cor de marca.
2. **Uma única sombra:** `drop-shadow(rgba(0,0,0,.22) 3px 5px 30px)`, aplicada só a imagem de produto (`.product-shadow`, `.sicc-panel`, `.media-frame`). **Nunca** `box-shadow` em card, botão ou nav — a elevação vem da troca de superfície.
3. **Zero gradiente decorativo.** Profundidade vem da alternância de tiles e do `backdrop-filter` das barras fixas.
4. **Corpo em 17px / peso 400 / line-height 1.47 / tracking −0.374px.** Não 16px.
5. **Escada de pesos 300 / 400 / 600 / 700.** Peso 500 não existe no sistema.
6. **Tiles full-bleed sem raio.** A troca de cor é o divisor. Raio só em card (`--r-lg` 18px), utilitário (`--r-sm` 8px), pearl (`--r-md` 11px) e pílula (`--r-pill`).
7. **`transform: scale(0.95)` no estado ativo** de todo botão — é a micro-interação do sistema.

**Tipografia:** SF Pro Display / SF Pro Text via `system-ui, -apple-system, BlinkMacSystemFont`. Em plataformas não-Apple cai para **Inter** (Google Fonts), a substituta recomendada pelo próprio spec.

**Superfícies:** `--canvas` #ffffff · `--canvas-parchment` #f4f6f9 · `--surface-tile-1/2/3` #1e2a3b/#223040/#1a2534 · `--surface-black` #0d141d.

> **Desvio deliberado do spec.** O `DESIGN-apple.md` define as superfícies escuras como near-black neutro (#272729/#2a2a2c/#252527) e a nav como preto puro. Aqui elas são uma família **navy**, por decisão do cliente, para o site e o FAQ (`faq.infocogestaopublica.com.br`) lerem como um produto só. Tudo o mais do spec continua valendo — inclusive o micro-degrau entre tiles vizinhos, que é o que substitui borda e sombra. Um teste trava os quatro valores e exige que o canal azul supere o vermelho em cada um.

**Ecossistema:** o FAQ usa a mesma paleta (`_deploy/site/{index,login,comunidade}.html`, cada um com seu `:root` — ao mexer numa cor, mexa nos três). A logo é a mesma arte (`public/logo-infoco.png`, vinda de `_deploy/site/assets/logo.png` do FAQ).

**Chrome de navegação:** duas barras fixas — `.global-nav` escura de 44px (só links, incluindo Contato) e `.sub-nav` vitrificada de 52px com a logo estruturada, os links do produto e o CTA persistente. As duas usam a mesma grade `1fr auto 1fr`, e é isso que faz a fileira de cima cair exatamente sobre a de baixo. **Abaixo de 833px a barra escura some** e `--nav-h` vira `0px`: os links passam para a gaveta e a sub-nav vira o header inteiro.

## Estrutura do projeto

```
.
├── index.html                # entry (lang=pt-BR, Inter, reCAPTCHA, OG tags)
├── index.css                 # design system completo (~1064 linhas, 20 seções numeradas)
├── DESIGN-apple.md           # o spec visual — fonte da verdade
├── vite.config.ts            # manualChunks (react, motion)
├── vercel.json               # build + SPA fallback
├── playwright.config.ts      # desktop (Chromium 1440) + mobile (WebKit/iPhone 13)
├── tests/site.spec.ts        # 37 testes × 2 projetos
├── .claude/agents/
│   └── testador-site.md      # subagente que roda e interpreta a suíte
├── public/                   # Logo.png, favicon.png, patrao.png, clients/*.png
└── src/
    ├── main.tsx              # bootstrap (importa ../index.css)
    ├── App.tsx               # rotas + ScrollManager + AnimatePresence
    ├── data/sicc.ts          # TODO o conteúdo do SICC (fonte única)
    ├── hooks/useContactForm.ts  # useRecaptcha + useFormSubmit
    ├── components/
    │   ├── motion/index.tsx  # primitivas: Reveal, Stagger, WordReveal, CountUp,
    │   │                     # useParallax, ScrollProgress, EASE_EXPO
    │   ├── Header.tsx        # global-nav + sub-nav + sheet mobile
    │   ├── Footer.tsx        # rodapé parchment com colunas densas
    │   ├── Hero.tsx          # painel do SICC desenhado em CSS
    │   ├── VideoSection.tsx  # Mux com lazy + IntersectionObserver
    │   ├── Clients.tsx       # brasões dos municípios
    │   └── FloatingActions.tsx
    └── pages/                # Home · Sicc · Solucoes · Institucional · Fornecedor
                              # Cadastro · Contact · Noticias · TrabalheConosco · NotFound
```

### `src/data/sicc.ts` — a fonte única de conteúdo

Todo o conteúdo funcional do SICC vem daqui: `MODULOS` (14), `CICLO_DEMANDA` (6 fases), `NUMEROS`, `PERGUNTAS` (8 Q&A), `PERFIS` (4).

**Números na copy são derivados, nunca digitados.** `MODULOS.length` alimenta a manchete de `/solucoes`, o texto da Home e o card de `NUMEROS`. Um teste garante que a manchete e a contagem de cartões não divergem. Se adicionar um módulo, a copy se ajusta sozinha.

Origem do conteúdo: repositório **`nandovitor/faq-sicc`** (`sintese/*.md` e `_deploy/ia/kb.md`) — o mapeamento real das telas do sistema. **Nenhuma captura de tela do FAQ é usada**: as telas mostradas no site são representações desenhadas em CSS (`.sicc-panel` no Hero).

**Restrição herdada do FAQ:** a carteira completa de clientes (44 organizações em `organizacoes.json`) é informação comercial restrita e **não deve ser publicada**. O site exibe apenas os 7 brasões já públicos.

### Roteamento

| URL | Componente |
|---|---|
| `/` | `Home` |
| `/sicc` | `Sicc` — a página de produto (fluxo, tramitação, SICC iA, documentos, FAQ, glossário) |
| `/solucoes` | `Solucoes` — catálogo dos 14 módulos com filtro por grupo |
| `/institucional` | `Institucional` |
| `/fornecedor` | `Fornecedor` |
| `/cadastro` | `Cadastro` |
| `/contato` | `Contact` |
| `/noticias` | `Noticias` |
| `/trabalhe-conosco` | `TrabalheConosco` |
| `*` | `NotFound` — **404 de verdade**, não mais a Home |

Para adicionar rota: criar a página, adicionar `<Route>` em [App.tsx](src/App.tsx), incluir em `globalNav` de [Header.tsx](src/components/Header.tsx) **e** adicionar ao array `ROTAS` de [tests/site.spec.ts](tests/site.spec.ts) — a suíte falha se a rota não for alcançável por link visível.

**Âncoras:** o `ScrollManager` do App trata `/sicc#fluxo` e `/sicc#perguntas`.

## Movimento

Todas as animações passam pelas primitivas de [src/components/motion/index.tsx](src/components/motion/index.tsx):

- `EASE_EXPO` = `[0.16, 1, 0.3, 1]` — a curva única do site.
- `<Reveal>` sobe e revela ao entrar na viewport; `<Stagger>` + `<StaggerItem>` escalonam filhos.
- `<WordReveal>` revela palavra a palavra com máscara `overflow: hidden`. **O espaço entre as máscaras é um nó de texto real** — se ele virar nbsp ou for para dentro da máscara, a manchete deixa de quebrar linha.
- `useParallax(distance)` devolve `{ref, y}` com mola; `<CountUp>` anima números; `<ScrollProgress>` é a barra do topo.
- Tudo respeita `prefers-reduced-motion` (as primitivas via `useReducedMotion`, o resto pelo bloco de mídia no CSS).

**Não chame hooks dentro de `.map()`.** O `Fluxo` de `Sicc.tsx` extrai `<FlowStep>` exatamente por isso.

## Scripts

```bash
npm install          # dependências
npm run dev          # vite dev server
npm run build        # tsc strict && vite build
npm run preview      # serve dist/
npm test             # Playwright: desktop + mobile (faz o build sozinho)
npm run test:desktop # só Chromium
npm run test:mobile  # só WebKit/iPhone 13
```

Primeira execução dos testes precisa dos navegadores: `npx playwright install chromium webkit`.

## Testes

[tests/site.spec.ts](tests/site.spec.ts) cobre rotas, navegação, formulários (com POST interceptado e reCAPTCHA simulado), conformidade com o design system, acessibilidade, responsivo e o conteúdo do SICC.

O subagente [`.claude/agents/testador-site.md`](.claude/agents/testador-site.md) roda a suíte e interpreta as falhas. Invoque-o depois de mexer em `src/`, `index.css` ou `index.html`.

**Regra:** nunca afrouxe uma asserção para o teste passar. Se a asserção estiver errada, corrija a asserção explicando por quê.

## Variáveis de ambiente

**Nenhuma.** O site funciona sem `.env`. O `define` de `process.env.API_KEY` e a dependência `@google/genai` foram removidos.

## Dados de contato

- Fixo (73) 3301-2710 · Administrativo (73) 98118-5210 · Comercial (71) 98205-3822 · Suporte (73) 98101-9313
- contato@infocogestaopublica.com.br
- Av. Princesa Isabel, 1206 — 2º andar, salas 201/202, São Caetano, Itabuna/BA — 45607-127

## Clientes exibidos

Almadina, Itamaraju, Nova Viçosa, Itororó, Anagé, Itabela e Prado (Bahia). Brasões em `public/clients/`. **Não ampliar essa lista sem autorização comercial** — ver a restrição acima.

## Pontos de atenção

- **Os vídeos são verticais (9:16) e têm legendas queimadas.** O carrossel respeita a proporção nativa (`.video-frame` em 9/16, `object-fit: contain`): forçar 16:9 obrigava a recortar, e o recorte distorcia o rosto e comia as legendas. Os vídeos vivem em [src/data/videos.ts](src/data/videos.ts) e o campo `id` é o **Playback ID**, não o Asset ID — o Asset ID responde HTTP 400 em `image.mux.com` e `stream.mux.com`. O Playback ID fica na aba "Playback and Thumbnails" do painel do asset. Vídeo com `id` vazio simplesmente não entra no carrossel.
- **`patrao.png` tem 640×640 e o assunto encosta na borda inferior.** Por isso o retrato do hero usa máscara em vez de sombra: a sombra desenharia o corte reto.
- **CSS não entra no grafo do graphify** (`index.css` não é tipo detectado). Ao rodar `/graphify --update`, lembre que o design system fica de fora.
- **O chunk do Mux tem ~887 KB**, mas é assíncrono: só baixa quando a seção de vídeo entra na viewport. O bundle inicial é ~373 KB (117 KB gzip).
- **Links placeholder do Footer foram removidos.** Não reintroduzir `href="#"` — se a página não existe, o link não deve existir.
- **reCAPTCHA não funciona em localhost** (o site key só aceita o domínio de produção). Os testes contornam simulando `window.grecaptcha`.

## Histórico de manutenção

- **2026-09-01:** **Remodelagem completa segundo o `DESIGN-apple.md`.** `index.css` reescrito do zero (1550 → 1064 linhas, 58 KB → 24 KB) com os tokens do spec: Action Blue único, uma sombra só, zero gradiente, tiles alternando claro/escuro, tipografia SF Pro/Inter em 17px. Chrome refeito em duas barras (nav preta 44px + sub-nav vitrificada 52px). Conteúdo reescrito a partir do FAQ oficial do SICC (`nandovitor/faq-sicc`), sem usar as capturas de tela: novo `src/data/sicc.ts` com 14 módulos, o ciclo de vida da demanda em 6 fases, 8 perguntas frequentes e os perfis de usuário. **Nova página `/sicc`** (fluxo com barras dirigidas por scroll, tramitação, SICC iA, documentos, FAQ em acordeão, glossário). Todas as 9 telas remodeladas. **404 real** substituindo o catch-all que renderizava a Home. Novas primitivas de movimento em `src/components/motion/`. Formulários unificados em `useContactForm` com timeout no reCAPTCHA. Code-splitting (`manualChunks` + Mux por `lazy`): bundle inicial de 1,26 MB → 373 KB. **Suíte Playwright** (37 testes × desktop/mobile) e o subagente `testador-site`. Removidos: 11 componentes órfãos, `index.tsx` e `metadata.json` da raiz, a dependência morta `@google/genai`, o `define` de `API_KEY` e o importmap órfão do AI Studio.
- **2026-08-31:** grafo de conhecimento gerado com `/graphify` (275 nós, 416 arestas, 15 comunidades) em `graphify-out/`.
- **2026-07-19:** redesign "Aurora Blue"; página Trabalhe Conosco; correção do vídeo Mux. *(Substituído pelo redesign Apple.)*
- **2026-05-16:** migração para `react-router-dom` v6 com URLs reais e SPA fallback na Vercel.

## Ao fazer alterações

1. **Leia o `DESIGN-apple.md` antes de mexer em `index.css`.** As sete invariantes acima têm teste.
2. Conteúdo do SICC entra em `src/data/sicc.ts`, não espalhado nas páginas.
3. Números na copy: derive dos dados. Não digite.
4. Rode `npm run build` (tsc strict) **e** `npm test` antes de declarar pronto.
5. Mudanças visuais: valide mobile — o menu vira sheet abaixo de 833px.
