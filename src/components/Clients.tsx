import { Reveal, Stagger, StaggerItem } from './motion';

const CLIENTES = [
    { nome: 'Almadina', logo: '/clients/almadina.png' },
    { nome: 'Itamaraju', logo: '/clients/itamaraju.png' },
    { nome: 'Nova Viçosa', logo: '/clients/nova-vicosa.png' },
    { nome: 'Itororó', logo: '/clients/itororo.png' },
    { nome: 'Anagé', logo: '/clients/anage.png' },
    { nome: 'Itabela', logo: '/clients/itabela.png' },
    { nome: 'Prado', logo: '/clients/prado.png' },
];

const Clients = () => (
    <section className="tile tile--parchment">
        <div className="container container-mid">
            <Reveal>
                <div className="tile-head">
                    <span className="eyebrow">Quem já usa</span>
                    <h2 className="t-display">Municípios que operam no SICC.</h2>
                    <p className="t-body">
                        Prefeituras, câmaras e consórcios da Bahia conduzem suas contratações dentro do sistema.
                    </p>
                </div>
            </Reveal>

            <Stagger className="client-strip" staggerChildren={0.06}>
                {CLIENTES.map(c => (
                    <StaggerItem key={c.nome}>
                        <figure style={{ margin: 0 }}>
                            <img src={c.logo} alt={`Brasão de ${c.nome}`} loading="lazy" />
                            <figcaption>{c.nome}</figcaption>
                        </figure>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

export default Clients;
