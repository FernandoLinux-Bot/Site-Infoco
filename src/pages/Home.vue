<script setup lang="ts">
import Hero from '../components/Hero.vue';
import VideoSection from '../components/VideoSection.vue';
import Clients from '../components/Clients.vue';
import { CountUp, Reveal, Stagger, StaggerItem, useParallax } from '../components/motion';
import { MODULOS, NUMEROS, PERFIS } from '../data/sicc';
import { CONHECER } from '../data/links';

const numeros = NUMEROS.map(n => {
    const numerico = Number(n.valor.replace('.', ''));
    const inteiro = Number.isFinite(numerico) && n.valor.length <= 2;
    return { ...n, numerico, inteiro };
});

useParallax('parallax', 34);
</script>

<template>
    <Hero />

    <!-- Números -->
    <section class="tile tile--parchment">
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

    <!-- O produto -->
    <section class="tile tile--dark on-dark">
        <div class="container container-mid">
            <div class="split split--wide">
                <Reveal>
                    <div>
                        <span class="eyebrow">O sistema</span>
                        <h2 class="t-display">
                            O SICC não é um módulo. É o <em>ciclo inteiro</em>.
                        </h2>
                        <p class="t-body" style="margin-top: var(--s-md); color: var(--body-muted)">
                            Planejar, estudar, precificar, licitar, contratar e prestar contas costumam
                            viver em sistemas diferentes — e é aí que o dado se perde. No SICC, o objeto
                            cadastrado no DFD é o mesmo objeto do ETP, da cotação, do edital e do contrato.
                        </p>
                        <ul class="feature-list" style="margin-top: var(--s-lg)">
                            <li>Um catálogo de objetos e itens que atravessa todos os módulos</li>
                            <li>Assinatura eletrônica de DFD, TR, ETP, Ata-RP e autuação dentro do sistema</li>
                            <li>Publicação no PNCP e envio ao SIGA / TCM-BA a partir do mesmo cadastro</li>
                        </ul>
                        <div class="cta-row">
                            <RouterLink to="/sicc" class="btn btn-primary">Ver o SICC em detalhe</RouterLink>
                            <RouterLink to="/solucoes" class="link-action">
                                Todos os módulos <span class="chev">›</span>
                            </RouterLink>
                        </div>
                    </div>
                </Reveal>

                <div ref="parallax">
                    <Reveal :delay="0.12">
                        <div class="grid grid-2">
                            <div v-for="(m, i) in MODULOS.slice(0, 6)" :key="m.id" class="util-card util-card--dark">
                                <span class="card-index" style="color: var(--primary-on-dark)">
                                    {{ String(i + 1).padStart(2, '0') }}
                                </span>
                                <h3>{{ m.nome }}</h3>
                                <p>{{ m.resumo }}</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </section>

    <!-- Módulos -->
    <section class="tile tile--light">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Módulos</span>
                    <h2 class="t-display">Cada etapa tem a sua tela. Todas falam a mesma língua.</h2>
                    <p class="t-body">
                        {{ MODULOS.length }} módulos integrados, do Plano de Contratação Anual à prestação de contas.
                    </p>
                </div>
            </Reveal>

            <Stagger class="grid grid-3" :stagger-children="0.05">
                <StaggerItem v-for="m in MODULOS" :key="m.id">
                    <article class="util-card" style="height: 100%">
                        <span class="card-index">{{ m.resumo }}</span>
                        <h3>{{ m.nome }}</h3>
                        <p>{{ m.descricao }}</p>
                        <div class="util-card-foot">
                            <RouterLink :to="`/solucoes#${m.id}`" class="link-action" style="font-size: 14px">
                                Detalhes <span class="chev">›</span>
                            </RouterLink>
                        </div>
                    </article>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

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
