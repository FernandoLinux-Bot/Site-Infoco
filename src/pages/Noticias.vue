<script setup lang="ts">
import { motion } from 'motion-v';
import { FaInstagram } from '../components/icones';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';

const PROFILE_URL = 'https://www.instagram.com/infocogestaopublica/';
const HANDLE = '@infocogestaopublica';

/**
 * Índice editorial dos temas publicados no Instagram da INFOCO.
 * Cada cartão leva ao perfil — o conteúdo vive lá, não aqui.
 */
const TEMAS = [
    { tema: 'Lei 14.133/2021', titulo: 'O que muda na contratação pública e como o SICC acompanha a mudança.' },
    { tema: 'Planejamento', titulo: 'PCA e DFD: como planejar o exercício sem travar a execução.' },
    { tema: 'Pesquisa de preços', titulo: 'Cotação, média e a trilha que sustenta o valor estimado.' },
    { tema: 'Estudo técnico', titulo: 'ETP na prática: do problema identificado à declaração de viabilidade.' },
    { tema: 'Riscos', titulo: 'Mapa de riscos e a matriz de impacto e probabilidade.' },
    { tema: 'Execução', titulo: 'Saldo, aditivo e apostilamento: o que cada um resolve.' },
    { tema: 'Integrações', titulo: 'PNCP e SIGA/TCM-BA a partir do mesmo cadastro.' },
    { tema: 'Treinamentos', titulo: 'A equipe INFOCO nas unidades, formando quem opera o sistema.' },
    { tema: 'Municípios', titulo: 'Como as prefeituras atendidas conduzem suas contratações.' },
];
</script>

<template>
    <section class="tile tile--light hero">
        <div class="container container-narrow">
            <motion.span
                class="eyebrow"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: EASE_EXPO }"
            >
                Notícias
            </motion.span>
            <h1 class="t-hero">
                <WordReveal text="O que a INFOCO" />{{ ' ' }}<em><WordReveal text="publica." :delay="0.15" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                style="max-width: 40ch"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }"
            >
                Conteúdo sobre gestão pública, legislação e o dia a dia do SICC — publicado
                no Instagram {{ HANDLE }}.
            </motion.p>
            <motion.div
                class="cta-row cta-row--center"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.52 }"
            >
                <a class="btn btn-store" :href="PROFILE_URL" target="_blank" rel="noopener noreferrer"><FaInstagram aria-hidden="true" /> Seguir no Instagram</a>
            </motion.div>
        </div>
    </section>

    <section class="tile tile--parchment">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Temas</span>
                    <h2 class="t-display">O que costuma aparecer por lá.</h2>
                </div>
            </Reveal>

            <Stagger class="grid grid-3" :stagger-children="0.05">
                <StaggerItem v-for="t in TEMAS" :key="t.titulo">
                    <a
                        class="util-card"
                        :href="PROFILE_URL"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="height: 100%; text-decoration: none; color: inherit"
                    >
                        <span class="card-index">{{ t.tema }}</span>
                        <h3>{{ t.titulo }}</h3>
                        <div class="util-card-foot">
                            <span class="link-action" style="font-size: 14px">
                                Ver no Instagram <span class="chev">›</span>
                            </span>
                        </div>
                    </a>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <section class="tile tile--dark on-dark">
        <div class="container container-narrow" style="text-align: center">
            <Reveal>
                <h2 class="t-display">Acompanhe {{ HANDLE }}.</h2>
                <p class="t-lead-airy" style="margin-top: var(--s-md); color: var(--body-muted)">
                    Avisos de atualização do sistema, mudanças na legislação e os treinamentos
                    que a equipe conduz nas unidades.
                </p>
                <div class="cta-row cta-row--center">
                    <a class="btn btn-primary" :href="PROFILE_URL" target="_blank" rel="noopener noreferrer">
                        Abrir o perfil
                    </a>
                </div>
            </Reveal>
        </div>
    </section>
</template>
