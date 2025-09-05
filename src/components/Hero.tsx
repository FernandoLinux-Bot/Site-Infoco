import React from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const cards = [
    {
        front: { title: 'Transparência', text: 'Gestão clara e acessível.' },
        back: { text: 'Informações em tempo real para todos os cidadãos.' }
    },
    {
        front: { title: 'Licitações', text: 'Processos simplificados.' },
        back: { text: 'Acompanhe editais e resultados de forma digital.' }
    },
    {
        front: { title: 'Inovação', text: 'Tecnologia na gestão.' },
        back: { text: 'Modernize processos com soluções inteligentes.' }
    }
];

const Hero = () => (
    <motion.section
        className="hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
    >
        <div className="hero-content">
            <motion.h1 variants={itemVariants}>INFOCO</motion.h1>
            <motion.h2 variants={itemVariants}>GESTÃO PÚBLICA</motion.h2>
            <motion.p variants={itemVariants}>
                Soluções inovadoras para modernizar a gestão pública e otimizar resultados.<br />
                Conheça nosso <strong>Portal de Licitações</strong>.
            </motion.p>
            <motion.a href="#" className="cta-button" variants={itemVariants}>
                Acessar Portal
            </motion.a>

            <motion.div className="hero-cards" variants={containerVariants}>
                {cards.map((card, index) => (
                    <motion.div className="hero-card" key={index} variants={itemVariants}>
                        <div className="hero-card-inner">
                            <div className="hero-card-front">
                                <h3>{card.front.title}</h3>
                                <p>{card.front.text}</p>
                            </div>
                            <div className="hero-card-back">
                                <p>{card.back.text}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.section>
);

export default Hero;
