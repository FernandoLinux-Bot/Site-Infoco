import AnimatedSection from './AnimatedSection';

const features = [
    {
        title: 'Consultoria Especializada',
        description: 'Navegue com segurança no universo das licitações com o suporte de nossos especialistas.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
        ),
    },
    {
        title: 'Sistema de Gestão',
        description: 'Gerencie todas as fases do processo licitatório em uma plataforma intuitiva e poderosa.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m-5-1.5l1 1.5m0 0l.5 1.5m-5-1.5l-.5 1.5m9-3l-3-4.5m0 0l-3 4.5m3-4.5V3" /></svg>
        ),
    },
    {
        title: 'Inteligência de Mercado',
        description: 'Acesse dados e análises estratégicas para identificar as melhores oportunidades de negócio.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>
        ),
    },
    {
        title: 'Capacitação e Treinamentos',
        description: 'Capacite sua equipe com nossos cursos e treinamentos focados em licitações públicas.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>
        ),
    },
    {
        title: 'Disputa de Licitações',
        description: 'Conte com nossa equipe para representar sua empresa e operar lances em pregões eletrônicos.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.474-4.474c-.048-.58-.026-1.193-.14-1.743m-2.14-2.14a4.5 4.5 0 00-4.474-4.474c-.58.048-1.193.026-1.743.14m4.474 4.474l-2.14 2.14M3 21l6.837-5.63" /></svg>
        ),
    },
    {
        title: 'Assessoria Jurídica',
        description: 'Garanta a conformidade e segurança jurídica em todas as suas participações em licitações.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.153.24c-1.119 0-2.235-.34-3.226-.954l-2.62-1.636m-5.24 4.532c1.119.614 2.107.954 3.226.954.812 0 1.598-.14 2.153-.24a1.448 1.448 0 00.589-1.202L18.75 4.971m-13.5 0c-1.01.143-2.01.317-3 .52m3-.52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.24c1.119 0 2.235-.34 3.226-.954l2.62-1.636" /></svg>
        ),
    },
];

const Features = () => (
    <AnimatedSection id="solucoes" className="features">
        <div className="container">
            <div className="features-head animated-item">
                <div>
                    <span className="eyebrow">02 — Portfólio</span>
                    <h2 className="section-title" style={{ marginTop: '1.5rem' }}>
                        Soluções para o <em>setor público</em>.
                    </h2>
                </div>
                <p className="section-subtitle">
                    Um portfólio completo para atender todas as esferas da administração pública e do mercado fornecedor. Da consultoria estratégica à disputa eletrônica.
                </p>
            </div>

            <div className="features-grid">
                {features.map((feature, index) => (
                    <div
                        className="feature-card animated-item"
                        key={feature.title}
                        style={{ transitionDelay: `${index * 60}ms` }}
                    >
                        <span className="feature-card-num">{String(index + 1).padStart(2, '0')} / 06</span>
                        <div className="feature-card-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

export default Features;
