import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AnimatePresence,
    motion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from 'framer-motion';
import { CICLO_DEMANDA, PERGUNTAS } from '../data/sicc';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, VIEWPORT, WordReveal } from '../components/motion';
import { CONHECER } from '../data/links';


/* ---------------------------------------------------------------- Hero --- */
const SiccHero = () => (
    <section className="tile tile--light hero">
        <div className="container container-narrow">
            <motion.span
                className="eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
                SICC
            </motion.span>
            <h1 className="t-hero">
                <WordReveal text="Sistema Integrado de" />{' '}
                <em><WordReveal text="Compras e Contratações" delay={0.15} /></em>
            </h1>
            <motion.p
                className="t-lead hero-sub"
                style={{ maxWidth: '46ch' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }}
            >
                O sistema que a INFOCO desenvolve para prefeituras, câmaras e consórcios
                conduzirem a contratação pública inteira sob a Lei 14.133/2021.
            </motion.p>
            <motion.div
                className="cta-row cta-row--center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.52 }}
            >
                <a className="btn btn-store" href={CONHECER} target="_blank" rel="noopener noreferrer">
                    Ver o sistema por dentro
                </a>
                <Link to="/solucoes" className="btn btn-secondary">Ver os módulos</Link>
            </motion.div>
        </div>
    </section>
);

/* --------------------------------------------------------------- Fluxo --- */
const FlowStep = ({
    fase,
    detalhe,
    index,
    total,
    progress,
}: {
    fase: string;
    detalhe: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) => {
    const scaleX = useTransform(progress, [index / total, (index + 1) / total], [0, 1], { clamp: true });
    return (
        <motion.div
            className="flow-step"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE_EXPO, delay: index * 0.06 }}
        >
            <motion.span className="flow-rule" style={{ scaleX, width: '100%' }} aria-hidden="true" />
            <span className="flow-n">Fase {String(index + 1).padStart(2, '0')}</span>
            <h3>{fase}</h3>
            <p>{detalhe}</p>
        </motion.div>
    );
};

const Fluxo = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

    return (
        <section className="tile tile--dark on-dark" id="fluxo">
            <div className="container container-mid">
                <Reveal>
                    <div className="tile-head">
                        <span className="eyebrow">Ciclo de vida</span>
                        <h2 className="t-display">Seis fases entre a necessidade e o contrato.</h2>
                        <p className="t-body">
                            Uma demanda percorre o mesmo caminho em todo município. O sistema não deixa
                            pular etapa, e o histórico de cada movimentação fica registrado.
                        </p>
                    </div>
                </Reveal>

                <div className="flow" ref={ref}>
                    {CICLO_DEMANDA.map((f, i) => (
                        <FlowStep
                            key={f.fase}
                            fase={f.fase}
                            detalhe={f.detalhe}
                            index={i}
                            total={CICLO_DEMANDA.length}
                            progress={progress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------------------------------- Tramitação --- */
const ACOES = [
    { grupo: 'Andamento', itens: ['Análise Orçamentária', 'Controle Interno', 'Análise Jurídica', 'Análise Técnica', 'Cotação', 'Mapa de Riscos', 'Autoridade', 'Revisão Interna'] },
    { grupo: 'Iniciar Contratação', itens: ['Licitação', 'Contratação Direta'] },
    { grupo: 'Outras ações', itens: ['Retornar para elaboração', 'Cancelar demanda', 'Excluir demanda'] },
];

const Tramitacao = () => (
    <section className="tile tile--parchment">
        <div className="container container-mid">
            <div className="split split--wide">
                <Reveal>
                    <div>
                        <span className="eyebrow">Tramitação</span>
                        <h2 className="t-display">O menu de ações é o motor do processo.</h2>
                        <p className="t-body" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                            Ele muda conforme o status. No início da demanda aparecem as análises básicas;
                            na fase intermediária entram controle interno, autoridade e o início da
                            contratação; depois da cotação concluída aparece a reabertura. Quando a demanda
                            já está em contratação, o bloco de andamento desaparece.
                        </p>
                        <p className="t-body" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                            É o que impede o erro mais caro da contratação pública: mandar um processo
                            para uma fase que ele ainda não pode ocupar.
                        </p>
                        <div className="cta-row">
                            <Link to="/sicc#perguntas" className="link-action">
                                Ver as perguntas frequentes <span className="chev">›</span>
                            </Link>
                        </div>
                    </div>
                </Reveal>

                <Stagger className="grid" staggerChildren={0.08}>
                    {ACOES.map(a => (
                        <StaggerItem key={a.grupo}>
                            <div className="util-card">
                                <span className="card-index">{a.grupo}</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                                    {a.itens.map(i => <span className="chip" key={i}>{i}</span>)}
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </div>
    </section>
);

/* ------------------------------------------------------------ SICC iA --- */
const IA_PONTOS = [
    { t: 'Rascunho do ETP', d: 'A partir do problema identificado na demanda, monta resumo, necessidade, requisitos, soluções de mercado e solução adotada — para a equipe revisar seção por seção.' },
    { t: 'Sugestão de riscos', d: 'Propõe riscos a partir do objeto, com impacto, probabilidade, dano e ações preventivas e de contingência. A equipe aceita, ajusta ou recusa cada um.' },
    { t: 'DFDs automáticos', d: 'Gera os documentos de formalização de demanda a partir do que já está cadastrado no sistema.' },
    { t: 'Itens do orçamento', d: 'Na compra direta, lê os itens do orçamento anexado em vez de exigir digitação linha a linha.' },
];

const SiccIA = () => (
    <section className="tile tile--dark-3 on-dark">
        <div className="container container-mid">
            <Reveal>
                <div className="tile-head">
                    <span className="eyebrow">SICC iA</span>
                    <h2 className="t-display">A assistência redige. A equipe decide.</h2>
                    <p className="t-body">
                        A inteligência do sistema acelera a parte escrita do processo. O texto entra como
                        rascunho — a responsabilidade técnica continua sendo da equipe de planejamento,
                        que revisa, corrige e assina.
                    </p>
                </div>
            </Reveal>
            <Stagger className="grid grid-4" staggerChildren={0.07}>
                {IA_PONTOS.map(p => (
                    <StaggerItem key={p.t}>
                        <div className="util-card util-card--dark" style={{ height: '100%' }}>
                            <h3>{p.t}</h3>
                            <p>{p.d}</p>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

/* --------------------------------------------------------- Documentos --- */
const DOCS = [
    { n: 'DFD', d: 'Documento de Formalização de Demanda, com fundamento no inciso VII do art. 12 da Lei 14.133/2021.' },
    { n: 'ETP', d: 'Estudo Técnico Preliminar completo, do problema à declaração de viabilidade.' },
    { n: 'Mapa de Riscos', d: 'Matriz 5×5 de impacto e probabilidade, fundamentada no art. 18, inciso X.' },
    { n: 'TR', d: 'Termo de Referência por tipo de objeto: bens, serviços, serviços sem mão de obra e engenharia.' },
    { n: 'Ata-RP', d: 'Ata de registro de preço com os itens, o fornecedor e a vigência.' },
    { n: 'Despachos', d: 'Autorizações, despachos de cotação, de elaboração do TR e para a controladoria.' },
];

const Documentos = () => (
    <section className="tile tile--light">
        <div className="container container-mid">
            <Reveal>
                <div className="tile-head">
                    <span className="eyebrow">Documentos</span>
                    <h2 className="t-display">O processo sai pronto para assinar.</h2>
                    <p className="t-body">
                        Cada etapa gera o seu documento com o timbre do órgão, a partir dos modelos padrão
                        do SICC ou das minutas do próprio município. A assinatura eletrônica acontece
                        dentro do sistema.
                    </p>
                </div>
            </Reveal>
            <Stagger className="grid grid-3" staggerChildren={0.06}>
                {DOCS.map(d => (
                    <StaggerItem key={d.n}>
                        <div className="util-card" style={{ height: '100%' }}>
                            <h3>{d.n}</h3>
                            <p>{d.d}</p>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

/* --------------------------------------------------------------- FAQ ---- */
const Faq = () => {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="tile tile--parchment" id="perguntas">
            <div className="container container-narrow">
                <Reveal>
                    <div className="tile-head">
                        <span className="eyebrow">Perguntas frequentes</span>
                        <h2 className="t-display">As dúvidas que mais chegam ao suporte.</h2>
                    </div>
                </Reveal>

                <div className="faq">
                    {PERGUNTAS.map((q, i) => {
                        const isOpen = open === i;
                        return (
                            <Reveal key={q.p} delay={i * 0.03}>
                                <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
                                    <button
                                        className="faq-q"
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-a-${i}`}
                                        id={`faq-q-${i}`}
                                    >
                                        {q.p}
                                        <span className="faq-icon" aria-hidden="true" />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                className="faq-a"
                                                id={`faq-a-${i}`}
                                                role="region"
                                                aria-labelledby={`faq-q-${i}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.45, ease: EASE_EXPO }}
                                            >
                                                <div className="faq-a-inner">{q.r}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------------------------------- Glossário --- */
const GLOSSARIO = [
    ['PCA', 'Plano de Contratação Anual — o planejamento do exercício.'],
    ['DFD', 'Documento de Formalização de Demanda — a unidade de planejamento que compõe o PCA.'],
    ['ETP', 'Estudo Técnico Preliminar — justifica a contratação e conclui pela viabilidade.'],
    ['TR', 'Termo de Referência — descreve o objeto e as condições da contratação.'],
    ['SRP', 'Sistema de Registro de Preços.'],
    ['IRP', 'Intenção de Registro de Preços — divulgada para outros órgãos participarem.'],
    ['ARP', 'Ata de Registro de Preço.'],
    ['P.ADM', 'Processo administrativo — o número que acompanha a demanda do início ao fim.'],
    ['PNCP', 'Portal Nacional de Contratações Públicas.'],
    ['SIGA / TCM-BA', 'Sistema do Tribunal de Contas dos Municípios da Bahia.'],
    ['Apostilamento', 'Registro de alteração que não altera o objeto nem exige aditivo.'],
    ['Adesão', 'A carona: aderir a uma ata de registro de preço de outro órgão.'],
];

const Glossario = () => (
    <section className="tile tile--dark-2 on-dark">
        <div className="container container-mid">
            <Reveal>
                <div className="tile-head">
                    <span className="eyebrow">Glossário</span>
                    <h2 className="t-display">As siglas que aparecem em toda tela.</h2>
                </div>
            </Reveal>
            <Stagger className="grid grid-3" staggerChildren={0.04}>
                {GLOSSARIO.map(([sigla, def]) => (
                    <StaggerItem key={sigla}>
                        <div className="util-card util-card--dark" style={{ height: '100%' }}>
                            <h3>{sigla}</h3>
                            <p>{def}</p>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

/* ---------------------------------------------------------------- CTA --- */
const Cta = () => (
    <section className="tile tile--light">
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
            <Reveal>
                <span className="eyebrow">Implantação</span>
                <h2 className="t-display">Quer o SICC no seu município?</h2>
                <p className="t-lead" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                    A equipe da INFOCO conduz a implantação, a migração e o treinamento das unidades.
                </p>
                <div className="cta-row cta-row--center">
                    <Link to="/contato" className="btn btn-store">Falar com a INFOCO</Link>
                    <Link to="/cadastro" className="btn btn-secondary">Solicitar cadastro</Link>
                </div>
            </Reveal>
        </div>
    </section>
);

const Sicc = () => (
    <>
        <SiccHero />
        <Fluxo />
        <Tramitacao />
        <SiccIA />
        <Documentos />
        <Faq />
        <Glossario />
        <Cta />
    </>
);

export default Sicc;
