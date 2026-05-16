import { motion } from 'framer-motion';

const Cadastro = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Formulário enviado!');
    };

    return (
        <motion.section
            className="cadastro-page"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="cadastro-container">
                <span className="eyebrow">Conta / Cadastro</span>
                <h1 style={{ marginTop: '1rem' }}>
                    Crie sua <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>conta</em>.
                </h1>
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
                        <label htmlFor="senha">Senha</label>
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
