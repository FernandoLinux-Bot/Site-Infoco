import React, { useState } from 'react';

type Page = 'home' | 'solucoes' | 'institucional' | 'fornecedor' | 'cadastro' | 'contact' | 'noticias';

interface HeaderProps {
    setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
    };

    return (
        <header className={`app-header ${isMobileMenuOpen ? 'nav-open' : ''}`}>
             <div className="container header-container">
                <div className="header-left">
                    <a onClick={() => handleNavClick('home')} className="logo" style={{ cursor: 'pointer' }}>
                        <img src="/Logo.png" alt="INFOCO Logo" />
                    </a>
                </div>
                <nav className="header-center">
                    <ul className="nav-links">
                        <li><a onClick={() => handleNavClick('home')} className="nav-link">Home</a></li>
                        <li><a onClick={() => handleNavClick('solucoes')} className="nav-link">Soluções</a></li>
                        <li><a onClick={() => handleNavClick('institucional')} className="nav-link">Institucional</a></li>
                        <li><a onClick={() => handleNavClick('noticias')} className="nav-link">Notícias</a></li>
                        <li><a onClick={() => handleNavClick('contact')} className="nav-link">Contato</a></li>
                    </ul>
                </nav>
                <div className="header-right">
                    <div className="header-actions">
                         <a href="#" className="cta-button desktop-cta">
                            Acessar Plataforma
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                        <button
                            className="hamburger-menu"
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Abrir menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span/><span/><span/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
