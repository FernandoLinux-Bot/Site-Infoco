import React, { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface CountUpProps {
    end: number;
    duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [setRef, isVisible] = useIntersectionObserver({ threshold: 0.5 });

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const startTime = Date.now();
        const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            setCount(currentCount);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end); // Ensure it ends on the exact number
            }
        };
        requestAnimationFrame(step);
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
