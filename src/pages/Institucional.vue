<script setup lang="ts">
import { motion } from 'motion-v';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal, useParallax } from '../components/motion';

const VALORES = [
    { t: 'Ética e transparência', d: 'Responsabilidade e clareza em todas as relações, fortalecendo a confiança entre a gestão pública e a sociedade.' },
    { t: 'Inovação com propósito', d: 'Tecnologia que simplifica processos e gera impacto social — não tecnologia pela tecnologia.' },
    { t: 'Compromisso com o cliente', d: 'Parceria estratégica com o gestor público, com suporte próximo, personalizado e contínuo.' },
    { t: 'Excelência e qualidade', d: 'Software seguro, moderno e eficiente, mantido no ritmo em que a legislação muda.' },
    { t: 'Valorização das pessoas', d: 'Colaboradores, clientes e cidadãos como protagonistas da transformação pública.' },
    { t: 'Responsabilidade social', d: 'Cada melhoria na gestão pública se reflete diretamente na qualidade de vida da população.' },
];

useParallax('parallax', 30);
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
                Institucional
            </motion.span>
            <h1 class="t-hero">
                <WordReveal text="Software para quem responde" />{{ ' ' }}<em><WordReveal text="pelo dinheiro público." :delay="0.15" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                style="max-width: 44ch"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }"
            >
                A INFOCO Gestão Pública é uma empresa de Itabuna, na Bahia, que desenvolve
                sistemas para prefeituras, câmaras e consórcios.
            </motion.p>
        </div>
    </section>

    <section class="tile tile--parchment">
        <div class="container container-mid">
            <div class="split split--wide">
                <Reveal>
                    <div>
                        <span class="eyebrow">Quem somos</span>
                        <h2 class="t-display">Perto de quem executa.</h2>
                        <p class="t-body" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                            A INFOCO nasceu no interior da Bahia atendendo municípios que precisavam
                            cumprir a lei com equipes pequenas e prazos curtos. Essa origem definiu o
                            produto: um sistema que não pressupõe um departamento de licitações
                            grande, e um suporte que conhece o nome de quem liga.
                        </p>
                        <p class="t-body" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                            Quando a Lei 14.133/2021 entrou em vigor, o SICC foi reescrito em torno
                            dela — PCA, DFD, ETP, mapa de riscos e a tramitação por fases não são
                            módulos adicionados depois, são o desenho do sistema.
                        </p>
                        <div class="cta-row">
                            <RouterLink to="/sicc" class="link-action">
                                Conhecer o SICC <span class="chev">›</span>
                            </RouterLink>
                        </div>
                    </div>
                </Reveal>

                <div ref="parallax">
                    <Reveal :delay="0.1">
                        <img
                            src="/patrao.png"
                            alt="Fundador da INFOCO Gestão Pública"
                            class="product-shadow"
                            style="width: 100%; max-width: 420px; margin-inline: auto"
                            loading="lazy"
                        />
                    </Reveal>
                </div>
            </div>
        </div>
    </section>

    <section class="tile tile--dark on-dark">
        <div class="container container-narrow" style="text-align: center">
            <Reveal>
                <span class="eyebrow">Nossa meta</span>
                <h2 class="t-display">
                    Que a conformidade deixe de ser um esforço e passe a ser<em> o caminho natural do processo</em>.
                </h2>
                <p class="t-lead-airy" style="margin-top: var(--s-lg); color: var(--body-muted)">
                    Um servidor não deveria precisar decorar a lei para cumpri-la. O sistema é
                    que deveria conduzir o processo pelo caminho certo — e recusar o atalho errado.
                </p>
            </Reveal>
        </div>
    </section>

    <section class="tile tile--light">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Valores</span>
                    <h2 class="t-display">O que orienta a decisão quando ninguém está olhando.</h2>
                </div>
            </Reveal>
            <Stagger class="grid grid-3" :stagger-children="0.06">
                <StaggerItem v-for="v in VALORES" :key="v.t">
                    <div class="util-card" style="height: 100%">
                        <h3>{{ v.t }}</h3>
                        <p>{{ v.d }}</p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <section class="tile tile--parchment">
        <div class="container container-narrow" style="text-align: center">
            <Reveal>
                <h2 class="t-display">Fale com quem desenvolve.</h2>
                <p class="t-lead" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                    Itabuna, Bahia. Atendimento a municípios de todo o estado.
                </p>
                <div class="cta-row cta-row--center">
                    <RouterLink to="/contato" class="btn btn-store">Entrar em contato</RouterLink>
                    <RouterLink to="/trabalhe-conosco" class="btn btn-secondary">Trabalhe conosco</RouterLink>
                </div>
            </Reveal>
        </div>
    </section>
</template>
