import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Mensagem enviada com sucesso!');
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
                <p className="section-subtitle">
                    Tem alguma dúvida ou precisa de uma demonstração? Preencha o formulário abaixo e nossa equipe retornará em breve.
                </p>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" id="nome" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefone">Telefone / WhatsApp</label>
                        <input type="tel" id="telefone" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mensagem">Sua Mensagem</label>
                        <textarea id="mensagem" className="form-input" rows={5} required></textarea>
                    </div>
                    <button type="submit" className="cta-button" style={{ width: '100%', justifyContent: 'center' }}>
                        Enviar Mensagem
                    </button>
                </form>
            </div>
        </motion.section>
    );
};

export default Contact;
