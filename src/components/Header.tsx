import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const iconVariants: Variants = {
    rest: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    hover: { x: 5, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/solucoes', label: 'Soluções' },
    { to: '/institucional', label: 'Institucional' },
    { to: '/noticias', label: 'Notícias' },
    { to: '/contato', label: 'Contato' },
];

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMenu = () => setMobileMenuOpen(false);
    const toggleMenu = () => setMobileMenuOpen(isOpen => !isOpen);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-nav-is-open');
        } else {
            document.body.classList.remove('mobile-nav-is-open');
        }
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
                        <Link to="/" onClick={closeMenu} className="logo">
                            <img src="/Logo.png" alt="INFOCO Logo" />
                        </Link>
                    </div>
                    <nav className="header-center">
                        <ul className="nav-links">
                            {navItems.map(item => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.end}
                                        onClick={closeMenu}
                                        className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
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

            <div
                className={`mobile-nav-overlay ${isMobileMenuOpen ? 'is-open' : ''}`}
                onClick={toggleMenu}
                aria-hidden="true"
            ></div>
            <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
                <ul className="mobile-nav-links">
                    {navItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                onClick={closeMenu}
                                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="mobile-nav-cta">
                    <CtaButton />
                </div>
            </nav>
        </>
    );
};

export default Header;
