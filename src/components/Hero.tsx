import React from 'react';
import { motion, Variants } from 'framer-motion';

// Main container variant to stagger children elements
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Variant for simple fade-in items like paragraphs and buttons
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// Variant for the title containers (h1, h2) to stagger letters
const sentenceVariants: Variants = {
  hidden: { opacity: 1 }, // Parent handles initial opacity
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

// Variant for each individual letter's initial animation
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
    }
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

const Particles = () => (
    <div className="hero-particles">
        {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="particle" />
        ))}
    </div>
);


const Hero = () => {
    const titleText = "INFOCO".split("");
    const subtitleText = "GESTÃO PÚBLICA".split("");

    return (
        <motion.section
            className="hero"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Particles />
            <div className="hero-content">
                <motion.h1
                    className="animated-title"
                    variants={sentenceVariants}
                >
                    {titleText.map((char, index) => (
                        <motion.span 
                            key={`title-${index}`} 
                            variants={letterVariants}
                            animate={{
                                y: [0, -4, 0],
                                transition: {
                                    delay: 1.5 + index * 0.1,
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    ease: 'easeInOut'
                                }
                            }}
                             whileHover={{ scale: 1.15, color: 'var(--accent-color)', transition: { duration: 0.2 } }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>
                <motion.h2
                    className="animated-subtitle"
                    variants={sentenceVariants}
                >
                     {subtitleText.map((char, index) => (
                        <motion.span 
                            key={`subtitle-${index}`} 
                            variants={letterVariants}
                            animate={{
                                y: [0, 3, 0],
                                transition: {
                                    delay: 2 + index * 0.08,
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    ease: 'easeInOut'
                                }
                            }}
                            whileHover={{ scale: 1.1, color: 'var(--primary-color)', transition: { duration: 0.2 } }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </motion.h2>
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
};

export default Hero;
