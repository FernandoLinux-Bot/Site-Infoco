import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';

const PROFILE_URL = 'https://www.instagram.com/infocogestaopublica/';
const HANDLE = '@infocogestaopublica';

/**
 * Índice editorial dos temas publicados no Instagram da INFOCO.
 * Cada cartão leva ao perfil — o conteúdo vive lá, não aqui.
 */
const TEMAS = [
    { tema: 'Lei 14.133/2021', titulo: 'O que muda na contratação pública e como o SICC acompanha a mudança.' },
    { tema: 'Planejamento', titulo: 'PCA e DFD: como planejar o exercício sem travar a execução.' },
    { tema: 'Pesquisa de preços', titulo: 'Cotação, média e a trilha que sustenta o valor estimado.' },
    { tema: 'Estudo técnico', titulo: 'ETP na prática: do problema identificado à declaração de viabilidade.' },
    { tema: 'Riscos', titulo: 'Mapa de riscos e a matriz de impacto e probabilidade.' },
    { tema: 'Execução', titulo: 'Saldo, aditivo e apostilamento: o que cada um resolve.' },
    { tema: 'Integrações', titulo: 'PNCP e SIGA/TCM-BA a partir do mesmo cadastro.' },
    { tema: 'Treinamentos', titulo: 'A equipe INFOCO nas unidades, formando quem opera o sistema.' },
    { tema: 'Municípios', titulo: 'Como as prefeituras atendidas conduzem suas contratações.' },
];

const Noticias = () => (
    <>
        <section className="tile tile--light hero">
            <div className="container container-narrow">
                <motion.span
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                >
                    Notícias
                </motion.span>
                <h1 className="t-hero">
                    <WordReveal text="O que a INFOCO" />{' '}
                    <em><WordReveal text="publica." delay={0.15} /></em>
                </h1>
                <motion.p
                    className="t-lead hero-sub"
                    style={{ maxWidth: '40ch' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }}
                >
                    Conteúdo sobre gestão pública, legislação e o dia a dia do SICC — publicado
                    no Instagram {HANDLE}.
                </motion.p>
                <motion.div
                    className="cta-row cta-row--center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.52 }}
                >
                    <a className="btn btn-store" href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
                        <FaInstagram aria-hidden="true" /> Seguir no Instagram
                    </a>
                </motion.div>
            </div>
        </section>

        <section className="tile tile--parchment">
            <div className="container container-mid">
                <Reveal>
                    <div className="tile-head">
                        <span className="eyebrow">Temas</span>
                        <h2 className="t-display">O que costuma aparecer por lá.</h2>
                    </div>
                </Reveal>

                <Stagger className="grid grid-3" staggerChildren={0.05}>
                    {TEMAS.map(t => (
                        <StaggerItem key={t.titulo}>
                            <a
                                className="util-card"
                                href={PROFILE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ height: '100%', textDecoration: 'none', color: 'inherit' }}
                            >
                                <span className="card-index">{t.tema}</span>
                                <h3>{t.titulo}</h3>
                                <div className="util-card-foot">
                                    <span className="link-action" style={{ fontSize: 14 }}>
                                        Ver no Instagram <span className="chev">›</span>
                                    </span>
                                </div>
                            </a>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>

        <section className="tile tile--dark on-dark">
            <div className="container container-narrow" style={{ textAlign: 'center' }}>
                <Reveal>
                    <h2 className="t-display">Acompanhe {HANDLE}.</h2>
                    <p className="t-lead-airy" style={{ marginTop: 'var(--s-md)', color: 'var(--body-muted)' }}>
                        Avisos de atualização do sistema, mudanças na legislação e os treinamentos
                        que a equipe conduz nas unidades.
                    </p>
                    <div className="cta-row cta-row--center">
                        <a className="btn btn-primary" href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
                            Abrir o perfil
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    </>
);

export default Noticias;
