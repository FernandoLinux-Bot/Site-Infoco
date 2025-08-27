import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
    id?: string;
    className: string;
    children: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ id, className, children }) => {
    const [setRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section ref={setRef} id={id} className={`${className} ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </section>
    );
};

export default AnimatedSection;
