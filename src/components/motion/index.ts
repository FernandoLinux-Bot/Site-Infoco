/**
 * Primitivas de movimento do site.
 *
 * A camada de rolagem é GSAP + ScrollTrigger; a de presença é motion-v (ver o
 * cabeçalho de ./gsap.ts para o porquê da divisão).
 *
 * Regra que vale para todas: o elemento nasce visível no HTML e só é escondido
 * pelo JS, no mesmo tick em que o gatilho é criado. Se o script falhar, o
 * conteúdo fica na tela — o contrário do que acontecia quando o estado inicial
 * morava no CSS.
 */
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import { gsap, semMovimento } from './gsap';

export { default as Reveal } from './Reveal.vue';
export { default as Stagger } from './Stagger.vue';
export { default as StaggerItem } from './StaggerItem.vue';
export { default as WordReveal } from './WordReveal.vue';
export { default as CountUp } from './CountUp.vue';
export { default as ScrollProgress } from './ScrollProgress.vue';

export { revelar } from './revelar';

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Desloca o elemento no eixo Y conforme a rolagem.
 * Recebe a chave do `ref` no template — o GSAP escreve direto no transform,
 * sem passar pelo Vue.
 */
export function useParallax(chave: string, distance = 60) {
    const el = useTemplateRef<HTMLElement>(chave);
    let desfazer: (() => void) | undefined;
    onMounted(() => {
        const alvo = el.value;
        if (!alvo || semMovimento()) return;
        const tween = gsap.fromTo(
            alvo,
            { y: distance },
            {
                y: -distance,
                ease: 'none',
                scrollTrigger: { trigger: alvo, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            }
        );
        desfazer = () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(alvo, { clearProps: 'transform' });
        };
    });
    onBeforeUnmount(() => desfazer?.());
}
