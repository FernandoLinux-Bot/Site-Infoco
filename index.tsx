/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// --- Reusable Hooks ---

/**
 * Custom hook to detect when an element is visible in the viewport.
 * @param {object} options - IntersectionObserver options.
 * @returns {[Function, boolean]} - A ref setter function and a boolean indicating visibility.
 */
// Fix: Add explicit types to the custom hook to resolve type inference issues.
// This ensures that the returned array is treated as a tuple, correctly typing the ref setter and the visibility boolean.
// The hook's implementation is also simplified and made more robust.
const useIntersectionObserver = (options: IntersectionObserverInit): [React.Dispatch<React.SetStateAction<Element | null>>, boolean] => {
    const [element, setElement] = useState<Element | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(element);
            }
        }, options);

        observer.observe(element);

        return () => observer.disconnect();
    }, [element, options]);

    return [setElement, isVisible];
};


// --- UI Components ---

const Dropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li
            className="nav-item dropdown"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                {title}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </a>
            {isOpen && (
                <ul className="dropdown-menu">
                    {children}
                </ul>
            )}
        </li>
    );
};

const DropdownItem = ({ href, children }) => (
    <li><a href={href} className="dropdown-item">{children}</a></li>
);


const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="app-header">
            <div className="container nav-container">
                <a href="#inicio" className="logo">INFOCO LICITAÇÕES</a>
                <nav className={isMobileMenuOpen ? 'nav-open' : ''}>
                    <ul className="nav-links">
                        <Dropdown title="Comprador">
                            <DropdownItem href="#">Ente Público</DropdownItem>
                            <DropdownItem href="#">Estatais</DropdownItem>
                            <DropdownItem href="#">Sistema S</DropdownItem>
                        </Dropdown>
                        <li><a href="#" className="nav-link">Fornecedor</a></li>
                        <li><a href="#" className="nav-link">Marketplace</a></li>
                        <li><a href="#solucoes" className="nav-link">Serviços</a></li>
                        <Dropdown title="Cadastrar">
                            <DropdownItem href="#">Comprador</DropdownItem>
                            <DropdownItem href="#">Fornecedor</DropdownItem>
                            <DropdownItem href="#">Cidadão</DropdownItem>
                        </Dropdown>
                        <li><a href="#contato" className="nav-link">Contato</a></li>
                    </ul>
                </nav>
                 <a href="#" className="cta-button desktop-cta">
                    Acessar Plataforma
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </a>
                <button 
                    className="hamburger-menu" 
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Abrir menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span/><span/><span/>
                </button>
            </div>
        </header>
    );
};

const Hero = () => (
  <section id="inicio" className="hero">
    <div className="container animated-item">
      <h1>Acelere seus resultados com nossas soluções</h1>
      <p>Nós transformamos a complexidade em simplicidade, impulsionando o crescimento do seu negócio com tecnologia de ponta.</p>
      <a href="#contato" className="cta-button">Comece Agora</a>
    </div>
  </section>
);

const AnimatedSection = ({ id, className, children }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <section ref={ref} id={id} className={`${className} ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </section>
    );
};


const FeatureCard = ({ icon, title, description, delay }) => (
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

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

    useEffect(() => {
        ref(elementRef.current);
    }, [ref]);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const startTime = Date.now();
        const step = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            setCount(currentCount);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end); // Ensure it ends on the exact number
            }
        };
        requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return <span ref={elementRef} className="stat-number">{count.toLocaleString('pt-BR')}</span>;
};

const Stats = () => (
    <AnimatedSection id="numeros" className="stats">
        <div className="container">
            <div className="stats-grid">
                <div className="stat-item animated-item" style={{ transitionDelay: '100ms' }}>
                    <CountUp end={150} />+
                    <p>Milhões em Negócios</p>
                </div>
                <div className="stat-item animated-item" style={{ transitionDelay: '200ms' }}>
                    <CountUp end={5000} />+
                    <p>Clientes Satisfeitos</p>
                </div>
                <div className="stat-item animated-item" style={{ transitionDelay: '300ms' }}>
                    <CountUp end={10} />+
                    <p>Anos de Mercado</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

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

const Footer = () => (
    <footer className="app-footer">
        <div className="container footer-container">
            <ul className="footer-links">
                <li><a href="#inicio">Início</a></li>
                <li><a href="#solucoes">Soluções</a></li>
                <li><a href="#como-funciona">Como Funciona</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
            <p>&copy; {new Date().getFullYear()} INFOCO LICITAÇÕES. Todos os direitos reservados.</p>
        </div>
    </footer>
);

const WhatsAppButton = () => (
    <a
      href="https://wa.me/5511999999999"
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-26.7l-7.1-4.2-72.2 18.9L93 357.2l-4.5-7.3C65.3 318.8 50 282.6 50 245c0-95.3 77.2-172.5 172.4-172.5 46.3 0 89.8 17.9 122.4 50.4 32.6 32.6 50.4 76.1 50.4 122.5 0 95.3-77.2 172.5-172.4 172.5zm88.3-199.2c-3.8-8.3-17.7-7.3-21.5-1.5l-28.2 44.5c-1.4 2.2-4.2 3.1-6.7 2.1-12.8-5.3-24.1-12.7-33.8-21.8s-17-19.8-22.9-31.5c-1.1-2.4-.2-5.3 1.8-6.9l43.2-34.3c5.3-4.2 6.1-11.8 1.9-17.1l-22.7-29.3c-4.9-6.3-13.8-7.9-20.3-3.2l-33.3 23.6c-6.8 4.8-10.2 12.8-9.4 20.8 1.4 14.5 9.4 35.8 28.1 58.3 18.8 22.5 43.1 38.6 66.8 44.9 8.1 2.2 16.5 1.4 23.7-2.1l34.8-24.8c6.1-4.3 8.3-12.3 5.3-18.7l-26.5-44.2z"/>
      </svg>
    </a>
);

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button 
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    );
};


const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
