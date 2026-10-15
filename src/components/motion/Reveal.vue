<script setup lang="ts">
/** Bloco que sobe e aparece ao entrar na viewport. */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { revelar } from './revelar';

const props = withDefaults(
    defineProps<{ delay?: number; y?: number; as?: 'div' | 'section' | 'li' | 'article' | 'header' }>(),
    { delay: 0, y: 28, as: 'div' }
);

const el = ref<HTMLElement | null>(null);
let desfazer: (() => void) | undefined;
onMounted(() => {
    if (el.value) desfazer = revelar(el.value, { y: props.y, delay: props.delay });
});
onBeforeUnmount(() => desfazer?.());
</script>

<template>
    <component :is="as" ref="el"><slot /></component>
</template>
