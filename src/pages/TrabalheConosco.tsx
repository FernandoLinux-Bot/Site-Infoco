import { motion } from 'framer-motion';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';
import { useFormSubmit, useRecaptcha } from '../hooks/useContactForm';

const AREAS = [
    'Desenvolvimento de software',
    'Suporte e atendimento',
    'Implantação e treinamento',
    'Comercial',
    'Administrativo / Financeiro',
    'Estágio',
];

const PERKS = [
    { t: 'Produto com impacto real', d: 'O que você constrói é usado por servidores que executam o orçamento de municípios inteiros.' },
    { t: 'Time pequeno, decisão curta', d: 'Menos camada entre a ideia e a produção. Quem escreve o código acompanha o resultado na ponta.' },
    { t: 'Domínio que se aprende', d: 'Licitação, contrato e prestação de contas — um conhecimento que fica com você.' },
    { t: 'Base em Itabuna', d: 'Escritório no sul da Bahia, atendendo municípios de todo o estado.' },
];

const CareersForm = () => {
    const recaptcha = useRecaptcha();
    const { status, submit } = useFormSubmit(recaptcha.reset);

    if (status === 'success') {
        return (
            <motion.div
                className="form-success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
                <h3>Currículo recebido.</h3>
                <p>Obrigado pelo interesse. A equipe da INFOCO entra em contato caso haja uma vaga aderente ao seu perfil.</p>
            </motion.div>
        );
    }

    return (
        <form className="form" onSubmit={submit} encType="multipart/form-data">
            <input type="hidden" name="_origem" value="Site INFOCO — Trabalhe Conosco" />
            <div className="form-row">
                <div className="field">
                    <label htmlFor="nome">Nome completo</label>
                    <input className="input" type="text" id="nome" name="nome" required autoComplete="name" />
                </div>
                <div className="field">
                    <label htmlFor="area">Área de interesse</label>
                    <select className="select" id="area" name="area" defaultValue={AREAS[0]}>
                        {AREAS.map(a => <option key={a}>{a}</option>)}
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input className="input" type="email" id="email" name="email" required autoComplete="email" />
                </div>
                <div className="field">
                    <label htmlFor="telefone">Telefone ou WhatsApp</label>
                    <input className="input" type="tel" id="telefone" name="telefone" required autoComplete="tel" />
                </div>
            </div>
            <div className="field">
                <label htmlFor="linkedin">LinkedIn, GitHub ou portfólio</label>
                <input className="input" type="url" id="linkedin" name="linkedin" placeholder="https://" />
            </div>
            <div className="field">
                <label htmlFor="curriculo">Currículo (PDF, DOC ou DOCX)</label>
                <div className="file-drop">
                    Anexe o arquivo do seu currículo
                    <input
                        type="file"
                        id="curriculo"
                        name="curriculo"
                        accept=".pdf,.doc,.docx,application/pdf"
                        required
                    />
                </div>
            </div>
            <div className="field">
                <label htmlFor="mensagem">Conte um pouco sobre você</label>
                <textarea className="textarea" id="mensagem" name="mensagem" rows={5} />
            </div>

            <div className="recaptcha-slot">
                <div ref={recaptcha.container} />
            </div>
            {!recaptcha.available && (
                <p className="form-error">
                    Não foi possível carregar a verificação de segurança. Recarregue a página ou
                    envie seu currículo por e-mail.
                </p>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={status === 'submitting' || !recaptcha.verified}
            >
                {status === 'submitting' ? 'Enviando…' : 'Enviar candidatura'}
            </button>

            {status === 'error' && (
                <p className="form-error">
                    Não conseguimos enviar sua candidatura. Tente novamente ou escreva para
                    contato@infocogestaopublica.com.br.
                </p>
            )}
        </form>
    );
};

const TrabalheConosco = () => (
    <>
        <section className="tile tile--light hero" style={{ paddingBottom: 'var(--s-xl)' }}>
            <div className="container container-narrow">
                <motion.span
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                >
                    Carreiras
                </motion.span>
                <h1 className="t-hero">
                    <WordReveal text="Construa o sistema que" />{' '}
                    <em><WordReveal text="move o município." delay={0.15} /></em>
                </h1>
                <motion.p
                    className="t-lead hero-sub"
                    style={{ maxWidth: '42ch' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }}
                >
                    Envie seu currículo. Guardamos seu perfil e chamamos quando abrir uma vaga aderente.
                </motion.p>
            </div>
        </section>

        <section className="tile tile--dark on-dark">
            <div className="container container-mid">
                <Reveal>
                    <div className="tile-head">
                        <span className="eyebrow">Por que aqui</span>
                        <h2 className="t-display">Um produto com endereço e consequência.</h2>
                    </div>
                </Reveal>
                <Stagger className="grid grid-4" staggerChildren={0.07}>
                    {PERKS.map(p => (
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

        <section className="tile tile--parchment">
            <div className="container container-narrow">
                <Reveal>
                    <div className="tile-head">
                        <span className="eyebrow">Candidatura</span>
                        <h2 className="t-display">Envie seu currículo.</h2>
                    </div>
                </Reveal>
                <Reveal delay={0.08}>
                    <div className="util-card" style={{ padding: 'var(--s-xl)' }}>
                        <CareersForm />
                    </div>
                </Reveal>
            </div>
        </section>
    </>
);

export default TrabalheConosco;
