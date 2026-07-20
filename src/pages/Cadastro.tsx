import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

const tipos = [
    'Prefeitura',
    'Câmara Municipal',
    'Órgão público',
    'Fornecedor',
    'Outro',
];

const Cadastro = () => {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
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
            console.error('Erro ao enviar cadastro:', error);
            setSubmitStatus('error');
            if (window.grecaptcha && recaptchaWidgetId.current !== null) {
                window.grecaptcha.reset(recaptchaWidgetId.current);
            }
            setRecaptchaVerified(false);
        }
    };

    return (
        <motion.section
            className="cadastro-page"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="cadastro-container">
                {submitStatus === 'success' ? (
                    <div className="submit-success">
                        <span className="eyebrow">Cadastro</span>
                        <h3 style={{ marginTop: '1rem' }}>Solicitação enviada!</h3>
                        <p style={{ marginTop: '0.5rem', color: 'var(--ink-soft)' }}>
                            Recebemos seus dados. Nossa equipe vai entrar em contato para concluir seu cadastro e liberar o acesso à plataforma. Obrigado pelo interesse na INFOCO.
                        </p>
                    </div>
                ) : (
                    <>
                        <span className="eyebrow">Cadastro</span>
                        <h1 style={{ marginTop: '1rem' }}>
                            Comece com a <em>INFOCO</em>.
                        </h1>
                        <p className="section-subtitle" style={{ marginTop: '0.75rem', fontSize: '1rem' }}>
                            Preencha seus dados e nossa equipe entra em contato para concluir seu cadastro.
                        </p>
                        <form className="cadastro-form" onSubmit={handleSubmit} style={{ marginTop: '1.75rem' }}>
                            <input type="hidden" name="assunto" value="Solicitação de cadastro" />
                            <div className="form-group">
                                <label htmlFor="nome">Nome completo ou Razão Social</label>
                                <input type="text" id="nome" name="nome" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" name="email" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="documento">CPF ou CNPJ</label>
                                <input type="text" id="documento" name="documento" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefone">Telefone / WhatsApp</label>
                                <input type="tel" id="telefone" name="telefone" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipo">Tipo de organização</label>
                                <select id="tipo" name="tipo" className="form-input" required defaultValue="">
                                    <option value="" disabled>Selecione</option>
                                    {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="form-group recaptcha-container">
                                <div ref={recaptchaContainer}></div>
                            </div>
                            <button
                                type="submit"
                                className="cta-button"
                                style={{ width: '100%', justifyContent: 'center' }}
                                disabled={submitStatus === 'submitting' || !isRecaptchaVerified}
                            >
                                {submitStatus === 'submitting' ? 'Enviando…' : 'Solicitar cadastro'}
                            </button>
                            {submitStatus === 'error' && (
                                <p className="submit-error">
                                    Ocorreu um erro ao enviar. Tente novamente ou fale conosco pelo WhatsApp.
                                </p>
                            )}
                        </form>
                    </>
                )}
            </div>
        </motion.section>
    );
};

export default Cadastro;
