<script setup lang="ts">
/** Título que revela palavra a palavra, cada uma atrás da sua máscara. */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap, INICIO, semMovimento } from './gsap';

const props = withDefaults(defineProps<{ text: string; delay?: number }>(), { delay: 0 });

const el = ref<HTMLSpanElement | null>(null);
const palavras = computed(() => props.text.split(' '));
let desfazer: (() => void) | undefined;

onMounted(() => {
    const raiz = el.value;
    if (!raiz || semMovimento()) return;
    const alvos = raiz.querySelectorAll<HTMLElement>('[data-palavra]');
    if (!alvos.length) return;
    gsap.set(alvos, { yPercent: 108 });
    const tween = gsap.to(alvos, {
        yPercent: 0,
        duration: 0.85,
        delay: props.delay,
        stagger: 0.045,
        scrollTrigger: { trigger: raiz, start: INICIO, once: true },
    });
    desfazer = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(alvos, { clearProps: 'transform' });
    };
});
onBeforeUnmount(() => desfazer?.());
</script>

<!-- A máscara e a palavra são elementos separados: o espaço entre elas é um nó
     de texto real, e é o único ponto de quebra da linha. Se ele entrar na
     máscara, a manchete deixa de quebrar. -->
<template>
    <span ref="el"><span v-for="(p, i) in palavras" :key="`${p}-${i}`"><span style="display: inline-block; overflow: hidden; vertical-align: bottom"><span data-palavra style="display: inline-block">{{ p }}</span></span><template v-if="i < palavras.length - 1">{{ ' ' }}</template></span></span>
</template>
