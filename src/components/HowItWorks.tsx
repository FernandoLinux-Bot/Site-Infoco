import AnimatedSection from './AnimatedSection';

const steps = [
    {
        title: 'Cadastre-se',
        description: 'Crie sua conta em minutos e tenha acesso a milhares de oportunidades em todo o país.',
    },
    {
        title: 'Encontre Licitações',
        description: 'Utilize filtros inteligentes para encontrar as licitações que realmente importam para o seu negócio.',
    },
    {
        title: 'Envie sua Proposta',
        description: 'Participe dos certames de forma segura e aumente suas chances de fechar grandes negócios.',
    },
];

const HowItWorks = () => (
    <AnimatedSection id="como-funciona" className="how-it-works">
        <div className="container">
            <div className="features-head animated-item">
                <div>
                    <span className="eyebrow">04 — Processo</span>
                    <h2 className="section-title" style={{ marginTop: '1.5rem' }}>
                        Como <em>funciona</em>.
                    </h2>
                </div>
                <p className="section-subtitle">
                    Três passos para transformar a forma como sua empresa participa de licitações públicas — sem burocracia, com tecnologia.
                </p>
            </div>

            <div className="how-it-works-grid">
                {steps.map((step, index) => (
                    <div className="step-card animated-item" key={step.title} style={{ transitionDelay: `${index * 80}ms` }}>
                        <span className="step-num">0{index + 1}</span>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

export default HowItWorks;
