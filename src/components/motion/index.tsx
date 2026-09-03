/**
 * Primitivas de movimento do site.
 *
 * A camada de rolagem é GSAP + ScrollTrigger; a de presença continua em
 * framer-motion (ver o cabeçalho de ./gsap.ts para o porquê da divisão).
 *
 * Regra que vale para todas: o elemento nasce visível no HTML e só é escondido
 * pelo JS, no mesmo tick em que o gatilho é criado. Se o script falhar, o
 * conteúdo fica na tela — o contrário do que acontecia quando o estado inicial
 * morava no CSS.
 */
import { ReactNode, useEffect, useRef, useState } from 'react';
import { gsap, INICIO, semMovimento } from './gsap';

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Anima o elemento subindo até a posição, quando ele entra na tela. */
function revelar(alvo: Element | Element[], { y = 28, delay = 0, stagger = 0 } = {}) {
    if (semMovimento()) return undefined;
    const de = gsap.set(alvo, { opacity: 0, y });
    void de;
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

/** Bloco que sobe e aparece ao entrar na viewport. */
export function Reveal({
    children,
    delay = 0,
    y = 28,
    className,
    as: Tag = 'div',
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
    as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        return revelar(el, { y, delay });
    }, [y, delay]);
    return (
        <Tag className={className} ref={ref as never}>
            {children}
        </Tag>
    );
}

/** Container que escalona a entrada dos filhos diretos. */
export function Stagger({
    children,
    className,
    delayChildren = 0.05,
    staggerChildren = 0.07,
}: {
    children: ReactNode;
    className?: string;
    delayChildren?: number;
    staggerChildren?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const filhos = Array.from(el.children);
        if (!filhos.length) return;
        return revelar(filhos, { delay: delayChildren, stagger: staggerChildren });
    }, [delayChildren, staggerChildren]);
    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    );
}

/** Filho de <Stagger>. É só o invólucro: quem anima é o pai. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
}

/**
 * Desloca o elemento no eixo Y conforme a rolagem.
 * Devolve só a ref — o GSAP escreve direto no transform, sem passar por React.
 */
export function useParallax(distance = 60) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el || semMovimento()) return;
        const tween = gsap.fromTo(
            el,
            { y: distance },
            {
                y: -distance,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            }
        );
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(el, { clearProps: 'transform' });
        };
    }, [distance]);
    return ref;
}

/** Título que revela palavra a palavra, cada uma atrás da sua máscara. */
export function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el || semMovimento()) return;
        const palavras = el.querySelectorAll<HTMLElement>('[data-palavra]');
        if (!palavras.length) return;
        gsap.set(palavras, { yPercent: 108 });
        const tween = gsap.to(palavras, {
            yPercent: 0,
            duration: 0.85,
            delay,
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: INICIO, once: true },
        });
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(palavras, { clearProps: 'transform' });
        };
    }, [text, delay]);

    const palavras = text.split(' ');
    return (
        <span className={className} ref={ref}>
            {palavras.map((p, i) => (
                <span key={`${p}-${i}`}>
                    {/* A máscara e a palavra são elementos separados: o espaço
                        entre elas é um nó de texto real, e é o único ponto de
                        quebra da linha. Se ele entrar na máscara, a manchete
                        deixa de quebrar. */}
                    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                        <span data-palavra style={{ display: 'inline-block' }}>{p}</span>
                    </span>
                    {i < palavras.length - 1 ? ' ' : null}
                </span>
            ))}
        </span>
    );
}

/** Contador que anima até o valor quando entra na tela. */
export function CountUp({ to, duration = 1.4, decimals = 0 }: { to: number; duration?: number; decimals?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [valor, setValor] = useState(() => (semMovimento() ? to : 0));

    useEffect(() => {
        const el = ref.current;
        if (!el || semMovimento()) return;
        const contador = { n: 0 };
        const tween = gsap.to(contador, {
            n: to,
            duration,
            ease: 'power3.out',
            onUpdate: () => setValor(contador.n),
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [to, duration]);

    return <span ref={ref}>{valor.toFixed(decimals)}</span>;
}

/** Barra de progresso da rolagem da página. */
export function ScrollProgress() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        gsap.set(el, { scaleX: 0 });
        const tween = gsap.to(el, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
        });
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);
    return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
