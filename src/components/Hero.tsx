import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const marqueeWords = [
  "Licitações",
  "Contratos",
  "Patrimônio",
  "Almoxarifado",
  "Protocolo",
  "Lei 14.133/2021",
  "Transparência",
  "Compras Públicas",
  "Banco de Preços",
  "PCA",
];

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <motion.div
          className="hero-eyebrow-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span>Edição 01 — Itabuna, BA</span>
          <span>Software para Gestão Pública / Est. 2014</span>
        </motion.div>

        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <h1 className="hero-headline">
              <motion.span
                style={{ display: "block" }}
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              >
                Modernizando
              </motion.span>
              <motion.span
                style={{ display: "block" }}
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              >
                a <span className="accent-word">gestão pública</span>.
              </motion.span>
            </h1>

            <motion.p className="hero-lede" variants={itemVariants}>
              Sistemas integrados de licitação, contratos, patrimônio e protocolo
              para prefeituras, câmaras e órgãos públicos. Tecnologia que entrega
              eficiência, transparência e segurança jurídica.
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <a
                href="https://app2.infocolicitacoes.com.br/cadastro/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Acessar plataforma
                <span className="cta-icon-wrapper">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href="#solucoes" className="cta-button cta-button-outline">
                Ver soluções
              </a>
            </motion.div>
          </div>

          <motion.aside className="hero-aside" variants={itemVariants}>
            <div className="hero-aside-row">
              <span className="label">Sede</span>
              <span className="value">
                Itabuna, <em>Bahia</em>
              </span>
            </div>
            <div className="hero-aside-row">
              <span className="label">Atendimento</span>
              <span className="value">
                Prefeituras &<br /> Câmaras Municipais
              </span>
            </div>
            <div className="hero-aside-row">
              <span className="label">Marco Legal</span>
              <span className="value">
                Lei <em>14.133/2021</em>
              </span>
            </div>
          </motion.aside>
        </motion.div>

        <motion.div
          className="hero-marquee"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <div className="hero-marquee-track">
            <span>
              {[...marqueeWords, ...marqueeWords].map((word, i) => (
                <span key={i}>
                  {word}
                  <span className="dot" />
                </span>
              ))}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
