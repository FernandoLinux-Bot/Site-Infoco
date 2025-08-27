import React from 'react';
import AnimatedSection from './AnimatedSection';

const HowItWorks = () => (
    <AnimatedSection id="como-funciona" className="how-it-works">
        <div className="container">
            <h2 className="section-title animated-item">Como Funciona</h2>
            <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                Nossa plataforma simplifica o complexo mundo das licitações em três passos simples.
            </p>
            <div className="how-it-works-grid">
                <div className="step-card animated-item" style={{ transitionDelay: '200ms' }}>
                    <div className="step-number">1</div>
                    <h3>Cadastre-se</h3>
                    <p>Crie sua conta em minutos e tenha acesso a milhares de oportunidades.</p>
                </div>
                 <div className="step-card animated-item" style={{ transitionDelay: '300ms' }}>
                    <div className="step-number">2</div>
                    <h3>Encontre Licitações</h3>
                    <p>Utilize nossos filtros inteligentes para encontrar as melhores licitações para o seu negócio.</p>
                </div>
                 <div className="step-card animated-item" style={{ transitionDelay: '400ms' }}>
                    <div className="step-number">3</div>
                    <h3>Envie sua Proposta</h3>
                    <p>Participe dos certames de forma segura e aumente suas chances de ganhar.</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

export default HowItWorks;
