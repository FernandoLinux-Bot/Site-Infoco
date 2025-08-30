import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface CountUpProps {
    end: number;
    duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 3000 }) => {
    const [count, setCount] = useState(0);
    const [setRef, isVisible] = useIntersectionObserver({ threshold: 0.5 });

    useEffect(() => {
        if (!isVisible) {
            setCount(0); // Reset count if it's not visible
            return;
        }

        let animationFrameId: number;
        let startTimestamp: number | null = null;
        const startValue = 0;

        const animate = (timestamp: number) => {
            if (!startTimestamp) {
                startTimestamp = timestamp;
            }

            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            
            // Apply an easing function (ease-out cubic) for a smoother animation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentCount = Math.floor(easeOutProgress * (end - startValue) + startValue);
            
            setCount(currentCount);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure it ends on the exact number
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isVisible, end, duration]);

    return <span ref={setRef} className="stat-number">{count.toLocaleString('pt-BR')}</span>;
};


const Stats = () => (
    <AnimatedSection id="numeros" className="stats">
        <div className="container">
            <div className="stats-grid">
                <div className="stat-item animated-item" style={{ transitionDelay: '100ms' }}>
                    <CountUp end={150} />+
                    <p>Milhões em Negócios</p>
                </div>
                <div className="stat-item animated-item" style={{ transitionDelay: '200ms' }}>
                    <CountUp end={5000} />+
                    <p>Clientes Satisfeitos</p>
                </div>
                <div className="stat-item animated-item" style={{ transitionDelay: '300ms' }}>
                    <CountUp end={10} />+
                    <p>Anos de Mercado</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

export default Stats;
