import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaArrowUp } from 'react-icons/fa';
import { EASE_EXPO } from './motion';
import { INSTAGRAM, WHATSAPP_SUPORTE } from '../data/links';


const FloatingActions = () => {
    const [showTop, setShowTop] = useState(false);
    const [rolou, setRolou] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setShowTop(y > 600);
            // No celular a pilha só entra depois que a pessoa sai do hero: parada
            // ali, ela cobria justamente o parágrafo de abertura.
            setRolou(y > 320);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`float-stack${rolou ? ' is-rolado' : ''}`}>
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        key="top"
                        className="float-btn"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Voltar ao topo"
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 8 }}
                        transition={{ duration: 0.35, ease: EASE_EXPO }}
                    >
                        <FaArrowUp aria-hidden="true" />
                    </motion.button>
                )}
            </AnimatePresence>

            <a
                className="float-btn"
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da INFOCO"
            >
                <FaInstagram aria-hidden="true" />
            </a>
            <a
                className="float-btn"
                href={WHATSAPP_SUPORTE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com o suporte no WhatsApp"
            >
                <FaWhatsapp aria-hidden="true" />
            </a>
        </div>
    );
};

export default FloatingActions;
