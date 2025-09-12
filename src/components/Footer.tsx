import React from 'react';

type Page = 'home' | 'solucoes' | 'institucional' | 'fornecedor' | 'cadastro' | 'contact' | 'noticias';

interface FooterProps {
    setCurrentPage: (page: Page) => void;
}


const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => (
    <footer className="app-footer">
        <div className="container footer-container">
            <div className="footer-grid">
                <div className="footer-column">
                    <h4>Sobre a INFOCO</h4>
                    <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                        Somos uma empresa especializada no desenvolvimento de soluções em software voltadas exclusivamente para a gestão pública, oferecendo ferramentas que simplificam processos e fortalecem a tomada de decisão.
                    </p>
                </div>
                <div className="footer-column">
                    <h4>Navegação</h4>
                    <ul className="footer-links">
                        <li><a style={{cursor: 'pointer'}} onClick={() => setCurrentPage('home')}>Início</a></li>
                        <li><a style={{cursor: 'pointer'}} onClick={() => setCurrentPage('solucoes')}>Soluções</a></li>
                        <li><a style={{cursor: 'pointer'}} onClick={() => setCurrentPage('institucional')}>Institucional</a></li>
                        <li><a style={{cursor: 'pointer'}} onClick={() => setCurrentPage('noticias')}>Notícias</a></li>
                        <li><a style={{cursor: 'pointer'}} onClick={() => setCurrentPage('contact')}>Contato</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Demais links</h4>
                    <ul className="footer-links">
                        <li><a href="#" style={{cursor: 'pointer'}}>FAQ</a></li>
                        <li><a href="#" style={{cursor: 'pointer'}}>Trabalhe Conosco</a></li>
                        <li><a href="#" style={{cursor: 'pointer'}}>Crie sua conta grátis</a></li>
                        <li><a href="#" style={{cursor: 'pointer'}}>LGPD</a></li>
                        <li><a href="#" style={{cursor: 'pointer'}}>Política de Qualidade</a></li>
                        <li><a href="#" style={{cursor: 'pointer'}}>Política de Privacidade</a></li>
                        <li><a href="#" style={{cursor: 'pointer'}}>Código de Conduta e Ética</a></li>
                    </ul>
                </div>
                <div className="footer-column footer-contact">
                    <h4>Fale Conosco</h4>
                    <ul>
                        <li><strong>Telefone</strong><span>(73) 3301-2710</span></li>
                        <li><strong>Administrativo</strong><span>(73) 98118-5210</span></li>
                        <li><strong>Comercial</strong><span>(71) 98205-3822</span></li>
                        <li><strong>Suporte Técnico</strong><span>(73) 98101-9313</span></li>
                    </ul>
                    <address className="footer-address">
                        <a href="mailto:contato@infocogestaopublica.com.br">contato@infocogestaopublica.com.br</a><br />
                        Infoco Gestão Pública Ltda.<br />
                        CNPJ: 46.554.439/0001-67<br />
                        Avenida Princesa Isabel, nº 1206 – 2º andar, Salas 201 e 202<br />
                        Bairro São Caetano – Itabuna/BA – CEP 45607-127
                    </address>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} INFOCO GESTÃO PÚBLICA. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
