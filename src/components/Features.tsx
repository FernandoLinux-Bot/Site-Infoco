import React from 'react';
import AnimatedSection from './AnimatedSection';
import { motion, useAnimationControls } from 'framer-motion';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

const iconVariants = {
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

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
    const controls = useAnimationControls();

    return (
        <div 
            className="feature-card animated-item" 
            style={{ transitionDelay: `${delay * 100}ms` }}
            onMouseEnter={() => controls.start('hover')}
            onMouseLeave={() => controls.start('rest')}
        >
            <motion.div
                className="feature-icon-wrapper"
                variants={iconVariants}
                initial="rest"
                animate={controls}
            >
                {icon}
            </motion.div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const Features = () => (
    <AnimatedSection id="servicos" className="features">
        <div className="container">
            <h2 className="section-title animated-item">Nossos Serviços</h2>
            <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                Um portfólio completo de soluções para atender o setor público e privado em todas as esferas.
            </p>
            <div className="features-grid">
                <FeatureCard
                    delay={1}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>}
                    title="Consultoria Especializada"
                    description="Navegue com segurança no universo das licitações com o suporte de nossos especialistas."
                />
                <FeatureCard
                    delay={2}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"></path></svg>}
                    title="Sistema de Gestão"
                    description="Gerencie todas as fases do processo licitatório em uma plataforma intuitiva e poderosa."
                />
                <FeatureCard
                    delay={3}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1.5-1.5m1.5 1.5l1.5-1.5m0 0l-1.5 1.5m-7.5-9l1.5 1.5 1.5-1.5"></path></svg>}
                    title="Inteligência de Mercado"
                    description="Acesse dados e análises estratégicas para identificar as melhores oportunidades de negócio."
                />
                 <FeatureCard
                    delay={4}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path></svg>}
                    title="Capacitação e Treinamentos"
                    description="Capacite sua equipe com nossos cursos e treinamentos focados em licitações públicas."
                />
                 <FeatureCard
                    delay={5}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15.52 8.48a.75.75 0 10-1.04-1.04l-3.48 3.48-1.52-1.52a.75.75 0 00-1.04 1.04l2.04 2.04a.75.75 0 001.04 0l4-4z"></path></svg>}
                    title="Disputa de Licitações"
                    description="Conte com nossa equipe para representar sua empresa e operar lances em pregões eletrônicos."
                />
                 <FeatureCard
                    delay={6}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.153.274c-.473 0-.936-.086-1.383-.257L12 16.5l-2.62 3.528c-.447.17-.91.257-1.383.257a5.988 5.988 0 01-2.153-.274c-.483-.174-.711-.703-.59-1.202L9 4.971m-3-.52c-.99-.203-1.99-.377-3-.52M6 4.971l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.274c.473 0 .936-.086 1.383-.257L12 16.5l2.62 3.528c.447.17.91.257 1.383.257a5.989 5.989 0 002.153-.274c.483-.174.711-.703.59-1.202L15 4.971m-4.5 .47a48.416 48.416 0 015.25.045"></path></svg>}
                    title="Assessoria Jurídica"
                    description="Garanta a conformidade e segurança jurídica em todas as suas participações em licitações."
                />
            </div>
        </div>
    </AnimatedSection>
);

export default Features;
