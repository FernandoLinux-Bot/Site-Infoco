<script setup lang="ts">
import { motion } from 'motion-v';
import { EASE_EXPO } from '../components/motion';
</script>

<template>
    <section class="tile tile--light hero" style="min-height: 62vh; display: grid; place-items: center">
        <div class="container container-narrow">
            <motion.span
                class="eyebrow"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, ease: EASE_EXPO }"
            >
                Erro 404
            </motion.span>
            <motion.h1
                class="t-hero"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.7, ease: EASE_EXPO, delay: 0.08 }"
            >
                Esta página não existe.
            </motion.h1>
            <motion.p
                class="t-lead hero-sub"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.7, ease: EASE_EXPO, delay: 0.16 }"
            >
                O endereço pode ter mudado. Volte ao início ou conheça o SICC.
            </motion.p>
            <motion.div
                class="cta-row cta-row--center"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.7, ease: EASE_EXPO, delay: 0.24 }"
            >
                <RouterLink to="/" class="btn btn-primary">Voltar ao início</RouterLink>
                <RouterLink to="/sicc" class="btn btn-secondary">Conhecer o SICC</RouterLink>
            </motion.div>
        </div>
    </section>
</template>
