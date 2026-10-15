<script setup lang="ts">
import { computed, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { MODULOS } from '../data/sicc';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';

const GRUPOS = [
    { id: 'todos', label: 'Todos' },
    { id: 'planejamento', label: 'Planejamento' },
    { id: 'solicitacoes', label: 'Solicitações' },
    { id: 'execucao', label: 'Execução' },
    { id: 'transparencia', label: 'Transparência' },
] as const;

type GrupoId = (typeof GRUPOS)[number]['id'];

const grupo = ref<GrupoId>('todos');
const lista = computed(() => (grupo.value === 'todos' ? MODULOS : MODULOS.filter(m => m.grupo === grupo.value)));
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
                Módulos do SICC
            </motion.span>
            <h1 class="t-hero">
                <WordReveal :text="`${MODULOS.length} módulos.`" />{{ ' ' }}<em><WordReveal text="Um cadastro." :delay="0.15" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                style="max-width: 44ch"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }"
            >
                O objeto cadastrado no plano anual é o mesmo do estudo, da cotação,
                do edital e do contrato. Nada é redigitado no caminho.
            </motion.p>
        </div>
    </section>

    <section class="tile tile--parchment" style="padding-block: var(--s-xl)">
        <div class="container container-mid tabs-wrap">
            <div class="tabs" role="tablist" aria-label="Filtrar módulos por grupo">
                <button
                    v-for="g in GRUPOS"
                    :key="g.id"
                    role="tab"
                    :aria-selected="grupo === g.id"
                    :class="['tab', { 'is-active': grupo === g.id }]"
                    @click="grupo = g.id"
                >
                    <motion.span
                        v-if="grupo === g.id"
                        layout-id="tab-pill"
                        class="tab-pill"
                        :transition="{ type: 'spring', stiffness: 380, damping: 32 }"
                    />
                    {{ g.label }}
                </button>
            </div>
        </div>
    </section>

    <section class="tile tile--light" style="padding-top: var(--s-xl)">
        <div class="container container-mid">
            <motion.div layout class="grid grid-3">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        v-for="m in lista"
                        :key="m.id"
                        layout
                        :initial="{ opacity: 0, y: 18, scale: 0.98 }"
                        :animate="{ opacity: 1, y: 0, scale: 1 }"
                        :exit="{ opacity: 0, y: -10, scale: 0.98 }"
                        :transition="{ duration: 0.45, ease: EASE_EXPO }"
                    >
                        <article :id="m.id" class="util-card" style="height: 100%; scroll-margin-top: 140px">
                            <span class="card-index">{{ m.resumo }}</span>
                            <h3 class="t-tagline" style="font-family: var(--font-display)">{{ m.nome }}</h3>
                            <p>{{ m.descricao }}</p>
                            <ul class="feature-list">
                                <li v-for="d in m.destaques" :key="d">{{ d }}</li>
                            </ul>
                            <div v-if="m.fundamento" class="util-card-foot">
                                <span class="chip chip--action">{{ m.fundamento }}</span>
                            </div>
                        </article>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    </section>

    <section class="tile tile--dark on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Integração</span>
                    <h2 class="t-display">O que sai do SICC já sai publicado.</h2>
                    <p class="t-body">
                        Publicação no Portal Nacional de Contratações Públicas e envio ao SIGA do
                        Tribunal de Contas dos Municípios da Bahia a partir dos mesmos dados.
                    </p>
                </div>
            </Reveal>
            <Stagger class="grid grid-2" :stagger-children="0.08">
                <StaggerItem>
                    <div class="util-card util-card--dark" style="height: 100%">
                        <span class="card-index" style="color: var(--primary-on-dark)">Federal</span>
                        <h3>PNCP</h3>
                        <p>
                            Sincronização do plano anual e das unidades, com indicador de publicação
                            visível no próprio cartão do PCA e selo no contrato.
                        </p>
                    </div>
                </StaggerItem>
                <StaggerItem>
                    <div class="util-card util-card--dark" style="height: 100%">
                        <span class="card-index" style="color: var(--primary-on-dark)">Estadual</span>
                        <h3>SIGA / TCM-BA</h3>
                        <p>
                            Envio ao Tribunal de Contas dos Municípios da Bahia sem redigitação,
                            a partir do contrato já cadastrado no sistema.
                        </p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <section class="tile tile--light">
        <div class="container container-narrow" style="text-align: center">
            <Reveal>
                <h2 class="t-display">Cada módulo tem uma tela e um responsável.</h2>
                <p class="t-lead" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                    Veja o ciclo completo de uma demanda, da abertura ao contrato.
                </p>
                <div class="cta-row cta-row--center">
                    <RouterLink to="/sicc" class="btn btn-store">Ver o fluxo do SICC</RouterLink>
                    <RouterLink to="/contato" class="btn btn-secondary">Falar com a INFOCO</RouterLink>
                </div>
            </Reveal>
        </div>
    </section>
</template>
