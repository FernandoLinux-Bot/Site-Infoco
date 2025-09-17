import { motion } from "framer-motion";
import { FaLandmark, FaMicrochip, FaShieldAlt, FaChartLine } from "react-icons/fa";

export default function BannerGestaoPublica() {
  const floatingIcons = [
    { icon: <FaLandmark size={40} />, delay: 0 },
    { icon: <FaMicrochip size={40} />, delay: 0.3 },
    { icon: <FaShieldAlt size={40} />, delay: 0.6 },
    { icon: <FaChartLine size={40} />, delay: 0.9 },
  ];

  return (
    <div className="gestao-publica-banner">
      {/* Animação de fundo com gradiente em movimento */}
      <motion.div
        className="bg-gradient-motion"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Conteúdo principal */}
      <motion.div
        className="banner-main-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="main-icon-container">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="main-icon-wrapper"
          >
            <FaLandmark size={50} />
          </motion.div>
        </div>

        <h1 className="banner-title">
          Parceiros da Gestão Pública
        </h1>
        <p className="banner-subtitle">
          "Unimos tecnologia, conhecimento e experiência para entregar confiança, segurança e resultados."
        </p>
      </motion.div>

      {/* Ícones flutuantes */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="floating-icon"
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{
            top: `${15 + (index % 2 === 0 ? 0 : 50)}%`,
            left: `${10 + index * 22}%`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
