import React from 'react';
import AnimatedSection from './AnimatedSection';
// Fix: Import `Variants` type from framer-motion to correctly type the animation variants.
import { motion, useAnimationControls, Variants } from 'framer-motion';

interface FeatureCardProps {
    imgSrc: string;
    title: string;
    description: string;
    delay: number;
}

// Fix: Add the `Variants` type to `iconVariants` to ensure it conforms to framer-motion's expected structure.
const iconVariants: Variants = {
    rest: {
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 400, damping: 15 }
    },
    hover: {
        scale: 1.15,
        rotate: 7,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
};

const FeatureCard: React.FC<FeatureCardProps> = ({ imgSrc, title, description, delay }) => {
    const controls = useAnimationControls();

    return (
        <div 
            className="feature-card animated-item" 
            style={{ transitionDelay: `${delay * 100}ms` }}
            onMouseEnter={() => controls.start('hover')}
            onMouseLeave={() => controls.start('rest')}
        >
            <motion.img
                src={imgSrc}
                alt={`${title} icon`}
                className="feature-icon"
                variants={iconVariants}
                initial="rest"
                animate={controls}
            />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const Features = () => (
    <AnimatedSection id="solucoes" className="features">
        <div className="container">
            <h2 className="section-title animated-item">Nossas Soluções</h2>
            <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                Um portfólio completo de soluções para atender o setor público e privado em todas as esferas.
            </p>
            <div className="features-grid">
                <FeatureCard
                    delay={1}
                    imgSrc="/icons/consultoria.svg"
                    title="Consultoria Especializada"
                    description="Navegue com segurança no universo das licitações com o suporte de nossos especialistas."
                />
                <FeatureCard
                    delay={2}
                    imgSrc="/icons/gestao.svg"
                    title="Sistema de Gestão"
                    description="Gerencie todas as fases do processo licitatório em uma plataforma intuitiva e poderosa."
                />
                <FeatureCard
                    delay={3}
                    imgSrc="/icons/mercado.svg"
                    title="Inteligência de Mercado"
                    description="Acesse dados e análises estratégicas para identificar as melhores oportunidades de negócio."
                />
                 <FeatureCard
                    delay={4}
                    imgSrc="/icons/capacitacao.svg"
                    title="Capacitação e Treinamentos"
                    description="Capacite sua equipe com nossos cursos e treinamentos focados em licitações públicas."
                />
                 <FeatureCard
                    delay={5}
                    imgSrc="/icons/disputa.svg"
                    title="Disputa de Licitações"
                    description="Conte com nossa equipe para representar sua empresa e operar lances em pregões eletrônicos."
                />
                 <FeatureCard
                    delay={6}
                    imgSrc="/icons/juridico.svg"
                    title="Assessoria Jurídica"
                    description="Garanta a conformidade e segurança jurídica em todas as suas participações em licitações."
                />
            </div>
        </div>
    </AnimatedSection>
);

export default Features;
