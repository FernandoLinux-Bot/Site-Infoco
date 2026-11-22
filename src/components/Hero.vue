<script setup lang="ts">
import { motion } from 'motion-v';
import SimboloInfoco from './SimboloInfoco.vue';
import { EASE_EXPO, WordReveal } from './motion';
import { ScrollTrigger } from './motion/gsap';
import { esquecer, faixa, gravar, suave, usePalco } from './motion/palco';
import { CONHECER } from '../data/links';

/**
 * A abertura é um palco de rolagem em duas colunas, sobre o azul da marca.
 *
 * À direita, o fundador fica o tempo todo, com o símbolo da INFOCO atrás dele.
 * Em volta do símbolo corre uma órbita: os documentos do processo ficam nela,
 * na ordem em que acontecem (do DFD ao contrato), e um ponto de luz dá a volta
 * conferindo um a um. É a manchete desenhada: tudo gira em torno de um
 * cadastro só. O conjunto acompanha o ponteiro, cada camada no seu ritmo.
 *
 * À esquerda a cena troca com a rolagem: a manchete cede, os documentos saem
 * da órbita e somem por baixo do painel do SICC, que sobe com a marca
 * resolvendo logo acima — nunca atrás.
 *
 *   0.00 – 0.14  a manchete cede o quadro
 *   0.05 – 0.48  os documentos deixam a órbita, um atrás do outro
 *   0.12 – 0.36  SICC resolve, letra a letra
 *   0.14 – 0.46  o painel sobe
 *   0.44 – 0.78  as demandas entram no painel, cartão a cartão
 *
 * O painel é uma representação desenhada do kanban de Demandas do SICC
 * (colunas "Em Elaboração" e "Em Contratação", cartões com P.ADM, selos e
 * status). Nenhuma captura de tela do sistema é usada.
 *
 * Com movimento reduzido o palco não liga: fica a manchete ao lado do retrato
 * e o painel logo abaixo, tudo na tela.
 */
// Na ordem do processo: é a ordem em que o ponto de luz passa por eles.
const PAPEIS = ['DFD', 'ETP', 'Cotação', 'Edital', 'Contrato'];

const emElaboracao = [
    { num: '081403/2026', obj: 'Notebooks para as secretarias escolares', selos: ['SRP', 'DFD 12'], status: 'Em Cotação de Preços', unidade: 'SECE', itens: '14 itens' },
    { num: '081418/2026', obj: 'Medicamentos da atenção básica', selos: ['PCA 2026'], status: 'Em Análise Jurídica', unidade: 'SS', itens: '86 itens' },
    { num: '081422/2026', obj: 'Manutenção predial das unidades', selos: ['DFD 31'], status: 'Em Elaboração do ETP', unidade: 'STOSP', itens: '9 itens' },
];

const emContratacao = [
    { num: '081377/2026', obj: 'Gêneros alimentícios — merenda escolar', selos: ['SRP', 'PCA 2026'], status: 'Enviado para Licitação', unidade: 'SECE', itens: '52 itens' },
    { num: '081390/2026', obj: 'Locação de veículos leves', selos: ['DFD 08'], status: 'Aguardando Autuação', unidade: 'SAP', itens: '6 itens' },
];

const colunas = [
    { titulo: 'Em Elaboração', cartoes: emElaboracao },
    { titulo: 'Em Contratação', cartoes: emContratacao },
];

type Alvo = HTMLElement | SVGElement | null;
let papeis: HTMLElement[] = [];
let cartoes: HTMLElement[] = [];
let texto: HTMLElement | null = null;
let marca: Alvo = null;
let legenda: Alvo = null;
let estagio: HTMLElement | null = null;
let astro: Alvo = null;
let retrato: Alvo = null;
let folhas: Alvo = null;

usePalco('palco', {
    montar(secao) {
        const um = <T extends Element = HTMLElement>(sel: string) => secao.querySelector<T>(sel);
        papeis = Array.from(secao.querySelectorAll<HTMLElement>('.papel'));
        cartoes = Array.from(secao.querySelectorAll<HTMLElement>('.sicc-card'));
        texto = um('.palco-texto');
        marca = um('.palco-marca');
        legenda = um('.palco-legenda');
        estagio = um('.hero-stage');
        astro = um('.palco-astro');
        retrato = um('.hero-portrait');
        folhas = um('.palco-papeis');
        const fixo = um('.palco-fixo');
        const painel = um('.sicc-panel');
        // O painel cabe no que sobra abaixo da marca: em janela baixa ele
        // encolhe, e a caixa encolhe junto para a coluna continuar centrada.
        const medir = () => {
            if (!fixo || !painel || !estagio || !marca || !legenda) return;
            const cabeca = (marca as HTMLElement).offsetHeight + (legenda as HTMLElement).offsetHeight;
            // No celular o retrato recua para 60% e fica embaixo: o painel
            // termina na altura da cabeça dele, sem cobrir o rosto.
            const movel = window.matchMedia('(max-width: 833px)').matches;
            const reserva = movel && retrato ? (retrato as HTMLElement).offsetHeight * 0.6 - 28 : 0;
            const livre = fixo.clientHeight - cabeca - (movel ? 72 : 104) - reserva;
            const escala = Math.min(1, Math.max(0.4, livre / painel.offsetHeight));
            estagio.style.setProperty('--escala', escala.toFixed(4));
            estagio.style.height = `${Math.round(painel.offsetHeight * escala)}px`;
        };
        medir();
        ScrollTrigger.addEventListener('refreshInit', medir);
        // Com mouse, o quadro responde ao ponteiro: símbolo, documentos e
        // retrato se deslocam em medidas diferentes (o CSS decide quanto).
        // No máximo uma escrita por quadro, e nenhuma leitura de leiaute.
        let quadro = 0;
        const seguir = (e: PointerEvent) => {
            if (quadro) return;
            const mx = (e.clientX / window.innerWidth) * 2 - 1;
            const my = (e.clientY / window.innerHeight) * 2 - 1;
            quadro = requestAnimationFrame(() => {
                quadro = 0;
                for (const el of [astro, folhas, retrato]) {
                    gravar(el, '--mx', mx);
                    gravar(el, '--my', my);
                }
            });
        };
        const comMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (comMouse) fixo?.addEventListener('pointermove', seguir, { passive: true });
        return () => {
            ScrollTrigger.removeEventListener('refreshInit', medir);
            fixo?.removeEventListener('pointermove', seguir);
            cancelAnimationFrame(quadro);
            const tocados = [texto, marca, legenda, estagio, astro, retrato, folhas, ...papeis, ...cartoes];
            tocados.forEach(el => el?.removeAttribute('style'));
            esquecer(...tocados);
            texto?.classList.remove('is-fora');
        };
    },
    aplicar(p) {
        const sai = faixa(p, 0.02, 0.14);
        gravar(texto, '--sai', sai);
        // Fora do quadro a manchete também sai do foco e do clique.
        texto?.classList.toggle('is-fora', sai >= 1);
        // Só o celular usa: o retrato recua para o painel caber acima dele.
        const enc = suave(faixa(p, 0.1, 0.5));
        gravar(retrato, '--enc', enc);
        gravar(astro, '--enc', enc);
        papeis.forEach((el, i) => gravar(el, '--k', suave(faixa(p, 0.05 + i * 0.02, 0.36 + i * 0.03))));
        const res = suave(faixa(p, 0.12, 0.36));
        gravar(marca, '--res', res);
        gravar(legenda, '--res', res);
        gravar(estagio, '--sobe', suave(faixa(p, 0.14, 0.46)));
        cartoes.forEach((el, i) => gravar(el, '--c', suave(faixa(p, 0.44 + i * 0.05, 0.58 + i * 0.05))));
    },
});
</script>

<template>
    <section ref="palco" class="tile tile--marca on-dark hero hero--split palco">
        <div class="palco-fixo">
            <!-- O símbolo e o que vive em volta dele: anéis, a onda que parte
                 da borda e o ponto de luz que percorre a órbita. -->
            <div class="palco-astro" aria-hidden="true">
                <span class="palco-anel palco-anel--3" />
                <span class="palco-anel palco-anel--2" />
                <span class="palco-anel palco-anel--1" />
                <span class="palco-onda" />
                <span class="palco-satelite"><i /></span>
                <SimboloInfoco class="palco-disco" />
            </div>

            <div class="palco-papeis" aria-hidden="true">
                <div v-for="(rotulo, i) in PAPEIS" :key="rotulo" class="papel" :class="`papel--${i + 1}`">
                    <div class="papel-folha">
                        <span class="chip chip--action">{{ rotulo }}</span>
                        <i v-for="linha in 6" :key="linha" />
                        <b class="papel-visto">
                            <svg viewBox="0 0 12 12"><path d="M2.6 6.3l2.3 2.4 4.5-5.2" /></svg>
                        </b>
                    </div>
                </div>
            </div>

            <div class="container container-mid">
                <div class="hero-split">
                    <div class="palco-texto">
                        <motion.span
                            class="eyebrow"
                            :initial="{ opacity: 0, y: 10 }"
                            :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.6, ease: EASE_EXPO }"
                        >
                            SICC · Sistema Integrado de Compras e Contratações
                        </motion.span>

                        <h1 class="t-hero">
                            <WordReveal text="Do plano anual ao contrato assinado." />{{ ' ' }}<em><WordReveal text="Em um cadastro só." :delay="0.18" /><svg class="palco-risco" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"><path d="M3 8.5C52 3.5 118 2.5 168 4.5c46 1.8 92 1.2 129-1.5" pathLength="1" /></svg></em>
                        </h1>

                        <motion.p
                            class="t-lead hero-sub"
                            :initial="{ opacity: 0, y: 16 }"
                            :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.45 }"
                        >
                            PCA, ETP, mapa de riscos, cotação, licitação, contrato e prestação de contas.
                            O ciclo inteiro da Lei 14.133/2021 sem redigitar nada.
                        </motion.p>

                        <motion.div
                            class="cta-row"
                            :initial="{ opacity: 0, y: 16 }"
                            :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.58 }"
                        >
                            <RouterLink to="/sicc" class="btn btn-primary">Conhecer o SICC</RouterLink>
                            <a class="btn btn-secondary" :href="CONHECER" target="_blank" rel="noopener noreferrer">
                                Ver o sistema por dentro
                            </a>
                        </motion.div>

                        <p class="palco-dica" aria-hidden="true">Role para organizar a papelada <span>↓</span></p>
                    </div>

                    <figure class="hero-portrait" style="margin: 0">
                        <img src="/patrao.webp" alt="Fundador da INFOCO Gestão Pública" width="640" height="640" fetchpriority="high" />
                    </figure>
                </div>

                <!-- A marca fica acima do painel, na mesma coluna: nada passa
                     por cima dela, em nenhum tamanho de tela. -->
                <div class="palco-cena">
                <div class="palco-marca" aria-hidden="true"><span v-for="(letra, i) in 'SICC'" :key="i">{{ letra }}</span></div>
                <p class="palco-legenda" aria-hidden="true">Sistema Integrado de Compras e Contratações</p>
                <div class="hero-stage">
                    <div class="sicc-panel">
                        <div class="sicc-panel-bar">
                            <span class="dot" /><span class="dot" /><span class="dot" />
                            <span class="label">SICC · Planejamento → Demandas</span>
                        </div>
                        <div class="sicc-panel-body">
                            <div v-for="col in colunas" :key="col.titulo" class="sicc-col">
                                <div class="sicc-col-head">
                                    <span>{{ col.titulo }}</span>
                                    <span>{{ col.cartoes.length }}</span>
                                </div>
                                <div v-for="d in col.cartoes" :key="d.num" class="sicc-card">
                                    <div class="sicc-card-top">
                                        <span class="sicc-num">P.ADM {{ d.num }}</span>
                                        <span style="display: flex; gap: 4px">
                                            <span v-for="s in d.selos" :key="s" class="chip chip--muted">{{ s }}</span>
                                        </span>
                                    </div>
                                    <p class="sicc-obj">{{ d.obj }}</p>
                                    <div class="sicc-meta">
                                        <span>{{ d.unidade }}</span>
                                        <span>{{ d.itens }}</span>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <span class="chip chip--action">{{ d.status }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    </section>
</template>
