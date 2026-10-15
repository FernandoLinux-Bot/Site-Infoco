<script setup lang="ts">
import { useRouter } from 'vue-router';
import { motion } from 'motion-v';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';
import { SISTEMA } from '../data/links';

const BENEFICIOS = [
    { t: 'Oportunidades reunidas', d: 'Acompanhe as licitações dos municípios que operam no SICC em um lugar só, sem caçar edital em diário oficial.' },
    { t: 'Cadastro único', d: 'Um cadastro de fornecedor vale para todos os órgãos atendidos — razão social, CNPJ, porte e representantes.' },
    { t: 'Disputa eletrônica', d: 'Participe das sessões pela plataforma, com o histórico de lances e a ata registrados.' },
    { t: 'Contratos e saldos', d: 'Acompanhe os contratos firmados, o valor utilizado e o saldo remanescente de cada item.' },
    { t: 'Cotações', d: 'Responda às pesquisas de preços que alimentam o planejamento dos municípios.' },
    { t: 'Publicidade oficial', d: 'O que é contratado é publicado no PNCP e enviado ao TCM-BA a partir do mesmo processo.' },
];

const router = useRouter();
const irParaCadastro = () => router.push('/cadastro');
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
                Fornecedores
            </motion.span>
            <h1 class="t-hero">
                <WordReveal text="Venda para o poder público" />{{ ' ' }}<em><WordReveal text="sem procurar edital." :delay="0.15" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                style="max-width: 42ch"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }"
            >
                Um cadastro que vale para todos os municípios atendidos pela INFOCO.
            </motion.p>
            <motion.div
                class="cta-row cta-row--center"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.52 }"
            >
                <button class="btn btn-store" @click="irParaCadastro">
                    Solicitar cadastro
                </button>
                <a class="btn btn-secondary" :href="SISTEMA" target="_blank" rel="noopener noreferrer">
                    Já tenho conta
                </a>
            </motion.div>
        </div>
    </section>

    <section class="tile tile--dark on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">O que você ganha</span>
                    <h2 class="t-display">Do edital ao saldo do contrato.</h2>
                </div>
            </Reveal>
            <Stagger class="grid grid-3" :stagger-children="0.06">
                <StaggerItem v-for="b in BENEFICIOS" :key="b.t">
                    <div class="util-card util-card--dark" style="height: 100%">
                        <h3>{{ b.t }}</h3>
                        <p>{{ b.d }}</p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <section class="tile tile--parchment">
        <div class="container container-narrow" style="text-align: center">
            <Reveal>
                <h2 class="t-display">Comece pelo cadastro.</h2>
                <p class="t-lead" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                    Envie a solicitação e a INFOCO conclui a habilitação do seu acesso.
                </p>
                <div class="cta-row cta-row--center">
                    <button class="btn btn-store" @click="irParaCadastro">
                        Solicitar cadastro
                    </button>
                </div>
            </Reveal>
        </div>
    </section>
</template>
