import React from 'react';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import Stats from '../components/Stats';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import AnimatedSection from '../components/AnimatedSection';

const clients = [
    { name: 'Almadina', logo: '/clients/almadina.png' },
    { name: 'Itamaraju', logo: '/clients/itamaraju.png' },
    { name: 'Nova Viçosa', logo: '/clients/nova-vicosa.png' },
    { name: 'Itororó', logo: '/clients/itororo.png' },
    { name: 'Anagé', logo: '/clients/anage.png' },
    { name: 'Itabela', logo: '/clients/itabela.png' },
    { name: 'Prado', logo: '/clients/prado.png' },
];

const Home = () => {
    // Duplicate the clients array for a seamless scroll effect
    const extendedClients = [...clients, ...clients];

    return (
        <>
            <Hero />
            <VideoSection />
            <Stats />
            <Features />

            {/* Nova Seção com GIF Animado */}
            <AnimatedSection id="tecnologia" className="animated-banner-section">
                <div className="container">
                    <div className="animated-banner-grid">
                        <div className="animated-banner-content">
                            <h2 className="animated-item" style={{ transitionDelay: '200ms' }}>
                                Tecnologia que Transforma a Gestão Pública
                            </h2>
                            <p className="animated-item" style={{ transitionDelay: '300ms' }}>
                                Nossas soluções integram dados, automatizam processos e geram insights valiosos, permitindo que gestores públicos tomem decisões mais rápidas, seguras e com maior impacto social.
                            </p>
                            <a href="#solucoes" className="cta-link animated-item" style={{ transitionDelay: '400ms' }}>
                                Descubra Nossas Soluções
                            </a>
                        </div>
                        <div className="animated-banner-gif animated-item" style={{ transitionDelay: '100ms' }}>
                            <img src="/animated-banner.gif" alt="Animação de tecnologia para gestão pública" />
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            <HowItWorks />

            <AnimatedSection id="clients" className="clients-section">
                <div className="container">
                    <h2 className="section-title animated-item">Quem Confia na INFOCO</h2>
                    <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                        Temos a honra de servir a diversas entidades públicas, ajudando a construir uma gestão mais eficiente e transparente.
                    </p>
                    <div className="scroller animated-item" style={{ transitionDelay: '200ms' }} data-speed="slow">
                         <div className="scroller__inner">
                            {extendedClients.map((client, index) => (
                                <div className="client-logo" key={index}>
                                    <img src={client.logo} alt={`Brasão de ${client.name}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </>
    );
};

export default Home;
