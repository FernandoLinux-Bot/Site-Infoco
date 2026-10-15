<script setup lang="ts">
import { ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { AnimatePresence, motion } from 'motion-v';
import { FaArrowUp, FaInstagram, FaWhatsapp } from './icones';
import { EASE_EXPO } from './motion';
import { INSTAGRAM, WHATSAPP_SUPORTE } from '../data/links';

const showTop = ref(false);
const rolou = ref(false);

const onScroll = () => {
    const y = window.scrollY;
    showTop.value = y > 600;
    // No celular a pilha só entra depois que a pessoa sai do hero: parada
    // ali, ela cobria justamente o parágrafo de abertura.
    rolou.value = y > 320;
};
onScroll();
useEventListener(window, 'scroll', onScroll, { passive: true });

const subir = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
    <div :class="['float-stack', { 'is-rolado': rolou }]">
        <AnimatePresence>
            <motion.button
                v-if="showTop"
                key="top"
                class="float-btn"
                aria-label="Voltar ao topo"
                :initial="{ opacity: 0, scale: 0.8, y: 8 }"
                :animate="{ opacity: 1, scale: 1, y: 0 }"
                :exit="{ opacity: 0, scale: 0.8, y: 8 }"
                :transition="{ duration: 0.35, ease: EASE_EXPO }"
                @click="subir"
            >
                <FaArrowUp aria-hidden="true" />
            </motion.button>
        </AnimatePresence>

        <a
            class="float-btn"
            :href="INSTAGRAM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da INFOCO"
        >
            <FaInstagram aria-hidden="true" />
        </a>
        <a
            class="float-btn"
            :href="WHATSAPP_SUPORTE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com o suporte no WhatsApp"
        >
            <FaWhatsapp aria-hidden="true" />
        </a>
    </div>
</template>
