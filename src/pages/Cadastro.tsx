import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_EXPO, Reveal, WordReveal } from '../components/motion';
import { useFormSubmit, useRecaptcha } from '../hooks/useContactForm';

const TIPOS = [
    'Prefeitura Municipal',
    'Câmara Municipal',
    'Consórcio Público',
    'Fornecedor / Empresa',
    'Outro',
];

const CadastroForm = () => {
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
                <h3>Solicitação recebida.</h3>
                <p>
                    A INFOCO vai conferir os dados e entrar em contato para concluir a criação
                    do acesso. Nenhuma senha é definida por aqui.
                </p>
            </motion.div>
        );
    }

    return (
        <form className="form" onSubmit={submit}>
            <input type="hidden" name="_origem" value="Site INFOCO — Solicitação de cadastro" />
            <div className="form-row">
                <div className="field">
                    <label htmlFor="nome">Nome completo</label>
                    <input className="input" type="text" id="nome" name="nome" required autoComplete="name" />
                </div>
                <div className="field">
                    <label htmlFor="cargo">Cargo ou função</label>
                    <input className="input" type="text" id="cargo" name="cargo" />
                </div>
            </div>
            <div className="form-row">
                <div className="field">
                    <label htmlFor="tipo">Tipo de organização</label>
                    <select className="select" id="tipo" name="tipo" defaultValue={TIPOS[0]}>
                        {TIPOS.map(t => <option key={t}>{t}</option>)}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="organizacao">Nome da organização</label>
                    <input className="input" type="text" id="organizacao" name="organizacao" required autoComplete="organization" />
                </div>
            </div>
            <div className="form-row">
                <div className="field">
                    <label htmlFor="municipio">Município / UF</label>
                    <input className="input" type="text" id="municipio" name="municipio" required />
                </div>
                <div className="field">
                    <label htmlFor="documento">CNPJ</label>
                    <input className="input" type="text" id="documento" name="documento" inputMode="numeric" />
                </div>
            </div>
            <div className="form-row">
                <div className="field">
                    <label htmlFor="email">E-mail institucional</label>
                    <input className="input" type="email" id="email" name="email" required autoComplete="email" />
                </div>
                <div className="field">
                    <label htmlFor="telefone">Telefone ou WhatsApp</label>
                    <input className="input" type="tel" id="telefone" name="telefone" required autoComplete="tel" />
                </div>
            </div>
            <div className="field">
                <label htmlFor="observacoes">Observações</label>
                <textarea className="textarea" id="observacoes" name="observacoes" rows={5} />
            </div>

            <div className="recaptcha-slot">
                <div ref={recaptcha.container} />
            </div>
            {!recaptcha.available && (
                <p className="form-error">
                    Não foi possível carregar a verificação de segurança. Recarregue a página ou
                    fale conosco pelo WhatsApp.
                </p>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={status === 'submitting' || !recaptcha.verified}
            >
                {status === 'submitting' ? 'Enviando…' : 'Enviar solicitação'}
            </button>

            {status === 'error' && (
                <p className="form-error">
                    Não conseguimos enviar a solicitação. Tente novamente ou fale conosco pelo WhatsApp.
                </p>
            )}
            <p className="form-note">
                Este formulário registra uma solicitação de cadastro. A criação do acesso é
                concluída pela INFOCO — nenhuma senha trafega por aqui.
            </p>
        </form>
    );
};

const Cadastro = () => (
    <>
        <section className="tile tile--light hero" style={{ paddingBottom: 'var(--s-xl)' }}>
            <div className="container container-narrow">
                <motion.span
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                >
                    Cadastro
                </motion.span>
                <h1 className="t-hero">
                    <WordReveal text="Solicite seu" /> <em><WordReveal text="acesso." delay={0.12} /></em>
                </h1>
                <motion.p
                    className="t-lead hero-sub"
                    style={{ maxWidth: '40ch' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }}
                >
                    Preencha os dados da organização e a INFOCO conclui a habilitação do acesso ao SICC.
                </motion.p>
            </div>
        </section>

        <section className="tile tile--parchment" style={{ paddingTop: 'var(--s-xl)' }}>
            <div className="container container-narrow">
                <Reveal>
                    <div className="util-card" style={{ padding: 'var(--s-xl)' }}>
                        <CadastroForm />
                    </div>
                </Reveal>
                <Reveal delay={0.08}>
                    <p className="t-caption" style={{ marginTop: 'var(--s-lg)', textAlign: 'center', color: 'var(--ink-muted-48)' }}>
                        Já tem conta?{' '}
                        <a href="https://app2.infocolicitacoes.com.br/cadastro/" target="_blank" rel="noopener noreferrer">
                            Acesse o sistema
                        </a>{' '}
                        · Dúvidas? <Link to="/contato">Fale com a INFOCO</Link>
                    </p>
                </Reveal>
            </div>
        </section>
    </>
);

export default Cadastro;
