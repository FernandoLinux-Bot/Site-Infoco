import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import Clients from '../components/Clients';
import { CountUp, Reveal, Stagger, StaggerItem, useParallax } from '../components/motion';
import { MODULOS, NUMEROS, PERFIS } from '../data/sicc';
import { SISTEMA } from '../data/links';


const Numeros = () => (
    <section className="tile tile--parchment">
        <div className="container container-mid">
            <Stagger className="stat-row" staggerChildren={0.09}>
                {NUMEROS.map(n => {
                    const numerico = Number(n.valor.replace('.', ''));
                    const inteiro = Number.isFinite(numerico) && n.valor.length <= 2;
                    return (
                        <StaggerItem key={n.rotulo} className="stat">
                            <div className="stat-value">
                                {inteiro ? <CountUp to={numerico} /> : n.valor}
                                {n.sufixo && <span className="stat-suffix">{n.sufixo}</span>}
                            </div>
                            <div className="stat-label">{n.rotulo}</div>
                        </StaggerItem>
                    );
                })}
            </Stagger>
        </div>
    </section>
);

const ProdutoTile = () => {
    const { ref, y } = useParallax(34);
    return (
        <section className="tile tile--dark on-dark" ref={ref}>
            <div className="container container-mid">
                <div className="split split--wide">
                    <Reveal>
                        <div>
                            <span className="eyebrow">O sistema</span>
                            <h2 className="t-display">
                                O SICC não é um módulo. É o <em>ciclo inteiro</em>.
                            </h2>
                            <p className="t-body" style={{ marginTop: 'var(--s-md)', color: 'var(--body-muted)' }}>
                                Planejar, estudar, precificar, licitar, contratar e prestar contas costumam
                                viver em sistemas diferentes — e é aí que o dado se perde. No SICC, o objeto
                                cadastrado no DFD é o mesmo objeto do ETP, da cotação, do edital e do contrato.
                            </p>
                            <ul className="feature-list" style={{ marginTop: 'var(--s-lg)' }}>
                                <li>Um catálogo de objetos e itens que atravessa todos os módulos</li>
                                <li>Assinatura eletrônica de DFD, TR, ETP, Ata-RP e autuação dentro do sistema</li>
                                <li>Publicação no PNCP e envio ao SIGA / TCM-BA a partir do mesmo cadastro</li>
                            </ul>
                            <div className="cta-row">
                                <Link to="/sicc" className="btn btn-primary">Ver o SICC em detalhe</Link>
                                <Link to="/solucoes" className="link-action">
                                    Todos os módulos <span className="chev">›</span>
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    <motion.div style={{ y }}>
                        <Reveal delay={0.12}>
                            <div className="grid grid-2">
                                {MODULOS.slice(0, 6).map((m, i) => (
                                    <div className="util-card util-card--dark" key={m.id}>
                                        <span className="card-index" style={{ color: 'var(--primary-on-dark)' }}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h3>{m.nome}</h3>
                                        <p>{m.resumo}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Modulos = () => (
    <section className="tile tile--light">
        <div className="container container-mid">
            <Reveal>
                <div className="tile-head">
                    <span className="eyebrow">Módulos</span>
                    <h2 className="t-display">Cada etapa tem a sua tela. Todas falam a mesma língua.</h2>
                    <p className="t-body">
                        {MODULOS.length} módulos integrados, do Plano de Contratação Anual à prestação de contas.
                    </p>
                </div>
            </Reveal>

            <Stagger className="grid grid-3" staggerChildren={0.05}>
                {MODULOS.map(m => (
                    <StaggerItem key={m.id}>
                        <article className="util-card" style={{ height: '100%' }}>
                            <span className="card-index">{m.resumo}</span>
                            <h3>{m.nome}</h3>
                            <p>{m.descricao}</p>
                            <div className="util-card-foot">
                                <Link to={`/solucoes#${m.id}`} className="link-action" style={{ fontSize: 14 }}>
                                    Detalhes <span className="chev">›</span>
                                </Link>
                            </div>
                        </article>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

const Perfis = () => (
    <section className="tile tile--dark-2 on-dark">
        <div className="container container-mid">
            <Reveal>
                <div className="tile-head">
                    <span className="eyebrow">Quem opera</span>
                    <h2 className="t-display">O sistema muda conforme quem entra.</h2>
                    <p className="t-body">
                        Cada perfil vê apenas as ações que a sua fase permite — e o menu de ações se
                        redesenha conforme o status do processo.
                    </p>
                </div>
            </Reveal>
            <Stagger className="grid grid-4" staggerChildren={0.07}>
                {PERFIS.map(p => (
                    <StaggerItem key={p.nome}>
                        <div className="util-card util-card--dark" style={{ height: '100%' }}>
                            <h3>{p.nome}</h3>
                            <p>{p.papel}</p>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

const CtaFinal = () => (
    <section className="tile tile--light">
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
            <Reveal>
                <span className="eyebrow">Próximo passo</span>
                <h2 className="t-display">Leve o ciclo inteiro para dentro de um sistema.</h2>
                <p className="t-lead" style={{ marginTop: 'var(--s-md)', color: 'var(--ink-muted-80)' }}>
                    Converse com a equipe da INFOCO sobre a implantação do SICC no seu município.
                </p>
                <div className="cta-row cta-row--center">
                    <Link to="/contato" className="btn btn-store">Falar com a INFOCO</Link>
                    <a className="btn btn-secondary" href={SISTEMA} target="_blank" rel="noopener noreferrer">
                        Acessar o sistema
                    </a>
                </div>
            </Reveal>
        </div>
    </section>
);

const Home = () => (
    <>
        <Hero />
        <Numeros />
        <ProdutoTile />
        <Modulos />
        <VideoSection />
        <Perfis />
        <Clients />
        <CtaFinal />
    </>
);

export default Home;
