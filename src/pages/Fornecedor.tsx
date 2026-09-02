import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';

const PLATAFORMA = 'https://app2.infocolicitacoes.com.br/cadastro/';

const BENEFICIOS = [
    { t: 'Oportunidades reunidas', d: 'Acompanhe as licitações dos municípios que operam no SICC em um lugar só, sem caçar edital em diário oficial.' },
    { t: 'Cadastro único', d: 'Um cadastro de fornecedor vale para todos os órgãos atendidos — razão social, CNPJ, porte e representantes.' },
    { t: 'Disputa eletrônica', d: 'Participe das sessões pela plataforma, com o histórico de lances e a ata registrados.' },
    { t: 'Contratos e saldos', d: 'Acompanhe os contratos firmados, o valor utilizado e o saldo remanescente de cada item.' },
    { t: 'Cotações', d: 'Responda às pesquisas de preços que alimentam o planejamento dos municípios.' },
    { t: 'Publicidade oficial', d: 'O que é contratado é publicado no PNCP e enviado ao TCM-BA a partir do mesmo processo.' },
];

const Fornecedor = () => {
    const navigate = useNavigate();

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
                        Fornecedores
                    </motion.span>
                    <h1 className="t-hero">
                        <WordReveal text="Venda para o poder público" />{' '}
                        <em><WordReveal text="sem procurar edital." delay={0.15} /></em>
                    </h1>
                    <motion.p
                        className="t-lead hero-sub"
                        style={{ maxWidth: '42ch' }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }}
                    >
                        Um cadastro que vale para todos os municípios atendidos pela INFOCO.
                    </motion.p>
                    <motion.div
                        className="cta-row cta-row--center"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.52 }}
                    >
                        <button className="btn btn-store" onClick={() => navigate('/cadastro')}>
                            Solicitar cadastro
                        </button>
                        <a className="btn btn-secondary" href={PLATAFORMA} target="_blank" rel="noopener noreferrer">
                            Já tenho conta
                        </a>
                    </motion.div>
                </div>
            </section>

            <section className="tile tile--dark on-dark">
                <div className="container container-mid">
                    <Reveal>
                        <div className="tile-head">
                            <span className="eyebrow">O que você ganha</span>
                            <h2 className="t-display">Do edital ao saldo do contrato.</h2>
                        </div>
                    </Reveal>
                    <Stagger className="grid grid-3" staggerChildren={0.06}>
                        {BENEFICIOS.map(b => (
                            <StaggerItem key={b.t}>
                                <div className="util-card util-card--dark" style={{ height: '100%' }}>
                                    <h3>{b.t}</h3>
                                    <p>{b.d}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <section className="tile tile--parchment">
                <div className="container container-narrow" style={{ textAlign: 'center' }}>
                    <Reveal>
                        <h2 className="t-display">Comece pelo cadastro.</h2>
                        <p className="t-lead" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                            Envie a solicitação e a INFOCO conclui a habilitação do seu acesso.
                        </p>
                        <div className="cta-row cta-row--center">
                            <button className="btn btn-store" onClick={() => navigate('/cadastro')}>
                                Solicitar cadastro
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
};

export default Fornecedor;
