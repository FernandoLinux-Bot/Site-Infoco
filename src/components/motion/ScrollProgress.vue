<script setup lang="ts">
/** Barra de progresso da rolagem da página. */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap } from './gsap';

const el = ref<HTMLDivElement | null>(null);
let desfazer: (() => void) | undefined;

onMounted(() => {
    if (!el.value) return;
    gsap.set(el.value, { scaleX: 0 });
    const tween = gsap.to(el.value, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
    });
    desfazer = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
    };
});
onBeforeUnmount(() => desfazer?.());
</script>

<template>
    <div ref="el" class="scroll-progress" aria-hidden="true" />
</template>
