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
    <AnimatedSection id="servicos" className="features">
        <div className="container">
            <h2 className="section-title animated-item">Nossos Serviços</h2>
            <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                Um portfólio completo de soluções para atender o setor público e privado em todas as esferas.
            </p>
            <div className="features-grid">
                <FeatureCard
                    delay={1}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375c.364 0 .728-.05 1.084-.148l.162-.045a13.435 13.435 0 006.187-3.415c.394-.362.775-.73.114-1.11a.75.75 0 00-1.298.74c-.002 0-.004.002-.005.003-.01.007-.02.014-.03.022a11.936 11.936 0 01-5.18 2.965.75.75 0 00-.533.74V18.375zM12 5.625c-.364 0-.728.05-1.084.148l-.162.045a13.435 13.435 0 00-6.187 3.415c-.394.362-.775.73-.114 1.11a.75.75 0 001.298-.74c.002 0 .004-.002.005-.003.01-.007.02-.014.03-.022a11.936 11.936 0 015.18-2.965.75.75 0 00.533-.74V5.625z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.735 14.126a.75.75 0 01.114-1.11 13.435 13.435 0 006.187-3.415L11.2 9.552a11.936 11.936 0 015.18 2.965c.01.008.02.015.03.022a.75.75 0 01-1.058.995 11.99 11.99 0 00-5.772-2.73.75.75 0 01-.533-.74V5.625a.75.75 0 01.75-.75h.375a.75.75 0 01.75.75v3.375c0 .414.336.75.75.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-3.375a.75.75 0 01-.75-.75V8.25a.75.75 0 01-.75-.75H8.25a.75.75 0 01-.75.75v1.838a.75.75 0 00.533.74c.77.16 1.52.38 2.23.654l-.5.866a.75.75 0 01-1.298-.74z" /></svg>}
                    title="Consultoria Especializada"
                    description="Navegue com segurança no universo das licitações com o suporte de nossos especialistas."
                />
                <FeatureCard
                    delay={2}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.5m3-1.5v1.5m3-1.5v1.5M9 5.25v1.5m3-1.5v1.5m3-1.5v1.5M5.25 9.75h1.5m-1.5 3h1.5m-1.5 3h1.5m10.5-9h-1.5m1.5 3h-1.5m1.5 3h-1.5M9 12l1.5 1.5 1.5-1.5M12 9l1.5 1.5 1.5-1.5M9 15l1.5 1.5 1.5-1.5M12 6l1.5 1.5 1.5-1.5" /></svg>}
                    title="Sistema de Gestão"
                    description="Gerencie todas as fases do processo licitatório em uma plataforma intuitiva e poderosa."
                />
                <FeatureCard
                    delay={3}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1.5-1.5m1.5 1.5l1.5-1.5m0 0l-1.5 1.5m-7.5-9l1.5 1.5 1.5-1.5" /></svg>}
                    title="Inteligência de Mercado"
                    description="Acesse dados e análises estratégicas para identificar as melhores oportunidades de negócio."
                />
                 <FeatureCard
                    delay={4}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>}
                    title="Capacitação e Treinamentos"
                    description="Capacite sua equipe com nossos cursos e treinamentos focados em licitações públicas."
                />
                 <FeatureCard
                    delay={5}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.52 8.48a.75.75 0 10-1.04-1.04l-3.48 3.48-1.52-1.52a.75.75 0 00-1.04 1.04l2.04 2.04a.75.75 0 001.04 0l4-4z" /></svg>}
                    title="Disputa de Licitações"
                    description="Conte com nossa equipe para representar sua empresa e operar lances em pregões eletrônicos."
                />
                 <FeatureCard
                    delay={6}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c.966 0 1.905.174 2.78.498l.18.067a13.435 13.435 0 016.187 3.415c.394.362.775.73.114 1.11a.75.75 0 01-1.298-.74c-.002 0-.004-.002-.005-.003-.01-.007-.02-.014-.03-.022a11.936 11.936 0 00-5.18-2.965.75.75 0 01-.533-.74V2.25zM4.735 7.43a.75.75 0 01.114-1.11 13.435 13.435 0 016.187-3.415l.18-.067A11.952 11.952 0 0112 2.25c.966 0 1.905.174 2.78.498l.18.067a13.435 13.435 0 016.187 3.415c.394.362.775.73.114 1.11a.75.75 0 01-1.298-.74c-.002 0-.004-.002-.005-.003-.01-.007-.02-.014-.03-.022a11.936 11.936 0 00-5.18-2.965.75.75 0 01-.533-.74V2.25a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v.328a.75.75 0 01-.533.74 11.936 11.936 0 00-5.18 2.965c-.01.008-.02.015-.03.022a.75.75 0 01-1.058.995z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12zm0-3a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12zm-3.375.75a.75.75 0 001.5 0V9h-1.5v.75zm6.75 0a.75.75 0 001.5 0V9h-1.5v.75z" /></svg>}
                    title="Assessoria Jurídica"
                    description="Garanta a conformidade e segurança jurídica em todas as suas participações em licitações."
                />
            </div>
        </div>
    </AnimatedSection>
);

export default Features;
