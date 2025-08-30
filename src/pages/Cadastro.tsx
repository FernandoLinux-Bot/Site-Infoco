import React from 'react';
import { motion } from 'framer-motion';

const Cadastro = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Formulário enviado!');
    };

    return (
        <motion.section 
            className="cadastro-page"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="cadastro-container">
                <h1>Crie sua Conta</h1>
                <form className="cadastro-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo ou Razão Social</label>
                        <input type="text" id="nome" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="documento">CPF ou CNPJ</label>
                        <input type="text" id="documento" className="form-input" required />
                    </div>
                     <div className="form-group">
                        <label htmlFor="telefone">Telefone / WhatsApp</label>
                        <input type="tel" id="telefone" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Crie uma Senha</label>
                        <input type="password" id="senha" className="form-input" required />
                    </div>
                    <button type="submit" className="cta-button" style={{ width: '100%', justifyContent: 'center' }}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </motion.section>
    );
};

export default Cadastro;
