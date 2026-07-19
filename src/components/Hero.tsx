import { motion, Variants, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { FaCheckCircle, FaFileContract, FaChartLine, FaBoxes, FaShieldAlt, FaBalanceScale, FaSearchDollar, FaLock } from "react-icons/fa";

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
    transition: { duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const compliance = [
  { icon: <FaBalanceScale />, label: "Lei 14.133/2021", description: "Nova Lei de Licitações e Contratos" },
  { icon: <FaSearchDollar />, label: "IN 65/2021", description: "Pesquisa de preços conforme SEGES/ME" },
  { icon: <FaShieldAlt />, label: "LGPD", description: "Lei Geral de Proteção de Dados" },
  { icon: <FaLock />, label: "Dados em nuvem", description: "Infraestrutura segura e auditável" },
];

const Hero = () => {
  const reduce = useReducedMotion();

  // Parallax 3D: o palco de cards inclina seguindo o cursor.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 120, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => { px.set(0.5); py.set(0.5); };

  return (
    <section className="hero">
      <div className="hero-mesh" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          {/* TEXT SIDE */}
          <div className="hero-text">
            <motion.span className="eyebrow" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              Software de Gestão Pública
            </motion.span>

            <motion.h1 className="hero-headline" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              Modernizando a <em>gestão pública</em>.
            </motion.h1>

            <motion.p className="hero-lede" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              Sistemas integrados de licitação, contratos, patrimônio e protocolo
              para prefeituras e câmaras, em total conformidade com a Lei 14.133/2021.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <a href="https://app2.infocolicitacoes.com.br/cadastro/" target="_blank" rel="noopener noreferrer" className="cta-button">
                Acessar plataforma
                <span className="cta-icon-wrapper"><ArrowIcon /></span>
              </a>
              <a href="#solucoes" className="cta-button cta-button-outline">
                Ver soluções
              </a>
            </motion.div>

            <motion.div className="hero-trustline" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              <span className="hero-trustline-avatars">
                <span>AL</span>
                <span>IT</span>
                <span>NV</span>
                <span>+4</span>
              </span>
              <span className="hero-trustline-text">
                <strong>Mais de 70 prefeituras</strong> já confiam na INFOCO.
              </span>
            </motion.div>
          </div>

          {/* VISUAL SIDE — palco 3D com parallax */}
          <div className="hero-visual" aria-hidden="true" onMouseMove={handleMove} onMouseLeave={handleLeave}>
            <motion.div
              style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}
            >
              <div className="hero-confetti">
                <span className="c1" /><span className="c2" /><span className="c3" /><span className="c4" />
              </div>

              <motion.div className="hero-card hero-card-1" variants={cardFloat} custom={0} initial="hidden" animate="visible">
                <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="hero-card-label"><span className="pill" /> Licitação aprovada</span>
                  <div className="hero-card-title" style={{ marginTop: "0.4rem" }}>Pregão Eletrônico Nº 042/2026</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", color: "#16A34A", fontWeight: 600, fontSize: "0.85rem" }}>
                    <FaCheckCircle /> Homologada
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="hero-card hero-card-2" variants={cardFloat} custom={1} initial="hidden" animate="visible">
                <motion.div animate={reduce ? undefined : { y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="hero-card-icon"><FaChartLine /></div>
                    <div>
                      <span className="hero-card-label">Economia anual</span>
                      <div className="hero-card-value" style={{ marginTop: "0.15rem" }}>R$ 2,4M <small>+18%</small></div>
                    </div>
                  </div>
                  <div className="hero-card-bar" style={{ marginTop: "0.75rem" }}>
                    <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 0.72 }} transition={{ duration: 1.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }} />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="hero-card hero-card-3" variants={cardFloat} custom={2} initial="hidden" animate="visible">
                <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="hero-card-icon"><FaFileContract /></div>
                    <div>
                      <span className="hero-card-label">Contratos</span>
                      <div className="hero-card-value" style={{ marginTop: "0.15rem" }}>127 <small>ativos</small></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="hero-card hero-card-4" variants={cardFloat} custom={3} initial="hidden" animate="visible">
                <motion.div animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <div className="hero-card-icon"><FaBoxes /></div>
                    <div>
                      <span className="hero-card-label">Patrimônio</span>
                      <div className="hero-card-title" style={{ marginTop: "0.15rem", fontSize: "0.92rem" }}>Inventário 2026</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* COMPLIANCE BAR */}
        <motion.div
          className="hero-compliance"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-compliance-label">Em conformidade com</div>
          <div className="hero-compliance-grid">
            {compliance.map((c) => (
              <div className="hero-compliance-item" key={c.label}>
                <div className="hero-compliance-icon">{c.icon}</div>
                <div className="hero-compliance-text">
                  <strong>{c.label}</strong>
                  <span>{c.description}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
