import { motion } from 'framer-motion';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';
import { useFormSubmit, useRecaptcha } from '../hooks/useContactForm';

const CANAIS = [
    { t: 'Telefone fixo', v: '(73) 3301-2710', href: 'tel:+557333012710' },
    { t: 'Administrativo', v: '(73) 98118-5210', href: 'https://wa.me/5573981185210' },
    { t: 'Comercial', v: '(71) 98205-3822', href: 'https://wa.me/5571982053822' },
    { t: 'Suporte técnico', v: '(73) 98101-9313', href: 'https://wa.me/5573981019313' },
];

const ContactForm = () => {
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
                <h3>Mensagem enviada.</h3>
                <p>Obrigado pelo contato. A equipe da INFOCO responde em breve.</p>
            </motion.div>
        );
    }

    return (
        <form className="form" onSubmit={submit}>
            <input type="hidden" name="_origem" value="Site INFOCO — Contato" />
            <div className="form-row">
                <div className="field">
                    <label htmlFor="nome">Nome completo</label>
                    <input className="input" type="text" id="nome" name="nome" required autoComplete="name" />
                </div>
                <div className="field">
                    <label htmlFor="orgao">Órgão ou empresa</label>
                    <input className="input" type="text" id="orgao" name="orgao" autoComplete="organization" />
                </div>
            </div>
            <div className="form-row">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input className="input" type="email" id="email" name="email" required autoComplete="email" />
                </div>
                <div className="field">
                    <label htmlFor="telefone">Telefone ou WhatsApp</label>
                    <input className="input" type="tel" id="telefone" name="telefone" autoComplete="tel" />
                </div>
            </div>
            <div className="field">
                <label htmlFor="assunto">Assunto</label>
                <select className="select" id="assunto" name="assunto" defaultValue="Conhecer o SICC">
                    <option>Conhecer o SICC</option>
                    <option>Implantação em um município</option>
                    <option>Suporte técnico</option>
                    <option>Sou fornecedor</option>
                    <option>Outro assunto</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea className="textarea" id="mensagem" name="mensagem" rows={6} required />
            </div>

            <div className="recaptcha-slot">
                <div ref={recaptcha.container} />
            </div>
            {!recaptcha.available && (
                <p className="form-error">
                    Não foi possível carregar a verificação de segurança. Recarregue a página ou fale
                    conosco pelo WhatsApp.
                </p>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={status === 'submitting' || !recaptcha.verified}
            >
                {status === 'submitting' ? 'Enviando…' : 'Enviar mensagem'}
            </button>

            {status === 'error' && (
                <p className="form-error">
                    Não conseguimos enviar sua mensagem. Tente novamente ou use um dos canais ao lado.
                </p>
            )}
            <p className="form-note">
                Os dados enviados são usados apenas para responder ao seu contato.
            </p>
        </form>
    );
};

const Contact = () => (
    <>
        <section className="tile tile--light hero" style={{ paddingBottom: 'var(--s-xl)' }}>
            <div className="container container-narrow">
                <motion.span
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                >
                    Contato
                </motion.span>
                <h1 className="t-hero">
                    <WordReveal text="Fale com a" /> <em><WordReveal text="INFOCO." delay={0.12} /></em>
                </h1>
                <motion.p
                    className="t-lead hero-sub"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }}
                >
                    Escolha um canal direto ou envie uma mensagem pelo formulário.
                </motion.p>
            </div>
        </section>

        <section className="tile tile--parchment" style={{ paddingTop: 'var(--s-xl)' }}>
            <div className="container container-mid">
                <div className="split split--wide" style={{ alignItems: 'start' }}>
                    <div>
                        <Reveal>
                            <h2 className="t-display-md">Canais diretos</h2>
                        </Reveal>
                        <Stagger className="grid" staggerChildren={0.06}>
                            {CANAIS.map(c => (
                                <StaggerItem key={c.t}>
                                    <a
                                        className="util-card"
                                        href={c.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <span className="card-index">{c.t}</span>
                                        <h3>{c.v}</h3>
                                    </a>
                                </StaggerItem>
                            ))}
                        </Stagger>

                        <Reveal delay={0.1}>
                            <div className="util-card" style={{ marginTop: 'var(--s-lg)' }}>
                                <span className="card-index">Endereço</span>
                                <p>
                                    Av. Princesa Isabel, 1206 — 2º andar, salas 201/202<br />
                                    São Caetano, Itabuna/BA — 45607-127
                                </p>
                                <p>
                                    <a href="mailto:contato@infocogestaopublica.com.br">
                                        contato@infocogestaopublica.com.br
                                    </a>
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.08}>
                        <div className="util-card" style={{ padding: 'var(--s-xl)' }}>
                            <h2 className="t-display-md" style={{ marginBottom: 'var(--s-md)' }}>
                                Enviar mensagem
                            </h2>
                            <ContactForm />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    </>
);

export default Contact;
