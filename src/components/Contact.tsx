import React from 'react';
import AnimatedSection from './AnimatedSection';

const Contact = () => (
    <AnimatedSection id="contato" className="contact">
        <div className="container">
            <h2 className="section-title animated-item">Entre em Contato</h2>
            <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                Estamos prontos para ajudar. Fale com um de nossos especialistas e descubra como podemos transformar seu negócio.
            </p>
            <div className="contact-content animated-item" style={{ transitionDelay: '200ms' }}>
                <a href="mailto:contato@infocolicitacoes.com.br" className="cta-button">Enviar um E-mail</a>
            </div>
        </div>
    </AnimatedSection>
);

export default Contact;
