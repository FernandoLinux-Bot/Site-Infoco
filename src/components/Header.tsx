import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_EXPO } from './motion';
import { SISTEMA } from '../data/links';


/** Linha 1 — institucional, discreta, como a barra preta da Apple. */
const globalNav = [
    { to: '/', label: 'Início', end: true },
    { to: '/sicc', label: 'SICC' },
    { to: '/solucoes', label: 'Módulos' },
    { to: '/institucional', label: 'Institucional' },
    { to: '/noticias', label: 'Notícias' },
    { to: '/fornecedor', label: 'Fornecedores' },
    { to: '/trabalhe-conosco', label: 'Carreiras' },
];

/** Linha 2 — contexto do produto e o CTA persistente. */
const subNav = [
    { to: '/sicc', label: 'Visão geral' },
    { to: '/solucoes', label: 'Módulos' },
    { to: '/sicc#fluxo', label: 'Fluxo' },
    { to: '/sicc#perguntas', label: 'Perguntas' },
    { to: '/contato', label: 'Falar com a INFOCO' },
];

const Header = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.classList.toggle('nav-open', open);
        return () => document.body.classList.remove('nav-open');
    }, [open]);

    return (
        <>
            <header className="global-nav">
                <div className="global-nav-inner">
                    <nav className="global-nav-links" aria-label="Navegação principal">
                        {globalNav.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="global-nav-actions">
                        <Link to="/contato" className="btn btn-dark">Contato</Link>
                    </div>
                </div>
            </header>

            <div className="sub-nav">
                <div className="sub-nav-inner">
                    <Link to="/" className="sub-nav-brand" aria-label="INFOCO Gestão Pública, início">
                        <img src="/logo-infoco.png" alt="INFOCO Gestão Pública" width={106} height={34} />
                    </Link>

                    <nav className="sub-nav-links" aria-label="Navegação do produto">
                        {subNav.map(item => (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive && !item.to.includes('#') ? 'is-active' : undefined
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="sub-nav-right">
                        <a
                            className="btn btn-primary"
                            href={SISTEMA}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Acessar o sistema
                        </a>
                        <button
                            className={`hamburger${open ? ' is-open' : ''}`}
                            onClick={() => setOpen(v => !v)}
                            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                            aria-expanded={open}
                        >
                            <span /><span />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        className="mobile-sheet"
                        aria-label="Menu"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: EASE_EXPO }}
                    >
                        {globalNav.map((item, i) => (
                            <motion.div
                                key={item.to}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.05 + i * 0.04 }}
                            >
                                <NavLink to={item.to} end={item.end}>{item.label}</NavLink>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.05 + globalNav.length * 0.04 }}
                        >
                            <NavLink to="/contato">Contato</NavLink>
                        </motion.div>
                        <div className="mobile-cta">
                            <a className="btn btn-primary" href={SISTEMA} target="_blank" rel="noopener noreferrer">
                                Acessar o sistema
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
