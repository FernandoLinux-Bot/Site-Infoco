import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="app-footer">
        <div className="container">
            <div className="footer-mark">
                <h2 className="footer-mark-headline">
                    Vamos construir<br />uma gestão pública <em>mais inteligente</em>.
                </h2>
                <div className="footer-mark-meta">
                    Infoco Gestão Pública<br />
                    Itabuna · BA<br />
                    Est. 2014
                </div>
            </div>

            <div className="footer-grid">
                <div className="footer-column">
                    <h4>Sobre</h4>
                    <p>
                        Empresa especializada no desenvolvimento de soluções em software voltadas exclusivamente para a gestão pública: ferramentas que simplificam processos, ampliam o controle administrativo e fortalecem a tomada de decisão.
                    </p>
                </div>
                <div className="footer-column">
                    <h4>Navegação</h4>
                    <ul className="footer-links">
                        <li><Link to="/" className="footer-link">Início</Link></li>
                        <li><Link to="/solucoes" className="footer-link">Soluções</Link></li>
                        <li><Link to="/institucional" className="footer-link">Institucional</Link></li>
                        <li><Link to="/noticias" className="footer-link">Notícias</Link></li>
                        <li><Link to="/contato" className="footer-link">Contato</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Recursos</h4>
                    <ul className="footer-links">
                        <li><a href="https://app2.infocolicitacoes.com.br/cadastro/" target="_blank" rel="noopener noreferrer" className="footer-link">Plataforma</a></li>
                        <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>FAQ</a></li>
                        <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Trabalhe Conosco</a></li>
                        <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>LGPD</a></li>
                        <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Política de Privacidade</a></li>
                    </ul>
                </div>
                <div className="footer-column footer-contact">
                    <h4>Contato</h4>
                    <ul>
                        <li><strong>Telefone</strong><span>(73) 3301-2710</span></li>
                        <li><strong>Comercial</strong><span>(71) 98205-3822</span></li>
                        <li><strong>Suporte</strong><span>(73) 98101-9313</span></li>
                    </ul>
                    <address className="footer-address">
                        <a href="mailto:contato@infocogestaopublica.com.br">contato@infocogestaopublica.com.br</a><br />
                        Av. Princesa Isabel, 1206, 2º andar<br />
                        São Caetano, Itabuna/BA, 45607-127<br />
                        CNPJ: 46.554.439/0001-67
                    </address>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Infoco Gestão Pública Ltda.</p>
                <p>Todos os direitos reservados</p>
            </div>
        </div>
    </footer>
);

export default Footer;
