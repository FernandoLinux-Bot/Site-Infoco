import React from 'react';

const Footer = () => (
    <footer className="app-footer">
        <div className="container footer-container">
            <ul className="footer-links">
                <li><a href="#inicio">Início</a></li>
                <li><a href="#servicos">Serviços</a></li>
                <li><a href="#como-funciona">Como Funciona</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
            <p>&copy; {new Date().getFullYear()} INFOCO LICITAÇÕES. Todos os direitos reservados.</p>
        </div>
    </footer>
);

export default Footer;
