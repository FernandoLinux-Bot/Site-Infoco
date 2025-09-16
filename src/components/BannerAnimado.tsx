import { motion, Variants } from "framer-motion";
import { FaLandmark } from "react-icons/fa";

// Fix: Add Variants type to ensure the object structure is correct for framer-motion.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

// Fix: Add Variants type to fix type incompatibility for `transition` prop.
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Fix: Add Variants type to fix type incompatibility for `transition` prop.
const iconVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};


export default function BannerAnimado() {
  return (
    <motion.section
      className="hero-card-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-card-icon-wrapper" variants={iconVariants}>
        <FaLandmark className="hero-card-icon" />
      </motion.div>

      <motion.h1 className="hero-card-title" variants={itemVariants}>
        Parceiros da Gestão Pública
      </motion.h1>
      
      <motion.p className="hero-card-subtitle" variants={itemVariants}>
        "Unimos tecnologia, conhecimento e experiência para entregar confiança, segurança e resultados."
      </motion.p>
    </motion.section>
  );
}
