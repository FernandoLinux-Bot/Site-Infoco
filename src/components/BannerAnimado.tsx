import { motion } from "framer-motion";
import { FaStar, FaMicrochip, FaChartBar, FaShieldAlt } from "react-icons/fa";

export default function BannerAnimado() {
  return (
    <section className="banner-animado">
      {/* Fundo animado com shapes e partículas */}
      <div className="banner-animado-bg">
        <motion.div
          className="banner-shape-1"
          animate={{
            x: [0, 120, -120, 0],
            y: [0, -80, 80, 0],
            rotate: [0, 45, -45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="banner-shape-2"
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Ícone principal animado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="banner-main-icon"
      >
        <FaStar className="banner-sparkles-icon" />
      </motion.div>

      {/* Conteúdo principal */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="banner-title"
      >
        Soluções Completas para a Gestão Pública
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="banner-subtitle-text"
      >
        Tecnologia e inovação para transformar a administração pública, garantindo
        eficiência, transparência e economia.
      </motion.p>

      {/* Ícones representativos animados em cascata + brilho */}
      <div className="banner-features-grid">
        {[{
          icon: <FaMicrochip className="banner-feature-icon" />, label: "Inovação Tecnológica"
        }, {
          icon: <FaChartBar className="banner-feature-icon" />, label: "Eficiência e Resultados"
        }, {
          icon: <FaShieldAlt className="banner-feature-icon" />, label: "Transparência e Segurança"
        }].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 + index * 0.3 }}
            whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
            className="banner-feature-item"
          >
            <motion.div
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            >
              {item.icon}
            </motion.div>
            <p className="banner-feature-label">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
