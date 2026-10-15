<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { AnimatePresence, MotionConfig, motion } from 'motion-v';
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import FloatingActions from './components/FloatingActions.vue';
import { EASE_EXPO, ScrollProgress } from './components/motion';
import { ScrollTrigger } from './components/motion/gsap';

/**
 * Dono único de "a rota mudou → remedir → posicionar a página".
 *
 * A ordem importa. O ScrollTrigger mede a página quando cria os gatilhos, e
 * numa SPA a altura muda sem recarregar — sem remedir, os gatilhos da rota
 * nova apontam para as posições da antiga. Mas remedir e rolar ao mesmo tempo
 * viram uma corrida: o `refresh` restaura a posição de rolagem e desfaz o salto
 * para a âncora. Por isso remedimos primeiro e só então posicionamos.
 */
const route = useRoute();
let raf = 0;

function posicionar() {
    cancelAnimationFrame(raf);
    const hash = route.hash;
    raf = requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        if (!hash) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            return;
        }
        const alvo = document.getElementById(hash.slice(1));
        if (!alvo) return;
        // `auto` e não `smooth`: quem chega por link direto quer estar lá, e
        // a rolagem suave ainda estaria a meio caminho quando o ScrollTrigger
        // avaliasse os gatilhos.
        const topoFixo = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        window.scrollTo({
            top: alvo.getBoundingClientRect().top + window.scrollY - topoFixo,
            behavior: 'auto',
        });
    });
}

// A rota mudou: posiciona na hora (a página antiga ainda está saindo)…
watch(() => [route.path, route.hash], posicionar);
// …e de novo quando a página nova monta, que é quando os gatilhos dela
// existem e a âncora de outra rota passa a ser encontrável.
</script>

<template>
    <!-- `reduced-motion="user"` faz o motion-v respeitar a preferência do
         sistema em toda animação, e não só nas primitivas: os motion.p e
         motion.div dos heros de cada página usam initial/animate direto. O GSAP
         já respeita pela função semMovimento(). -->
    <MotionConfig reduced-motion="user">
        <Header />
        <ScrollProgress />
        <main class="app-main">
            <RouterView v-slot="{ Component, route: rota }">
                <AnimatePresence mode="wait">
                    <motion.div
                        :key="rota.path"
                        :initial="{ opacity: 0 }"
                        :animate="{ opacity: 1 }"
                        :exit="{ opacity: 0 }"
                        :transition="{ duration: 0.28, ease: EASE_EXPO }"
                    >
                        <component :is="Component" @vue:mounted="posicionar" />
                    </motion.div>
                </AnimatePresence>
            </RouterView>
        </main>
        <Footer />
        <FloatingActions />
        <Analytics />
        <SpeedInsights />
    </MotionConfig>
</template>
