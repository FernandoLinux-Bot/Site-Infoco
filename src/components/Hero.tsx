import { motion } from "framer-motion";
import { MdSearch, MdDescription, MdCheckCircle, MdLink } from "react-icons/md";

export default function Hero() {
  return (
    <section className="banner-section">
      {/* Fundo com formas azuis animadas */}
      <div className="banner-animated-bg">
        <motion.div
          className="banner-bg-shape shape-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, x: [0, 80, 0] }}
          transition={{
            opacity: { duration: 1.5, ease: "easeOut" },
            y: { duration: 1.5, ease: "easeOut" },
            x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="banner-bg-shape shape-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: [0, 50, 0], x: [0, -70, 0] }}
          transition={{
            opacity: { duration: 1.5, ease: "easeOut", delay: 0.2 },
            y: { duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 },
            x: { duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 },
          }}
        />
        <motion.div
          className="banner-bg-shape shape-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{
            opacity: { duration: 1.5, ease: "easeOut", delay: 0.4 },
            scale: { duration: 32, repeat: Infinity, ease: "easeInOut", delay: 8 },
          }}
        />
      </div>

      {/* Fundo com grade de tecnologia animada */}
      <div className="banner-grid-bg">
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 2, ease: "easeIn" },
            rotate: { duration: 90, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="container banner-content">
        {/* Texto */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="banner-text"
        >
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Modernizando a{" "}
            <span className="gradient-text">
              Gestão Pública
            </span>
          </motion.h1>

          <p>
            Simplifique processos de licitação, aumente a transparência e
            conecte fornecedores com a administração pública de forma ágil e
            digital.
          </p>

          <div className="banner-buttons">
            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                className="banner-button banner-button-primary"
                onClick={() => window.open('https://app2.infocolicitacoes.com.br/cadastro/', '_blank', 'noopener,noreferrer')}
              >
                <MdDescription className="icon" /> Cadastrar
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                className="banner-button banner-button-outline"
                onClick={() => window.open('https://app2.infocolicitacoes.com.br/cadastro/', '_blank', 'noopener,noreferrer')}
              >
                <MdSearch className="icon" /> Pesquisar Processos
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Ilustração com ícones flat animados */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="banner-illustration"
        >
          {/* Imagem principal */}
          <motion.img
            src="/patrao.png"
            alt="Gestão Pública"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ícones decorativos (Flat Design) */}
          <motion.div
            className="banner-deco-1"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MdCheckCircle size={50} />
          </motion.div>

          <motion.div
            className="banner-deco-2"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <MdLink size={52} />
          </motion.div>

          <motion.div
            className="banner-deco-3"
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <MdDescription size={46} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
