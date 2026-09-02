import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal, useParallax } from '../components/motion';

const VALORES = [
    { t: 'Ética e transparência', d: 'Responsabilidade e clareza em todas as relações, fortalecendo a confiança entre a gestão pública e a sociedade.' },
    { t: 'Inovação com propósito', d: 'Tecnologia que simplifica processos e gera impacto social — não tecnologia pela tecnologia.' },
    { t: 'Compromisso com o cliente', d: 'Parceria estratégica com o gestor público, com suporte próximo, personalizado e contínuo.' },
    { t: 'Excelência e qualidade', d: 'Software seguro, moderno e eficiente, mantido no ritmo em que a legislação muda.' },
    { t: 'Valorização das pessoas', d: 'Colaboradores, clientes e cidadãos como protagonistas da transformação pública.' },
    { t: 'Responsabilidade social', d: 'Cada melhoria na gestão pública se reflete diretamente na qualidade de vida da população.' },
];

const Institucional = () => {
    const { ref, y } = useParallax(30);

    return (
        <>
            <section className="tile tile--light hero">
                <div className="container container-narrow">
                    <motion.span
                        className="eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE_EXPO }}
                    >
                        Institucional
                    </motion.span>
                    <h1 className="t-hero">
                        <WordReveal text="Software para quem responde" />{' '}
                        <em><WordReveal text="pelo dinheiro público." delay={0.15} /></em>
                    </h1>
                    <motion.p
                        className="t-lead hero-sub"
                        style={{ maxWidth: '44ch' }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }}
                    >
                        A INFOCO Gestão Pública é uma empresa de Itabuna, na Bahia, que desenvolve
                        sistemas para prefeituras, câmaras e consórcios.
                    </motion.p>
                </div>
            </section>

            <section className="tile tile--parchment" ref={ref}>
                <div className="container container-mid">
                    <div className="split split--wide">
                        <Reveal>
                            <div>
                                <span className="eyebrow">Quem somos</span>
                                <h2 className="t-display">Perto de quem executa.</h2>
                                <p className="t-body" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                                    A INFOCO nasceu no interior da Bahia atendendo municípios que precisavam
                                    cumprir a lei com equipes pequenas e prazos curtos. Essa origem definiu o
                                    produto: um sistema que não pressupõe um departamento de licitações
                                    grande, e um suporte que conhece o nome de quem liga.
                                </p>
                                <p className="t-body" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                                    Quando a Lei 14.133/2021 entrou em vigor, o SICC foi reescrito em torno
                                    dela — PCA, DFD, ETP, mapa de riscos e a tramitação por fases não são
                                    módulos adicionados depois, são o desenho do sistema.
                                </p>
                                <div className="cta-row">
                                    <Link to="/sicc" className="link-action">
                                        Conhecer o SICC <span className="chev">›</span>
                                    </Link>
                                </div>
                            </div>
                        </Reveal>

                        <motion.div style={{ y }}>
                            <Reveal delay={0.1}>
                                <img
                                    src="/patrao.png"
                                    alt="Fundador da INFOCO Gestão Pública"
                                    className="product-shadow"
                                    style={{ width: '100%', maxWidth: 420, marginInline: 'auto' }}
                                    loading="lazy"
                                />
                            </Reveal>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="tile tile--dark on-dark">
                <div className="container container-narrow" style={{ textAlign: 'center' }}>
                    <Reveal>
                        <span className="eyebrow">Nossa meta</span>
                        <h2 className="t-display">
                            Que a conformidade deixe de ser um esforço e passe a ser
                            <em> o caminho natural do processo</em>.
                        </h2>
                        <p className="t-lead-airy" style={{ marginTop: 'var(--s-lg)', color: 'var(--body-muted)' }}>
                            Um servidor não deveria precisar decorar a lei para cumpri-la. O sistema é
                            que deveria conduzir o processo pelo caminho certo — e recusar o atalho errado.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="tile tile--light">
                <div className="container container-mid">
                    <Reveal>
                        <div className="tile-head">
                            <span className="eyebrow">Valores</span>
                            <h2 className="t-display">O que orienta a decisão quando ninguém está olhando.</h2>
                        </div>
                    </Reveal>
                    <Stagger className="grid grid-3" staggerChildren={0.06}>
                        {VALORES.map(v => (
                            <StaggerItem key={v.t}>
                                <div className="util-card" style={{ height: '100%' }}>
                                    <h3>{v.t}</h3>
                                    <p>{v.d}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <section className="tile tile--parchment">
                <div className="container container-narrow" style={{ textAlign: 'center' }}>
                    <Reveal>
                        <h2 className="t-display">Fale com quem desenvolve.</h2>
                        <p className="t-lead" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                            Itabuna, Bahia. Atendimento a municípios de todo o estado.
                        </p>
                        <div className="cta-row cta-row--center">
                            <Link to="/contato" className="btn btn-store">Entrar em contato</Link>
                            <Link to="/trabalhe-conosco" className="btn btn-secondary">Trabalhe conosco</Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
};

export default Institucional;
