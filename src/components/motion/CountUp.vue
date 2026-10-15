<script setup lang="ts">
/** Contador que anima até o valor quando entra na tela. */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap, semMovimento } from './gsap';

const props = withDefaults(defineProps<{ to: number; duration?: number; decimals?: number }>(), {
    duration: 1.4,
    decimals: 0,
});

const el = ref<HTMLSpanElement | null>(null);
const valor = ref(semMovimento() ? props.to : 0);
let desfazer: (() => void) | undefined;

onMounted(() => {
    if (!el.value || semMovimento()) return;
    const contador = { n: 0 };
    const tween = gsap.to(contador, {
        n: props.to,
        duration: props.duration,
        ease: 'power3.out',
        onUpdate: () => {
            valor.value = contador.n;
        },
        scrollTrigger: { trigger: el.value, start: 'top 92%', once: true },
    });
    desfazer = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
    };
});
onBeforeUnmount(() => desfazer?.());
</script>

<template>
    <span ref="el">{{ valor.toFixed(decimals) }}</span>
</template>
