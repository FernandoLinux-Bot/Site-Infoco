import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_EXPO, WordReveal, useParallax } from './motion';

const PLATAFORMA = 'https://app2.infocolicitacoes.com.br/cadastro/';

/**
 * O painel é uma representação desenhada do kanban de Demandas do SICC
 * (colunas "Em Elaboração" e "Em Contratação", cartões com P.ADM, selos e
 * status). Nenhuma captura de tela do sistema é usada.
 */
const emElaboracao = [
    { num: '081403/2026', obj: 'Notebooks para as secretarias escolares', selos: ['SRP', 'DFD 12'], status: 'Em Cotação de Preços', unidade: 'SECE', itens: '14 itens' },
    { num: '081418/2026', obj: 'Medicamentos da atenção básica', selos: ['PCA 2026'], status: 'Em Análise Jurídica', unidade: 'SS', itens: '86 itens' },
    { num: '081422/2026', obj: 'Manutenção predial das unidades', selos: ['DFD 31'], status: 'Em Elaboração do ETP', unidade: 'STOSP', itens: '9 itens' },
];

const emContratacao = [
    { num: '081377/2026', obj: 'Gêneros alimentícios — merenda escolar', selos: ['SRP', 'PCA 2026'], status: 'Enviado para Licitação', unidade: 'SECE', itens: '52 itens' },
    { num: '081390/2026', obj: 'Locação de veículos leves', selos: ['DFD 08'], status: 'Aguardando Autuação', unidade: 'SAP', itens: '6 itens' },
];

const Card = ({ d, delay }: { d: typeof emElaboracao[number]; delay: number }) => (
    <motion.div
        className="sicc-card"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay }}
    >
        <div className="sicc-card-top">
            <span className="sicc-num">P.ADM {d.num}</span>
            <span style={{ display: 'flex', gap: 4 }}>
                {d.selos.map(s => <span className="chip chip--muted" key={s}>{s}</span>)}
            </span>
        </div>
        <p className="sicc-obj">{d.obj}</p>
        <div className="sicc-meta">
            <span>{d.unidade}</span>
            <span>{d.itens}</span>
        </div>
        <div style={{ marginTop: 10 }}>
            <span className="chip chip--action">{d.status}</span>
        </div>
    </motion.div>
);

const Hero = () => {
    const reduce = useReducedMotion();
    const { ref, y } = useParallax(28);

    return (
        <section className="tile tile--light hero">
            <div className="container">
                <motion.span
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                >
                    SICC · Sistema Integrado de Compras e Contratações
                </motion.span>

                <h1 className="t-hero">
                    <WordReveal text="Do plano anual ao contrato assinado." />{' '}
                    <em><WordReveal text="Em um cadastro só." delay={0.18} /></em>
                </h1>

                <motion.p
                    className="t-lead hero-sub"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.45 }}
                >
                    PCA, ETP, mapa de riscos, cotação, licitação, contrato e prestação de contas.
                    O ciclo inteiro da Lei 14.133/2021 sem redigitar nada.
                </motion.p>

                <motion.div
                    className="cta-row"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.58 }}
                >
                    <Link to="/sicc" className="btn btn-primary">Conhecer o SICC</Link>
                    <a className="btn btn-secondary" href={PLATAFORMA} target="_blank" rel="noopener noreferrer">
                        Acessar o sistema
                    </a>
                </motion.div>

                <div className="hero-stage" ref={ref}>
                    <motion.div
                        style={reduce ? undefined : { y }}
                        initial={{ opacity: 0, y: 48, rotateX: reduce ? 0 : 7 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.5 }}
                    >
                        <div className="sicc-panel">
                            <div className="sicc-panel-bar">
                                <span className="dot" /><span className="dot" /><span className="dot" />
                                <span className="label">SICC · Planejamento → Demandas</span>
                            </div>
                            <div className="sicc-panel-body">
                                <div className="sicc-col">
                                    <div className="sicc-col-head">
                                        <span>Em Elaboração</span>
                                        <span>{emElaboracao.length}</span>
                                    </div>
                                    {emElaboracao.map((d, i) => (
                                        <Card key={d.num} d={d} delay={0.9 + i * 0.12} />
                                    ))}
                                </div>
                                <div className="sicc-col">
                                    <div className="sicc-col-head">
                                        <span>Em Contratação</span>
                                        <span>{emContratacao.length}</span>
                                    </div>
                                    {emContratacao.map((d, i) => (
                                        <Card key={d.num} d={d} delay={1.05 + i * 0.12} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
