import React, { useState, useRef } from 'react';

type Page = 'home' | 'fornecedor' | 'cadastro' | 'sicc' | 'amx-digital' | 'contact';

interface HeaderProps {
    setCurrentPage: (page: Page) => void;
}

interface DropdownItemProps {
    href: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
const DropdownItem: React.FC<DropdownItemProps> = ({ href, children, onClick }) => (
    <li><a href={href} className="dropdown-item" onClick={onClick}>{children}</a></li>
);

interface DropdownProps {
    title: string;
    children: React.ReactNode;
}
const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        // If there's a pending timeout to close the menu, clear it
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        // Set a timer to close the dropdown after a short delay
        timeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
        }, 200); // A 200ms delay provides a smoother user experience
    };

    return (
        <li
            className="nav-item dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                {title}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </a>
            {isOpen && (
                <ul className="dropdown-menu">
                    {children}
                </ul>
            )}
        </li>
    );
};

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
    };

    return (
        <header className="app-header">
            <div className="container nav-container">
                <a onClick={() => handleNavClick('home')} className="logo" style={{ cursor: 'pointer' }}>
                    <img src="/Logo.png" alt="INFOCO Logo" />
                </a>
                <nav className={isMobileMenuOpen ? 'nav-open' : ''}>
                    <ul className="nav-links">
                        <li><a onClick={() => handleNavClick('fornecedor')} className="nav-link">Fornecedor</a></li>
                        <Dropdown title="Soluções">
                            <DropdownItem href="#" onClick={(e) => { e.preventDefault(); handleNavClick('sicc'); }}>SICC</DropdownItem>
                            <DropdownItem href="#" onClick={(e) => { e.preventDefault(); handleNavClick('amx-digital'); }}>AMX Digital</DropdownItem>
                        </Dropdown>
                        <li><a onClick={() => handleNavClick('cadastro')} className="nav-link">Cadastrar</a></li>
                        <li><a onClick={() => handleNavClick('contact')} className="nav-link">Contato</a></li>
                    </ul>
                </nav>
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
        </header>
    );
};

export default Header;
