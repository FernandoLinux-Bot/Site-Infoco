import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';

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
    const extendedClients = [...clients, ...clients];

    return (
        <>
            <Hero />
            <VideoSection />
            <Features />

            <AnimatedSection id="tecnologia" className="editorial-banner">
                <div className="container">
                    <div className="editorial-banner-grid">
                        <div className="animated-item">
                            <span className="eyebrow">Tecnologia</span>
                            <h2 style={{ marginTop: '1.5rem' }}>
                                Tecnologia que <em>transforma</em><br />a gestão pública.
                            </h2>
                            <p>
                                Nossas soluções integram dados, automatizam processos e geram insights valiosos, para que gestores tomem decisões mais rápidas, seguras e com maior impacto social.
                            </p>
                            <a href="#solucoes" className="cta-link">
                                Descobrir soluções →
                            </a>
                        </div>
                        <div className="editorial-banner-image animated-item" style={{ transitionDelay: '120ms' }}>
                            <TiltCard max={6} spotlight={false}>
                                <img src="/animated-banner.gif" alt="Animação de tecnologia para gestão pública" />
                            </TiltCard>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            <HowItWorks />

            <AnimatedSection id="clients" className="clients-section">
                <div className="container">
                    <div className="features-head animated-item">
                        <div>
                            <span className="eyebrow">Confiança</span>
                            <h2 className="section-title" style={{ marginTop: '1.5rem' }}>
                                Quem <em>confia</em> na INFOCO.
                            </h2>
                        </div>
                        <p className="section-subtitle">
                            Servimos diversas entidades públicas pelo Brasil, ajudando a construir uma gestão mais eficiente e transparente.
                        </p>
                    </div>
                    <div className="scroller animated-item" style={{ transitionDelay: '120ms' }}>
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
