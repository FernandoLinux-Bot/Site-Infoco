/**
 * Primitivas de movimento do site.
 * Regra do design system: o movimento serve à leitura — entra com a mesma
 * curva (ease-out-expo), respeita prefers-reduced-motion e nunca compete
 * com o conteúdo.
 */
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import {
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
    type Transition,
    type Variants,
} from 'framer-motion';

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Regra de viewport de toda revelação do site.
 *
 * `amount` NÃO pode ser fração. Ele é a parcela do elemento que precisa estar
 * visível, e num bloco mais alto que a janela essa parcela é impossível: o grid
 * de módulos da Home tem 3721px num viewport de 664px, então `amount: 0.2`
 * exigiria 744px visíveis. O limiar nunca era atingido, `whileInView` nunca
 * disparava e a seção inteira ficava presa em `opacity: 0` — em branco no
 * celular. `'some'` dispara com qualquer parte visível, e a margem negativa
 * segura a entrada até o bloco estar de fato dentro da tela.
 */
export const VIEWPORT = { once: true, amount: 'some', margin: '0px 0px -12% 0px' } as const;

export const ENTER: Transition = { duration: 0.8, ease: EASE_EXPO };

export const stagger = (delayChildren = 0.05, staggerChildren = 0.07): Variants => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren, staggerChildren } },
});

export const riseItem: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: ENTER },
};

/** Bloco que sobe e aparece quando entra na viewport. */
export function Reveal({
    children,
    delay = 0,
    y = 28,
    className,
    as = 'div',
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
    as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
    const reduce = useReducedMotion();
    const Cmp = motion[as];
    return (
        <Cmp
            className={className}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...ENTER, delay }}
        >
            {children}
        </Cmp>
    );
}

/** Container que escalona a entrada dos filhos. */
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
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(delayChildren, staggerChildren)}
        >
            {children}
        </motion.div>
    );
}

/** Filho de <Stagger>. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div className={className} variants={riseItem}>
            {children}
        </motion.div>
    );
}

/** Desloca o elemento no eixo Y conforme a rolagem — parallax discreto. */
export function useParallax(distance = 60): { ref: React.RefObject<HTMLDivElement>; y: MotionValue<number> } {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
    const zero = useMotionValue(0);
    const y = useSpring(reduce ? zero : raw, { stiffness: 120, damping: 30, mass: 0.6 });
    return { ref, y };
}

/** Título cujas palavras entram uma a uma. */
export function WordReveal({
    text,
    className,
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) {
    const reduce = useReducedMotion();
    const words = text.split(' ');
    if (reduce) return <span className={className}>{text}</span>;
    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ visible: { transition: { delayChildren: delay, staggerChildren: 0.045 } } }}
        >
            {words.map((w, i) => (
                <Fragment key={`${w}-${i}`}>
                    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                        <motion.span
                            style={{ display: 'inline-block' }}
                            variants={{
                                hidden: { y: '108%' },
                                visible: { y: '0%', transition: { duration: 0.85, ease: EASE_EXPO } },
                            }}
                        >
                            {w}
                        </motion.span>
                    </span>
                    {/* Espaco real entre as mascaras: e o unico ponto de quebra da linha. */}
                    {i < words.length - 1 ? '\u0020' : null}
                </Fragment>
            ))}
        </motion.span>
    );
}

/** Contador que anima até o valor quando entra na tela. */
export function CountUp({ to, duration = 1.4, decimals = 0 }: { to: number; duration?: number; decimals?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    // 'some' pela mesma razão do VIEWPORT: nenhuma fração de altura no código.
    const inView = useInView(ref, { once: true, amount: 'some' });
    const reduce = useReducedMotion();
    const [value, setValue] = useState(reduce ? to : 0);

    useEffect(() => {
        if (!inView || reduce) {
            if (reduce) setValue(to);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(to * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, to, duration, reduce]);

    return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

/** Barra de progresso da rolagem da página. */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
    return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
