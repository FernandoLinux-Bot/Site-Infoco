<script setup lang="ts">
import SimboloInfoco from './SimboloInfoco.vue';
import { useParallax } from './motion';

/**
 * O fundo dos banners de página: o símbolo da INFOCO nasce no canto, como na
 * abertura da Home, com duas ou três folhas do assunto da página à frente.
 * Disco e folhas andam em ritmos diferentes com a rolagem, e é só isso que dá
 * a profundidade. Tudo decorativo: fora da árvore de acessibilidade.
 */
defineProps<{ folhas?: string[] }>();

useParallax('disco', 36);
useParallax('papeis', 84);
</script>

<template>
    <div class="banner-fundo" aria-hidden="true">
        <div ref="disco" class="banner-disco"><SimboloInfoco /></div>
        <div ref="papeis" class="banner-papeis">
            <div v-for="(rotulo, i) in folhas" :key="rotulo" class="banner-folha" :class="`banner-folha--${i + 1}`">
                <div class="papel-folha">
                    <span class="chip chip--action">{{ rotulo }}</span>
                    <i v-for="linha in 6" :key="linha" />
                </div>
            </div>
        </div>
    </div>
</template>
