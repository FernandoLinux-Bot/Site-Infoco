<script setup lang="ts">
import { motion } from 'motion-v';
import { EASE_EXPO, WordReveal } from './motion';
import { ScrollTrigger } from './motion/gsap';
import { faixa, suave, usePalco } from './motion/palco';
import { CONHECER } from '../data/links';

/**
 * A abertura é um palco de rolagem: a papelada solta converge e some atrás do
 * painel do SICC, que sobe com a marca resolvendo ao fundo.
 *
 *   0.00 – 0.14  a manchete cede o quadro
 *   0.05 – 0.57  as folhas convergem, uma atrás da outra, e passam por
 *                baixo do painel
 *   0.10 – 0.34  SICC resolve (o espaçamento fecha, o desfoque some)
 *   0.12 – 0.46  o painel sobe de trás do horizonte
 *   0.44 – 0.78  as demandas entram no painel, cartão a cartão
 *   0.66 – 0.86  o fundador sobe no primeiro plano
 *
 * O painel é uma representação desenhada do kanban de Demandas do SICC
 * (colunas "Em Elaboração" e "Em Contratação", cartões com P.ADM, selos e
 * status). Nenhuma captura de tela do sistema é usada.
 *
 * Com movimento reduzido o palco não liga: fica a manchete ao lado do retrato
 * e o painel logo abaixo, tudo na tela.
 */
const PAPEIS = ['DFD', 'ETP', 'Cotação', 'Edital', 'Mapa de Riscos', 'Contrato', 'Termo de Referência', 'Planilha'];

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

const n = (v: number) => v.toFixed(4);
let papeis: HTMLElement[] = [];
let cartoes: HTMLElement[] = [];
let texto: HTMLElement | null = null;

usePalco('palco', {
    montar(secao) {
        papeis = Array.from(secao.querySelectorAll<HTMLElement>('.papel'));
        cartoes = Array.from(secao.querySelectorAll<HTMLElement>('.sicc-card'));
        texto = secao.querySelector<HTMLElement>('.palco-texto');
        const fixo = secao.querySelector<HTMLElement>('.palco-fixo');
        const painel = secao.querySelector<HTMLElement>('.sicc-panel');
        // O painel tem altura própria; em janela baixa ele encolhe para caber
        // no quadro em vez de sair cortado por baixo.
        const medir = () => {
            if (!fixo || !painel) return;
            secao.style.setProperty('--escala', n(Math.min(1, (fixo.clientHeight * 0.64) / painel.offsetHeight)));
        };
        medir();
        ScrollTrigger.addEventListener('refreshInit', medir);
        return () => {
            ScrollTrigger.removeEventListener('refreshInit', medir);
            [secao, ...papeis, ...cartoes].forEach(e => e.removeAttribute('style'));
            texto?.classList.remove('is-fora');
        };
    },
    aplicar(p, secao) {
        const s = secao.style;
        const sai = faixa(p, 0.02, 0.14);
        s.setProperty('--dica', n(faixa(p, 0, 0.05)));
        s.setProperty('--sai', n(sai));
        // Fora do quadro a manchete também sai do foco e do clique.
        texto?.classList.toggle('is-fora', sai >= 1);
        papeis.forEach((el, i) => el.style.setProperty('--k', n(suave(faixa(p, 0.05 + i * 0.02, 0.36 + i * 0.03)))));
        s.setProperty('--marca', n(suave(faixa(p, 0.1, 0.34))));
        s.setProperty('--sobe', n(suave(faixa(p, 0.12, 0.46))));
        cartoes.forEach((el, i) => el.style.setProperty('--c', n(suave(faixa(p, 0.44 + i * 0.05, 0.58 + i * 0.05)))));
        s.setProperty('--patrao', n(suave(faixa(p, 0.66, 0.86))));
    },
});
</script>

<template>
    <section ref="palco" class="tile tile--parchment hero hero--split palco">
        <div class="palco-fixo">
            <div class="palco-papeis" aria-hidden="true">
                <div v-for="(rotulo, i) in PAPEIS" :key="rotulo" class="papel" :class="`papel--${i + 1}`">
                    <div class="papel-folha">
                        <span class="chip chip--action">{{ rotulo }}</span>
                        <i v-for="linha in 6" :key="linha" />
                    </div>
                </div>
            </div>

            <div class="palco-marca" aria-hidden="true">SICC</div>

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
                            <WordReveal text="Do plano anual ao contrato assinado." />{{ ' ' }}<em><WordReveal text="Em um cadastro só." :delay="0.18" /></em>
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
                    </div>

                    <figure class="hero-portrait" style="margin: 0">
                        <img src="/patrao.png" alt="Fundador da INFOCO Gestão Pública" width="460" height="460" />
                    </figure>
                </div>

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

            <!-- O mesmo retrato, na posição do palco: ele sobe da borda de baixo,
                 que é onde o recorte da foto termina. -->
            <img class="palco-patrao" src="/patrao.png" alt="Fundador da INFOCO Gestão Pública" width="640" height="640" />

            <p class="palco-dica" aria-hidden="true">Role para organizar a papelada <span>↓</span></p>
        </div>
    </section>
</template>
