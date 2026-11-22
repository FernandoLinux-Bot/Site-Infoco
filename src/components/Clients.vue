<script setup lang="ts">
import { Reveal, Stagger, StaggerItem } from './motion';

const CLIENTES = [
    { nome: 'Almadina', logo: '/clients/almadina.webp' },
    { nome: 'Itamaraju', logo: '/clients/itamaraju.webp' },
    { nome: 'Nova Viçosa', logo: '/clients/nova-vicosa.webp' },
    { nome: 'Itororó', logo: '/clients/itororo.webp' },
    { nome: 'Anagé', logo: '/clients/anage.webp' },
    { nome: 'Itabela', logo: '/clients/itabela.webp' },
    { nome: 'Prado', logo: '/clients/prado.webp' },
];
</script>

<template>
    <section class="tile tile--parchment">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Quem já usa</span>
                    <h2 class="t-display">Municípios que operam no SICC.</h2>
                    <p class="t-body">
                        Prefeituras, câmaras e consórcios da Bahia conduzem suas contratações dentro do sistema.
                    </p>
                </div>
            </Reveal>

            <Stagger class="client-strip" :stagger-children="0.06">
                <StaggerItem v-for="c in CLIENTES" :key="c.nome">
                    <figure style="margin: 0">
                        <img :src="c.logo" :alt="`Brasão de ${c.nome}`" loading="lazy" />
                        <figcaption>{{ c.nome }}</figcaption>
                    </figure>
                </StaggerItem>
            </Stagger>
        </div>
    </section>
</template>
