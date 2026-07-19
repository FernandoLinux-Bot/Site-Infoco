import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, Variants, useScroll, useMotionValueEvent } from 'framer-motion';

const iconVariants: Variants = {
    rest: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    hover: { x: 4, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const ArrowIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
        <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/solucoes', label: 'Soluções' },
    { to: '/institucional', label: 'Institucional' },
    { to: '/noticias', label: 'Notícias' },
    { to: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
];

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);

    const closeMenu = () => setMobileMenuOpen(false);
    const toggleMenu = () => setMobileMenuOpen(isOpen => !isOpen);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 12);
    });

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
            <span>Acessar plataforma</span>
            <motion.span className="cta-icon-wrapper" variants={iconVariants}>
                <ArrowIcon />
            </motion.span>
        </motion.a>
    );

    return (
        <>
            <header className={`app-header ${isMobileMenuOpen ? 'nav-open' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
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
