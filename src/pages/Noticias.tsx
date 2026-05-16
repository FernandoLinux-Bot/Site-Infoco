import { motion, Variants } from 'framer-motion';
import { FaInstagram, FaHeart, FaRegComment } from 'react-icons/fa';

const PROFILE_URL = 'https://www.instagram.com/infocogestaopublica/';
const HANDLE = '@infocogestaopublica';

interface PostPreview {
    id: string;
    caption: string;
    type: 'photo' | 'video' | 'carousel';
    likes: number;
    comments: number;
    gradient: string;
}

const posts: PostPreview[] = [
    {
        id: '1',
        caption: 'Nova Lei 14.133/2021: o que muda nas licitações públicas a partir de 2024.',
        type: 'photo',
        likes: 142,
        comments: 18,
        gradient: 'linear-gradient(135deg, #2253F0 0%, #6F8DFF 100%)',
    },
    {
        id: '2',
        caption: 'Conheça o módulo de Banco de Preços da INFOCO — cotação em menos de 2 minutos.',
        type: 'video',
        likes: 287,
        comments: 32,
        gradient: 'linear-gradient(135deg, #0F2FA0 0%, #2253F0 100%)',
    },
    {
        id: '3',
        caption: 'Caso de sucesso: Prefeitura de Almadina moderniza sua gestão de contratos.',
        type: 'carousel',
        likes: 196,
        comments: 24,
        gradient: 'linear-gradient(135deg, #2253F0 0%, #FFD338 100%)',
    },
    {
        id: '4',
        caption: 'PCA — Plano de Contratações Anual: como planejar com inteligência.',
        type: 'photo',
        likes: 154,
        comments: 21,
        gradient: 'linear-gradient(135deg, #1B43C9 0%, #DDE6FF 100%)',
    },
    {
        id: '5',
        caption: 'Webinar: IN 65/2021 e a pesquisa de preços conforme a SEGES/ME.',
        type: 'video',
        likes: 312,
        comments: 41,
        gradient: 'linear-gradient(135deg, #FFD338 0%, #2253F0 100%)',
    },
    {
        id: '6',
        caption: 'Equipe INFOCO em mais um treinamento para gestores municipais.',
        type: 'photo',
        likes: 268,
        comments: 35,
        gradient: 'linear-gradient(135deg, #6F8DFF 0%, #0F2FA0 100%)',
    },
    {
        id: '7',
        caption: 'Sistema de Protocolo Web: organize processos e documentos com transparência total.',
        type: 'carousel',
        likes: 174,
        comments: 19,
        gradient: 'linear-gradient(135deg, #2253F0 0%, #1B43C9 100%)',
    },
    {
        id: '8',
        caption: 'Patrimônio Público: controle integrado de bens móveis, imóveis e intangíveis.',
        type: 'photo',
        likes: 201,
        comments: 27,
        gradient: 'linear-gradient(135deg, #0E1A3D 0%, #2253F0 100%)',
    },
    {
        id: '9',
        caption: 'INFOCO no Encontro UPB: levando tecnologia para gestores de toda a Bahia.',
        type: 'photo',
        likes: 245,
        comments: 38,
        gradient: 'linear-gradient(135deg, #FFD338 0%, #FF8A33 100%)',
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const PostIcon = ({ type }: { type: PostPreview['type'] }) => {
    if (type === 'video') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M8 5v14l11-7z" />
            </svg>
        );
    }
    if (type === 'carousel') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <rect x="3" y="3" width="14" height="14" rx="2" />
                <path d="M7 21h12a2 2 0 002-2V9" />
            </svg>
        );
    }
    return null;
};

const Noticias = () => {
    return (
        <>
            <section className="instagram-hero">
                <div className="container">
                    <div className="instagram-profile">
                        <div className="instagram-avatar">
                            <FaInstagram />
                        </div>
                        <div className="instagram-profile-info">
                            <div className="instagram-handle">
                                <h1>{HANDLE}</h1>
                                <a
                                    href={PROFILE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cta-button"
                                >
                                    Seguir
                                </a>
                            </div>
                            <p className="instagram-bio">
                                <strong>INFOCO Gestão Pública</strong><br />
                                Tecnologia para licitações, contratos, patrimônio e protocolo.<br />
                                Itabuna · Bahia · Estabelecida em 2014.
                            </p>
                            <div className="instagram-stats">
                                <div><strong>{posts.length}+</strong><span>publicações</span></div>
                                <div><strong>70+</strong><span>prefeituras</span></div>
                                <div><strong>10</strong><span>anos de mercado</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="instagram-feed">
                <div className="container">
                    <motion.div
                        className="instagram-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.05 }}
                    >
                        {posts.map((post) => (
                            <motion.a
                                key={post.id}
                                href={PROFILE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="instagram-post"
                                style={{ background: post.gradient }}
                                variants={itemVariants}
                            >
                                <span className="instagram-post-type">
                                    <PostIcon type={post.type} />
                                </span>
                                <div className="instagram-post-overlay">
                                    <div className="instagram-post-stats">
                                        <span><FaHeart /> {post.likes.toLocaleString('pt-BR')}</span>
                                        <span><FaRegComment /> {post.comments}</span>
                                    </div>
                                    <p className="instagram-post-caption">{post.caption}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    <div className="instagram-cta">
                        <p>Mais publicações no nosso perfil.</p>
                        <a
                            href={PROFILE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button cta-button-outline"
                        >
                            <FaInstagram style={{ marginRight: '0.5rem' }} /> Ver no Instagram
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Noticias;
