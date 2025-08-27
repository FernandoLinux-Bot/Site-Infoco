import React from 'react';
import AnimatedSection from './AnimatedSection';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
    <div className="feature-card animated-item" style={{ transitionDelay: `${delay * 100}ms` }}>
        {icon}
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

const Features = () => (
    <AnimatedSection id="solucoes" className="features">
        <div className="container">
            <h2 className="section-title animated-item">Nossas Soluções</h2>
            <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                Oferecemos um portfólio completo de soluções para atender às necessidades específicas da sua empresa.
            </p>
            <div className="features-grid">
                <FeatureCard
                    delay={1}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" /></svg>}
                    title="Análise Inteligente"
                    description="Utilize o poder dos dados para tomar decisões mais assertivas e estratégicas."
                />
                <FeatureCard
                    delay={2}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>}
                    title="Segurança Robusta"
                    description="Proteja seus ativos mais valiosos com nossa infraestrutura de segurança de última geração."
                />
                <FeatureCard
                    delay={3}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    title="Automação de Processos"
                    description="Otimize o tempo e reduza custos operacionais automatizando tarefas repetitivas."
                />
            </div>
        </div>
    </AnimatedSection>
);

export default Features;
