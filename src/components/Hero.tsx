import { motion, Variants } from "framer-motion";
import { FaCheckCircle, FaFileContract, FaChartLine, FaBoxes } from "react-icons/fa";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardFloat: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.5 + i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-mesh" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          {/* TEXT SIDE */}
          <div className="hero-text">
            <motion.span
              className="eyebrow"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Software de Gestão Pública
            </motion.span>

            <motion.h1
              className="hero-headline"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Modernizando <br className="hide-sm" />
              a <span className="serif">gestão pública</span>.
            </motion.h1>

            <motion.p
              className="hero-lede"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Sistemas integrados de licitação, contratos, patrimônio e protocolo
              para prefeituras, câmaras e órgãos públicos. Tecnologia que entrega
              eficiência, transparência e segurança jurídica.
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <a
                href="https://app2.infocolicitacoes.com.br/cadastro/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Acessar plataforma
                <span className="cta-icon-wrapper"><ArrowIcon /></span>
              </a>
              <a href="#solucoes" className="cta-button cta-button-outline">
                Ver soluções
              </a>
            </motion.div>

            <motion.div
              className="hero-trustline"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <span className="hero-trustline-avatars">
                <span>AL</span>
                <span>IT</span>
                <span>NV</span>
                <span>+4</span>
              </span>
              <span>Mais de 7 prefeituras já confiam na INFOCO.</span>
            </motion.div>
          </div>

          {/* VISUAL SIDE — animated floating cards */}
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-confetti">
              <span className="c1" />
              <span className="c2" />
              <span className="c3" />
              <span className="c4" />
            </div>

            <motion.div
              className="hero-card hero-card-1"
              variants={cardFloat}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="hero-card-label">
                  <span className="pill" /> Licitação aprovada
                </span>
                <div className="hero-card-title" style={{ marginTop: "0.4rem" }}>
                  Pregão Eletrônico Nº 042/2026
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", color: "var(--blue)", fontWeight: 600, fontSize: "0.85rem" }}>
                  <FaCheckCircle /> Homologada
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-card hero-card-2"
              variants={cardFloat}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="hero-card-icon"><FaChartLine /></div>
                  <div>
                    <span className="hero-card-label">Economia anual</span>
                    <div className="hero-card-value" style={{ marginTop: "0.15rem" }}>
                      R$ 2,4M <small>+18%</small>
                    </div>
                  </div>
                </div>
                <div className="hero-card-bar" style={{ marginTop: "0.75rem" }}>
                  <motion.i
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 0.72 }}
                    transition={{ duration: 1.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-card hero-card-3"
              variants={cardFloat}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="hero-card-icon"><FaFileContract /></div>
                  <div>
                    <span className="hero-card-label">Contratos</span>
                    <div className="hero-card-value" style={{ marginTop: "0.15rem" }}>
                      127 <small>ativos</small>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-card hero-card-4"
              variants={cardFloat}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div className="hero-card-icon"><FaBoxes /></div>
                  <div>
                    <span className="hero-card-label">Patrimônio</span>
                    <div className="hero-card-title" style={{ marginTop: "0.15rem", fontSize: "0.92rem" }}>
                      Inventário 2026
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
