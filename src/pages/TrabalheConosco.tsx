import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaRocket, FaLightbulb, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};

const itemVariants: Variants = {
    hidden: { y: 22, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const perks = [
    { icon: <FaHandHoldingHeart />, title: 'Propósito real', description: 'Seu trabalho melhora a gestão pública de municípios inteiros.' },
    { icon: <FaLightbulb />, title: 'Inovação constante', description: 'Tecnologia de ponta aplicada a licitações, contratos e patrimônio.' },
    { icon: <FaUsers />, title: 'Time que colabora', description: 'Ambiente próximo, com troca entre tecnologia, jurídico e negócios.' },
    { icon: <FaRocket />, title: 'Crescimento', description: 'Espaço para aprender, assumir responsabilidades e evoluir na carreira.' },
];

const areas = [
    'Desenvolvimento de Software',
    'Suporte Técnico',
    'Comercial / Vendas',
    'Administrativo / Financeiro',
    'Jurídico / Licitações',
    'Marketing / Design',
    'Outra área',
];

const CareersForm = () => {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [fileName, setFileName] = useState<string>('');
    const [isRecaptchaVerified, setRecaptchaVerified] = useState(false);
    const recaptchaContainer = useRef<HTMLDivElement>(null);
    const recaptchaWidgetId = useRef<number | null>(null);

    useEffect(() => {
        const renderRecaptcha = () => {
            if (recaptchaContainer.current && window.grecaptcha?.render && recaptchaWidgetId.current === null) {
                recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainer.current, {
                    'sitekey': '6Lewq7krAAAAAG6X-fKiZIAvAo53IKSNWAlMpyNn',
                    'callback': () => setRecaptchaVerified(true),
                    'expired-callback': () => setRecaptchaVerified(false),
                });
            }
        };

        const intervalId = setInterval(() => {
            if (window.grecaptcha && window.grecaptcha.render) {
                renderRecaptcha();
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus('submitting');
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://submit-form.com/Z4G5K3MOm', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                setSubmitStatus('success');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Erro ao enviar candidatura:', error);
            setSubmitStatus('error');
            if (window.grecaptcha && recaptchaWidgetId.current !== null) {
                window.grecaptcha.reset(recaptchaWidgetId.current);
            }
            setRecaptchaVerified(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="submit-success">
                <h3>Candidatura recebida!</h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--ink-soft)' }}>
                    Recebemos seu currículo. Nossa equipe vai analisar e, havendo oportunidade compatível, entraremos em contato. Obrigado pelo interesse na INFOCO.
                </p>
            </div>
        );
    }

    return (
        <div className="contact-container">
            <form className="contact-form" onSubmit={handleSubmit}>
                {/* identifica a origem no e-mail que chega à INFOCO */}
                <input type="hidden" name="assunto" value="Trabalhe Conosco: nova candidatura" />

                <div className="form-group">
                    <label htmlFor="nome">Nome completo</label>
                    <input type="text" id="nome" name="nome" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="telefone">Telefone / WhatsApp</label>
                    <input type="tel" id="telefone" name="telefone" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="area">Área de interesse</label>
                    <select id="area" name="area" className="form-input" required defaultValue="">
                        <option value="" disabled>Selecione uma área</option>
                        {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn ou portfólio (opcional)</label>
                    <input type="url" id="linkedin" name="linkedin" className="form-input" placeholder="https://" />
                </div>
                <div className="form-group">
                    <label htmlFor="curriculo">Currículo (PDF ou DOC)</label>
                    <label className="form-file">
                        <input
                            type="file"
                            id="curriculo"
                            name="curriculo"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                        />
                        <span className="form-file-button">Escolher arquivo</span>
                        <span className="form-file-name">{fileName || 'Nenhum arquivo selecionado'}</span>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="mensagem">Mensagem (opcional)</label>
                    <textarea id="mensagem" name="mensagem" className="form-input" rows={4} placeholder="Conte um pouco sobre você e por que quer fazer parte da INFOCO."></textarea>
                </div>
                <div className="form-group recaptcha-container">
                    <div ref={recaptchaContainer}></div>
                </div>
                <button
                    type="submit"
                    className="cta-button"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                    disabled={submitStatus === 'submitting' || !isRecaptchaVerified}
                >
                    {submitStatus === 'submitting' ? 'Enviando…' : 'Enviar candidatura'}
                </button>
                {submitStatus === 'error' && (
                    <p className="submit-error">
                        Ocorreu um erro ao enviar. Verifique o tamanho do arquivo e tente novamente, ou envie seu currículo para contato@infocogestaopublica.com.br.
                    </p>
                )}
            </form>
        </div>
    );
};

const TrabalheConosco = () => {
    return (
        <motion.section
            className="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container contact-page-grid">
                <motion.div
                    className="contact-info"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.span className="eyebrow" variants={itemVariants}>Carreiras</motion.span>
                    <motion.h1 variants={itemVariants}>Trabalhe <em>conosco</em>.</motion.h1>
                    <motion.p className="section-subtitle" variants={itemVariants}>
                        Faça parte de um time que transforma a gestão pública com tecnologia. Envie seu currículo e entre para o nosso banco de talentos.
                    </motion.p>
                    <div className="careers-perks">
                        {perks.map((perk) => (
                            <motion.div key={perk.title} className="careers-perk" variants={itemVariants}>
                                <div className="careers-perk-icon">{perk.icon}</div>
                                <div>
                                    <h3>{perk.title}</h3>
                                    <p>{perk.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="contact-form-wrapper"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <CareersForm />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TrabalheConosco;
