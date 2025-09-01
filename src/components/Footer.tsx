import React from 'react';

type Page = 'home' | 'fornecedor' | 'cadastro' | 'sicc' | 'amx-digital' | 'contact';

interface FooterProps {
    setCurrentPage: (page: Page) => void;
}


const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => (
    <footer className="app-footer">
        <div className="container footer-container">
            <ul className="footer-links">
                <li><a style={{cursor: 'pointer'}} onClick={() => setCurrentPage('home')}>Início</a></li>
                <li><a href="#solucoes" onClick={() => setCurrentPage('home')}>Soluções</a></li>
                <li><a href="#como-funciona" onClick={() => setCurrentPage('home')}>Como Funciona</a></li>
                <li><a style={{cursor: 'pointer'}} onClick={() => setCurrentPage('contact')}>Contato</a></li>
            </ul>
            <p>&copy; {new Date().getFullYear()} INFOCO LICITAÇÕES. Todos os direitos reservados.</p>
        </div>
    </footer>
);

export default Footer;
