import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

type TiltCardProps = {
    children: React.ReactNode;
    className?: string;
    /** Máximo de rotação em graus (padrão 8). */
    max?: number;
    /** Se true, adiciona a classe .spotlight (brilho seguindo o cursor). */
    spotlight?: boolean;
    style?: React.CSSProperties;
} & Omit<MotionProps, 'style'>;

/**
 * Card com inclinação 3D e spotlight que seguem o cursor.
 * Usa motion values (fora do ciclo de render do React) para performance —
 * nunca useState para posição do ponteiro. Colapsa para estático quando
 * o usuário prefere movimento reduzido.
 */
const TiltCard = ({ children, className = '', max = 8, spotlight = true, style, ...rest }: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);

    const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
    const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduce) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        px.set(nx);
        py.set(ny);
        el.style.setProperty('--mx', `${nx * 100}%`);
        el.style.setProperty('--my', `${ny * 100}%`);
    };

    const handleLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            className={`${spotlight ? 'spotlight ' : ''}tilt ${className}`.trim()}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={reduce ? style : { rotateX: rx, rotateY: ry, ...style }}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default TiltCard;
