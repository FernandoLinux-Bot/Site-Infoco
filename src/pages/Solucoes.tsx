import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MODULOS, type Modulo } from '../data/sicc';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';

const GRUPOS = [
    { id: 'todos', label: 'Todos' },
    { id: 'planejamento', label: 'Planejamento' },
    { id: 'solicitacoes', label: 'Solicitações' },
    { id: 'execucao', label: 'Execução' },
    { id: 'transparencia', label: 'Transparência' },
] as const;

type GrupoId = typeof GRUPOS[number]['id'];

const ModuloCard = ({ m }: { m: Modulo }) => (
    <article className="util-card" id={m.id} style={{ height: '100%', scrollMarginTop: 140 }}>
        <span className="card-index">{m.resumo}</span>
        <h3 className="t-tagline" style={{ fontFamily: 'var(--font-display)' }}>{m.nome}</h3>
        <p>{m.descricao}</p>
        <ul className="feature-list">
            {m.destaques.map(d => <li key={d}>{d}</li>)}
        </ul>
        {m.fundamento && (
            <div className="util-card-foot">
                <span className="chip chip--action">{m.fundamento}</span>
            </div>
        )}
    </article>
);

const Solucoes = () => {
    const [grupo, setGrupo] = useState<GrupoId>('todos');
    const lista = grupo === 'todos' ? MODULOS : MODULOS.filter(m => m.grupo === grupo);

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
                        Módulos do SICC
                    </motion.span>
                    <h1 className="t-hero">
                        <WordReveal text={`${MODULOS.length} módulos.`} />{' '}
                        <em><WordReveal text="Um cadastro." delay={0.15} /></em>
                    </h1>
                    <motion.p
                        className="t-lead hero-sub"
                        style={{ maxWidth: '44ch' }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }}
                    >
                        O objeto cadastrado no plano anual é o mesmo do estudo, da cotação,
                        do edital e do contrato. Nada é redigitado no caminho.
                    </motion.p>
                </div>
            </section>

            <section className="tile tile--parchment" style={{ paddingBlock: 'var(--s-xl)' }}>
                <div className="container container-mid" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="tabs" role="tablist" aria-label="Filtrar módulos por grupo">
                        {GRUPOS.map(g => (
                            <button
                                key={g.id}
                                role="tab"
                                aria-selected={grupo === g.id}
                                className={`tab${grupo === g.id ? ' is-active' : ''}`}
                                onClick={() => setGrupo(g.id)}
                            >
                                {grupo === g.id && (
                                    <motion.span
                                        layoutId="tab-pill"
                                        className="tab-pill"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                {g.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="tile tile--light" style={{ paddingTop: 'var(--s-xl)' }}>
                <div className="container container-mid">
                    <motion.div layout className="grid grid-3">
                        <AnimatePresence mode="popLayout">
                            {lista.map(m => (
                                <motion.div
                                    key={m.id}
                                    layout
                                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                    transition={{ duration: 0.45, ease: EASE_EXPO }}
                                >
                                    <ModuloCard m={m} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <section className="tile tile--dark on-dark">
                <div className="container container-mid">
                    <Reveal>
                        <div className="tile-head">
                            <span className="eyebrow">Integração</span>
                            <h2 className="t-display">O que sai do SICC já sai publicado.</h2>
                            <p className="t-body">
                                Publicação no Portal Nacional de Contratações Públicas e envio ao SIGA do
                                Tribunal de Contas dos Municípios da Bahia a partir dos mesmos dados.
                            </p>
                        </div>
                    </Reveal>
                    <Stagger className="grid grid-2" staggerChildren={0.08}>
                        <StaggerItem>
                            <div className="util-card util-card--dark" style={{ height: '100%' }}>
                                <span className="card-index" style={{ color: 'var(--primary-on-dark)' }}>Federal</span>
                                <h3>PNCP</h3>
                                <p>
                                    Sincronização do plano anual e das unidades, com indicador de publicação
                                    visível no próprio cartão do PCA e selo no contrato.
                                </p>
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="util-card util-card--dark" style={{ height: '100%' }}>
                                <span className="card-index" style={{ color: 'var(--primary-on-dark)' }}>Estadual</span>
                                <h3>SIGA / TCM-BA</h3>
                                <p>
                                    Envio ao Tribunal de Contas dos Municípios da Bahia sem redigitação,
                                    a partir do contrato já cadastrado no sistema.
                                </p>
                            </div>
                        </StaggerItem>
                    </Stagger>
                </div>
            </section>

            <section className="tile tile--light">
                <div className="container container-narrow" style={{ textAlign: 'center' }}>
                    <Reveal>
                        <h2 className="t-display">Cada módulo tem uma tela e um responsável.</h2>
                        <p className="t-lead" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                            Veja o ciclo completo de uma demanda, da abertura ao contrato.
                        </p>
                        <div className="cta-row cta-row--center">
                            <Link to="/sicc" className="btn btn-store">Ver o fluxo do SICC</Link>
                            <Link to="/contato" className="btn btn-secondary">Falar com a INFOCO</Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
};

export default Solucoes;
