import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE_EXPO } from '../components/motion';

const NotFound = () => (
    <section className="tile tile--light hero" style={{ minHeight: '62vh', display: 'grid', placeItems: 'center' }}>
        <div className="container container-narrow">
            <motion.span
                className="eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_EXPO }}
            >
                Erro 404
            </motion.span>
            <motion.h1
                className="t-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.08 }}
            >
                Esta página não existe.
            </motion.h1>
            <motion.p
                className="t-lead hero-sub"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.16 }}
            >
                O endereço pode ter mudado. Volte ao início ou conheça o SICC.
            </motion.p>
            <motion.div
                className="cta-row cta-row--center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.24 }}
            >
                <Link to="/" className="btn btn-primary">Voltar ao início</Link>
                <Link to="/sicc" className="btn btn-secondary">Conhecer o SICC</Link>
            </motion.div>
        </div>
    </section>
);

export default NotFound;
