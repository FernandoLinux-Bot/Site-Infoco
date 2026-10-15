<script setup lang="ts">
/** Container que escalona a entrada dos filhos diretos. */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { revelar } from './revelar';

const props = withDefaults(defineProps<{ delayChildren?: number; staggerChildren?: number }>(), {
    delayChildren: 0.05,
    staggerChildren: 0.07,
});

const el = ref<HTMLDivElement | null>(null);
let desfazer: (() => void) | undefined;
onMounted(() => {
    if (!el.value) return;
    const filhos = Array.from(el.value.children);
    if (!filhos.length) return;
    desfazer = revelar(filhos, { delay: props.delayChildren, stagger: props.staggerChildren });
});
onBeforeUnmount(() => desfazer?.());
</script>

<template>
    <div ref="el"><slot /></div>
</template>
