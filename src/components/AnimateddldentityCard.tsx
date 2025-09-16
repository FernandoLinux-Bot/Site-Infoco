import React from 'react';
import { motion, Variants } from "framer-motion";
import { FaBuilding, FaMicrochip, FaBookOpen, FaChartLine } from "react-icons/fa";

// Fix: Add Variants type to ensure the object structure is correct for framer-motion.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.3 
    }
  },
};

// Fix: Add Variants type for consistency.
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Fix: Add Variants type to fix type incompatibility for `transition` prop.
const iconContainerVariants: Variants = {
    rotate: {
        rotate: 360,
        transition: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
        },
    },
};

// Fix: Add Variants type to fix type incompatibility for `transition` prop.
const iconItemVariants: Variants = {
    rotate: {
        rotate: -360,
        transition: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
        },
    }
};

const AnimatedIdentityCard: React.FC = () => {
  return (
    <motion.div 
      className="identity-card animated"
      variants={cardVariants}
    >
      <div className="identity-card-icon-container">
        <motion.div 
            className="orbiting-icons"
            variants={iconContainerVariants}
            animate="rotate"
        >
            <motion.div className="orbiting-icon icon-1" variants={iconItemVariants}><FaMicrochip /></motion.div>
            <motion.div className="orbiting-icon icon-2" variants={iconItemVariants}><FaBookOpen /></motion.div>
            <motion.div className="orbiting-icon icon-3" variants={iconItemVariants}><FaChartLine /></motion.div>
        </motion.div>
        <motion.div 
          className="central-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        >
            <FaBuilding />
        </motion.div>
      </div>
      
      <motion.h3 variants={textVariants}>Parceiros da Gestão Pública</motion.h3>
      <motion.p variants={textVariants}>
        "Unimos tecnologia, conhecimento e experiência para entregar confiança, segurança e resultados."
      </motion.p>
    </motion.div>
  );
};

export default AnimatedIdentityCard;
