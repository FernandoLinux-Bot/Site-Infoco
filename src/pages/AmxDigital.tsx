import React from 'react';
import { motion, Variants } from 'framer-motion';

type Page = 'home' | 'fornecedor' | 'cadastro' | 'sicc' | 'amx-digital';

interface AmxDigitalProps {
  setCurrentPage: (page: Page) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const features = [
    {
        icon: '🔄',
        title: 'Rastreabilidade Total',
        description: 'Monitore todas as movimentações: entradas, saídas, transferências e requisições, garantindo um histórico completo e confiável.'
    },
    {
        icon: '⏳',
        title: 'Controle de Validade',
        description: 'Receba alertas automáticos sobre materiais próximos ao vencimento, reduza perdas e otimize o uso dos insumos.'
    },
    {
        icon: '🏢',
        title: 'Múltiplos Almoxarifados',
        description: 'Gerencie diversos estoques de forma centralizada, com dados consolidados e relatórios por unidade.'
    },
    {
        icon: '📈',
        title: 'Relatórios Inteligentes',
        description: 'Gere relatórios detalhados sobre consumo, posição de estoque e movimentações para uma gestão baseada em dados.'
    }
];

const AmxDigital: React.FC<AmxDigitalProps> = ({ setCurrentPage }) => {
  return (
    <>
      <motion.section 
        className="product-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h1>AMX Digital: Controle e Eficiência para seu Almoxarifado</h1>
          <p>Transforme a gestão de estoque com uma plataforma digital que integra entradas, saídas e controle de validade em tempo real, otimizando recursos e reduzindo desperdícios.</p>
          <button onClick={() => setCurrentPage('cadastro')} className="cta-button">
            Conheça a Solução
          </button>
        </div>
      </motion.section>

      <motion.section 
        className="product-features benefits"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <h2 className="section-title">Recursos do AMX Digital</h2>
          <p className="section-subtitle">A tecnologia que seu almoxarifado precisa para evoluir.</p>
          <div className="benefits-grid">
            {features.map((feature, index) => (
              <motion.div key={index} className="benefit-card" variants={itemVariants}>
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default AmxDigital;