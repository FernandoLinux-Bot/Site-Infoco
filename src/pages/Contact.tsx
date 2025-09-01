import React, { useState } from 'react';
import { motion } from 'framer-motion';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus('submitting');
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://submit-form.com/Zr70ukjGJSEHGttk58iYMUBH', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setSubmitStatus('error');
        }
    };

    return (
        <motion.section
            className="contact-page"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="contact-container">
                <h1 className="section-title">Entre em Contato</h1>

                {submitStatus === 'success' ? (
                    <div className="submit-success">
                        <h3>Obrigado!</h3>
                        <p>Sua mensagem foi enviada com sucesso. Retornaremos em breve.</p>
                    </div>
                ) : (
                    <>
                        <p className="section-subtitle">
                            Tem alguma dúvida ou precisa de uma demonstração? Preencha o formulário abaixo e nossa equipe retornará em breve.
                        </p>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="nome">Nome Completo</label>
                                <input type="text" id="nome" name="nome" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" name="email" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefone">Telefone / WhatsApp</label>
                                <input type="tel" id="telefone" name="telefone" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mensagem">Sua Mensagem</label>
                                <textarea id="mensagem" name="mensagem" className="form-input" rows={5} required></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="cta-button" 
                                style={{ width: '100%', justifyContent: 'center' }}
                                disabled={submitStatus === 'submitting'}
                            >
                                {submitStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
                            </button>
                            {submitStatus === 'error' && (
                                <p className="submit-error">
                                    Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.
                                </p>
                            )}
                        </form>
                    </>
                )}
            </div>
        </motion.section>
    );
};

export default Contact;
