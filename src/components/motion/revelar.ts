import { gsap, INICIO, semMovimento } from './gsap';

/** Anima o elemento subindo até a posição, quando ele entra na tela. */
export function revelar(alvo: Element | Element[], { y = 28, delay = 0, stagger = 0 } = {}) {
    if (semMovimento()) return undefined;
    gsap.set(alvo, { opacity: 0, y });
    const tween = gsap.to(alvo, {
        opacity: 1,
        y: 0,
        delay,
        stagger,
        scrollTrigger: { trigger: alvo instanceof Element ? alvo : alvo[0], start: INICIO, once: true },
    });
    return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(alvo, { clearProps: 'opacity,transform' });
    };
}
