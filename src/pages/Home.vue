<script setup lang="ts">
import Hero from '../components/Hero.vue';
import Ciclo from '../components/Ciclo.vue';
import Esteira from '../components/Esteira.vue';
import VideoSection from '../components/VideoSection.vue';
import Clients from '../components/Clients.vue';
import { CountUp, Reveal, Stagger, StaggerItem } from '../components/motion';
import { NUMEROS, PERFIS } from '../data/sicc';
import { CONHECER } from '../data/links';

const numeros = NUMEROS.map(n => {
    const numerico = Number(n.valor.replace('.', ''));
    const inteiro = Number.isFinite(numerico) && n.valor.length <= 2;
    return { ...n, numerico, inteiro };
});
</script>

<template>
    <Hero />

    <!-- Números -->
    <section class="tile tile--light">
        <div class="container container-mid">
            <Stagger class="stat-row" :stagger-children="0.09">
                <StaggerItem v-for="n in numeros" :key="n.rotulo" class="stat">
                    <div class="stat-value">
                        <CountUp v-if="n.inteiro" :to="n.numerico" /><template v-else>{{ n.valor }}</template><span v-if="n.sufixo" class="stat-suffix">{{ n.sufixo }}</span>
                    </div>
                    <div class="stat-label">{{ n.rotulo }}</div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <Ciclo />

    <Esteira />

    <VideoSection />

    <!-- Perfis -->
    <section class="tile tile--dark-2 on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Quem opera</span>
                    <h2 class="t-display">O sistema muda conforme quem entra.</h2>
                    <p class="t-body">
                        Cada perfil vê apenas as ações que a sua fase permite — e o menu de ações se
                        redesenha conforme o status do processo.
                    </p>
                </div>
            </Reveal>
            <Stagger class="grid grid-4" :stagger-children="0.07">
                <StaggerItem v-for="p in PERFIS" :key="p.nome">
                    <div class="util-card util-card--dark" style="height: 100%">
                        <h3>{{ p.nome }}</h3>
                        <p>{{ p.papel }}</p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <Clients />

    <!-- CTA final -->
    <section class="tile tile--light">
        <div class="container container-narrow" style="text-align: center">
            <Reveal>
                <span class="eyebrow">Próximo passo</span>
                <h2 class="t-display">Leve o ciclo inteiro para dentro de um sistema.</h2>
                <p class="t-lead" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                    Converse com a equipe da INFOCO sobre a implantação do SICC no seu município.
                </p>
                <div class="cta-row cta-row--center">
                    <RouterLink to="/contato" class="btn btn-store">Falar com a INFOCO</RouterLink>
                    <a class="btn btn-secondary" :href="CONHECER" target="_blank" rel="noopener noreferrer">
                        Ver o sistema por dentro
                    </a>
                </div>
            </Reveal>
        </div>
    </section>
</template>
