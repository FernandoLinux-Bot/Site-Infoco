<script setup lang="ts">
import { Reveal, Stagger, StaggerItem } from './motion';

const CLIENTES = [
    { nome: 'Almadina', logo: '/clients/almadina.png' },
    { nome: 'Itamaraju', logo: '/clients/itamaraju.png' },
    { nome: 'Nova Viçosa', logo: '/clients/nova-vicosa.png' },
    { nome: 'Itororó', logo: '/clients/itororo.png' },
    { nome: 'Anagé', logo: '/clients/anage.png' },
    { nome: 'Itabela', logo: '/clients/itabela.png' },
    { nome: 'Prado', logo: '/clients/prado.png' },
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
