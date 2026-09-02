import { Link } from 'react-router-dom';
import { CONHECER, SISTEMA } from '../data/links';

const ANO = new Date().getFullYear();

const Footer = () => (
    <footer className="site-footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-col footer-brand">
                    <img src="/logo-infoco.png" alt="INFOCO Gestão Pública" width={148} height={47} loading="lazy" />
                    <p>
                        Software de gestão pública para prefeituras, câmaras e consórcios.
                        O SICC cobre o ciclo inteiro da contratação sob a Lei 14.133/2021.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Produto</h4>
                    <Link to="/sicc">O SICC</Link>
                    <Link to="/solucoes">Módulos</Link>
                    <Link to="/sicc#fluxo">Fluxo da contratação</Link>
                    <Link to="/sicc#perguntas">Perguntas frequentes</Link>
                    <a href={CONHECER} target="_blank" rel="noopener noreferrer">Conhecer o sistema</a>
                    <a href={SISTEMA} target="_blank" rel="noopener noreferrer">Central de Ajuda</a>
                </div>

                <div className="footer-col">
                    <h4>Institucional</h4>
                    <Link to="/institucional">Quem somos</Link>
                    <Link to="/noticias">Notícias</Link>
                    <Link to="/fornecedor">Para fornecedores</Link>
                    <Link to="/trabalhe-conosco">Trabalhe conosco</Link>
                    <Link to="/cadastro">Solicitar cadastro</Link>
                </div>

                <div className="footer-col">
                    <h4>Contato</h4>
                    <a href="tel:+557333012710">(73) 3301-2710</a>
                    <a href="https://wa.me/5573981185210" target="_blank" rel="noopener noreferrer">Administrativo</a>
                    <a href="https://wa.me/5571982053822" target="_blank" rel="noopener noreferrer">Comercial</a>
                    <a href="https://wa.me/5573981019313" target="_blank" rel="noopener noreferrer">Suporte</a>
                    <a href="mailto:contato@infocogestaopublica.com.br">contato@infocogestaopublica.com.br</a>
                </div>
            </div>

            <div className="footer-legal">
                <span>
                    Av. Princesa Isabel, 1206 — 2º andar, salas 201/202, São Caetano, Itabuna/BA, 45607-127
                </span>
                <span>
                    © {ANO} INFOCO Gestão Pública Ltda. — CNPJ 46.554.439/0001-67
                </span>
            </div>
        </div>
    </footer>
);

export default Footer;
