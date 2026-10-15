<script setup lang="ts">
import { motion, useReducedMotion } from 'motion-v';
import { EASE_EXPO, WordReveal, useParallax } from './motion';
import { CONHECER } from '../data/links';

/**
 * O painel é uma representação desenhada do kanban de Demandas do SICC
 * (colunas "Em Elaboração" e "Em Contratação", cartões com P.ADM, selos e
 * status). Nenhuma captura de tela do sistema é usada.
 */
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
    { titulo: 'Em Elaboração', cartoes: emElaboracao, atraso: 0.9 },
    { titulo: 'Em Contratação', cartoes: emContratacao, atraso: 1.05 },
];

const reduce = useReducedMotion();
useParallax('parallax', 28);
</script>

<template>
    <section class="tile tile--light hero hero--split">
        <div class="container container-mid">
            <div class="hero-split">
                <div>
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

                <motion.figure
                    class="hero-portrait"
                    style="margin: 0"
                    :initial="reduce ? { opacity: 0 } : { opacity: 0, x: 48, scale: 0.94 }"
                    :animate="{ opacity: 1, x: 0, scale: 1 }"
                    :transition="{ duration: 1.1, ease: EASE_EXPO, delay: 0.35 }"
                >
                    <motion.img
                        src="/patrao.png"
                        alt="Fundador da INFOCO Gestão Pública"
                        width="460"
                        height="460"
                        :animate="reduce ? undefined : { y: [0, -14, 0] }"
                        :transition="{ duration: 7, ease: 'easeInOut', repeat: Infinity }"
                    />
                </motion.figure>
            </div>

            <div ref="parallax" class="hero-stage">
                <motion.div
                    :initial="{ opacity: 0, y: 48, rotateX: reduce ? 0 : 7 }"
                    :animate="{ opacity: 1, y: 0, rotateX: 0 }"
                    :transition="{ duration: 1.1, ease: EASE_EXPO, delay: 0.5 }"
                >
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
                                <motion.div
                                    v-for="(d, i) in col.cartoes"
                                    :key="d.num"
                                    class="sicc-card"
                                    :initial="{ opacity: 0, y: 14 }"
                                    :animate="{ opacity: 1, y: 0 }"
                                    :transition="{ duration: 0.7, ease: EASE_EXPO, delay: col.atraso + i * 0.12 }"
                                >
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
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
</template>
