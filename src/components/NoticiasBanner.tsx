import { motion } from "framer-motion";
// Fix: Replaced `FaMegaphone` with `FaBullhorn` as it is not an exported member of 'react-icons/fa'.
import { FaNewspaper, FaBullhorn, FaChartBar, FaGlobe } from "react-icons/fa";

export default function NoticiasBanner() {
  const floatingIcons = [
    { icon: <FaNewspaper size={38} />, delay: 0 },
    { icon: <FaBullhorn size={38} />, delay: 0.4 },
    { icon: <FaChartBar size={38} />, delay: 0.8 },
    { icon: <FaGlobe size={38} />, delay: 1.2 },
  ];

  return (
    <div className="noticias-banner-section">
      {/* Fundo animado */}
      <motion.div
        className="noticias-banner-bg-motion"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Conteúdo principal */}
      <motion.div
        className="noticias-banner-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="noticias-banner-title">
          Últimas Notícias
        </h1>

        <motion.p
          className="noticias-banner-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Mantenha-se atualizado com as informações mais recentes
          sobre o universo da gestão pública e licitações.
        </motion.p>
      </motion.div>

      {/* Ícones flutuantes */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="noticias-floating-icon"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{
            top: `${25 + index * 15}%`,
            left: `${15 + index * 20}%`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
