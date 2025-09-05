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
            <div className="footer-socials">
                <a href="https://www.instagram.com/infocogestaopublica/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Siga-nos no Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.52.012-4.755.068-2.858.13-4.213 1.48-4.342 4.342-.056 1.235-.068 1.584-.068 4.755s.012 3.52.068 4.755c.13 2.858 1.484 4.213 4.342 4.342 1.235.056 1.584.068 4.755.068s3.52-.012 4.755-.068c2.858-.13 4.213-1.48 4.342-4.342.056-1.235.068-1.584.068-4.755s-.012-3.52-.068-4.755c-.13-2.858-1.484-4.213-4.342-4.342-1.235-.056-1.584-.068-4.755-.068zM12 6.845a5.155 5.155 0 100 10.31 5.155 5.155 0 000-10.31zm0 8.428a3.273 3.273 0 110-6.546 3.273 3.273 0 010 6.546zm4.965-8.802a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
                    </svg>
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} INFOCO GESTÃO PÚBLICA. Todos os direitos reservados.</p>
        </div>
    </footer>
);

export default Footer;
