import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

type Page = 'home' | 'solucoes' | 'institucional' | 'fornecedor' | 'cadastro' | 'contact' | 'noticias';

interface HeaderProps {
    setCurrentPage: (page: Page) => void;
}

const iconVariants: Variants = {
    rest: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    hover: { x: 5, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false); // Close menu on navigation
    };

    const toggleMenu = () => {
        setMobileMenuOpen(isOpen => !isOpen);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-nav-is-open');
        } else {
            document.body.classList.remove('mobile-nav-is-open');
        }
        // Cleanup function to ensure the class is removed on component unmount
        return () => {
            document.body.classList.remove('mobile-nav-is-open');
        };
    }, [isMobileMenuOpen]);

    const CtaButton = () => (
        <motion.a
            href="https://app2.infocolicitacoes.com.br/cadastro/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            whileHover="hover"
            initial="rest"
            animate="rest"
        >
            <span className="cta-text-wrapper">
                <span>Acessar</span>
                <span>Plataforma</span>
            </span>
            <motion.span className="cta-icon-wrapper" variants={iconVariants}>
                <FaArrowRight />
            </motion.span>
        </motion.a>
    );

    return (
        <>
            <header className={`app-header ${isMobileMenuOpen ? 'nav-open' : ''}`}>
                 <div className="container header-container">
                    <div className="header-left">
                        <button onClick={() => handleNavClick('home')} className="logo">
                            <img src="/Logo.png" alt="INFOCO Logo" />
                        </button>
                    </div>
                    {/* Desktop Navigation */}
                    <nav className="header-center">
                        <ul className="nav-links">
                            <li><button onClick={() => handleNavClick('home')} className="nav-link">Home</button></li>
                            <li><button onClick={() => handleNavClick('solucoes')} className="nav-link">Soluções</button></li>
                            <li><button onClick={() => handleNavClick('institucional')} className="nav-link">Institucional</button></li>
                            <li><button onClick={() => handleNavClick('noticias')} className="nav-link">Notícias</button></li>
                            <li><button onClick={() => handleNavClick('contact')} className="nav-link">Contato</button></li>
                        </ul>
                    </nav>
                    <div className="header-right">
                        <div className="header-actions">
                             <div className="desktop-cta">
                                <CtaButton />
                             </div>
                            <button
                                className="hamburger-menu"
                                onClick={toggleMenu}
                                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span/><span/><span/>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Mobile Navigation Menu & Overlay */}
            <div 
                className={`mobile-nav-overlay ${isMobileMenuOpen ? 'is-open' : ''}`} 
                onClick={toggleMenu} 
                aria-hidden="true"
            ></div>
            <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
                <ul className="mobile-nav-links">
                    <li><button onClick={() => handleNavClick('home')} className="nav-link">Home</button></li>
                    <li><button onClick={() => handleNavClick('solucoes')} className="nav-link">Soluções</button></li>
                    <li><button onClick={() => handleNavClick('institucional')} className="nav-link">Institucional</button></li>
                    <li><button onClick={() => handleNavClick('noticias')} className="nav-link">Notícias</button></li>
                    <li><button onClick={() => handleNavClick('contact')} className="nav-link">Contato</button></li>
                </ul>
                <div className="mobile-nav-cta">
                    <CtaButton />
                </div>
            </nav>
        </>
    );
};

export default Header;
