import AnimatedSection from './AnimatedSection';
import { FaHandshake, FaLayerGroup, FaChartLine, FaGraduationCap, FaGavel, FaBalanceScale } from 'react-icons/fa';

const features = [
    {
        title: 'Consultoria Especializada',
        description: 'Navegue com segurança no universo das licitações com o suporte de nossos especialistas.',
        icon: <FaHandshake />,
    },
    {
        title: 'Sistema de Gestão',
        description: 'Gerencie todas as fases do processo licitatório em uma plataforma intuitiva e poderosa.',
        icon: <FaLayerGroup />,
    },
    {
        title: 'Inteligência de Mercado',
        description: 'Acesse dados e análises estratégicas para identificar as melhores oportunidades de negócio.',
        icon: <FaChartLine />,
    },
    {
        title: 'Capacitação e Treinamentos',
        description: 'Capacite sua equipe com nossos cursos e treinamentos focados em licitações públicas.',
        icon: <FaGraduationCap />,
    },
    {
        title: 'Disputa de Licitações',
        description: 'Conte com nossa equipe para representar sua empresa e operar lances em pregões eletrônicos.',
        icon: <FaGavel />,
    },
    {
        title: 'Assessoria Jurídica',
        description: 'Garanta a conformidade e segurança jurídica em todas as suas participações em licitações.',
        icon: <FaBalanceScale />,
    },
];

// Move o spotlight (via CSS vars) sem re-render nem conflito com o transform do reveal.
const trackPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
};

const Features = () => (
    <AnimatedSection id="solucoes" className="features">
        <div className="container">
            <div className="features-head animated-item">
                <div>
                    <span className="eyebrow">Portfólio</span>
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
                        className="feature-card spotlight animated-item"
                        key={feature.title}
                        onMouseMove={trackPointer}
                        style={{ transitionDelay: `${index * 60}ms` }}
                    >
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
