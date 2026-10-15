<script setup lang="ts">
import { onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AnimatePresence, motion } from 'motion-v';
import { EASE_EXPO } from './motion';
import { ACESSO } from '../data/links';

/** Linha 1 — institucional, discreta, como a barra preta da Apple. */
const globalNav = [
    { to: '/', label: 'Início', end: true },
    { to: '/sicc', label: 'SICC' },
    { to: '/solucoes', label: 'Módulos' },
    { to: '/institucional', label: 'Institucional' },
    { to: '/noticias', label: 'Notícias' },
    { to: '/fornecedor', label: 'Fornecedores' },
    { to: '/trabalhe-conosco', label: 'Carreiras' },
    { to: '/contato', label: 'Contato' },
];

/** Linha 2 — contexto do produto e o CTA persistente. */
const subNav = [
    { to: '/sicc', label: 'Visão geral' },
    { to: '/solucoes', label: 'Módulos' },
    { to: '/sicc#fluxo', label: 'Fluxo' },
    { to: '/sicc#perguntas', label: 'Perguntas' },
    { to: '/contato', label: 'Falar com a INFOCO' },
];

const route = useRoute();
const open = ref(false);

/**
 * A mesma regra do NavLink: o caminho bate (ou é prefixo de segmento), e com
 * `end` só vale o caminho exato. O hash não entra na conta.
 */
const ativo = (to: string, end = false) => {
    const caminho = to.split('#')[0];
    if (end || caminho === '/') return route.path === caminho;
    return route.path === caminho || route.path.startsWith(`${caminho}/`);
};

// Fechar pela troca de rota não basta: tocar em "Início" já estando na Home
// não muda o pathname, o watch não dispara e a gaveta ficava presa — sem
// backdrop nem Escape para sair. O @click de cada link resolve na origem;
// este watch continua como rede para navegação que venha de outro lugar.
watch(() => route.path, () => (open.value = false));

watchEffect(() => document.body.classList.toggle('nav-open', open.value));
onBeforeUnmount(() => document.body.classList.remove('nav-open'));
</script>

<template>
    <header class="global-nav">
        <div class="global-nav-inner">
            <nav class="global-nav-links" aria-label="Navegação principal">
                <RouterLink
                    v-for="item in globalNav"
                    :key="item.to"
                    :to="item.to"
                    :class="{ 'is-active': ativo(item.to, item.end) }"
                    :aria-current="ativo(item.to, item.end) ? 'page' : undefined"
                >
                    {{ item.label }}
                </RouterLink>
            </nav>
        </div>
    </header>

    <div class="sub-nav">
        <div class="sub-nav-inner">
            <RouterLink to="/" class="sub-nav-brand" aria-label="INFOCO Gestão Pública, início">
                <img src="/logo-infoco.png" alt="INFOCO Gestão Pública" width="106" height="34" />
            </RouterLink>

            <nav class="sub-nav-links" aria-label="Navegação do produto">
                <RouterLink
                    v-for="item in subNav"
                    :key="item.label"
                    :to="item.to"
                    :class="{ 'is-active': ativo(item.to) && !item.to.includes('#') }"
                    :aria-current="ativo(item.to) ? 'page' : undefined"
                >
                    {{ item.label }}
                </RouterLink>
            </nav>

            <div class="sub-nav-right">
                <a class="btn btn-primary" :href="ACESSO" target="_blank" rel="noopener noreferrer">
                    Acessar o sistema
                </a>
                <button
                    :class="['hamburger', { 'is-open': open }]"
                    :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
                    :aria-expanded="open"
                    @click="open = !open"
                >
                    <span /><span />
                </button>
            </div>
        </div>
    </div>

    <AnimatePresence>
        <motion.nav
            v-if="open"
            class="mobile-sheet"
            aria-label="Menu"
            :initial="{ opacity: 0, y: -12 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -12 }"
            :transition="{ duration: 0.4, ease: EASE_EXPO }"
        >
            <motion.div
                v-for="(item, i) in globalNav"
                :key="item.to"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, ease: EASE_EXPO, delay: 0.05 + i * 0.04 }"
            >
                <RouterLink
                    :to="item.to"
                    :class="{ active: ativo(item.to, item.end) }"
                    :aria-current="ativo(item.to, item.end) ? 'page' : undefined"
                    @click="open = false"
                >
                    {{ item.label }}
                </RouterLink>
            </motion.div>
            <div class="mobile-cta">
                <a class="btn btn-primary" :href="ACESSO" target="_blank" rel="noopener noreferrer">
                    Acessar o sistema
                </a>
            </div>
        </motion.nav>
    </AnimatePresence>
</template>
