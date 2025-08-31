import React from 'react';
import { motion, Variants } from 'framer-motion';

type Page = 'home' | 'fornecedor' | 'cadastro' | 'sicc' | 'amx-digital';

interface SiccProps {
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
        icon: '📄',
        title: 'Controle de Contratos',
        description: 'Monitore saldos, vencimentos e aditivos de forma centralizada. Evite surpresas e garanta a continuidade dos serviços.'
    },
    {
        icon: '📅',
        title: 'Gestão de Pedidos',
        description: 'Acompanhe o calendário de incidência de pedidos, organize as demandas e otimize o fluxo de aquisições.'
    },
    {
        icon: '📊',
        title: 'Análise de Gastos',
        description: 'Visualize os gastos por unidade e setor com gráficos intuitivos, facilitando o planejamento orçamentário.'
    },
    {
        icon: '🔍',
        title: 'Portal da Transparência',
        description: 'Integre os dados e cumpra as exigências legais de transparência de forma simples e eficiente.'
    }
];

const Sicc: React.FC<SiccProps> = ({ setCurrentPage }) => {
  return (
    <>
      <motion.section 
        className="product-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h1>SICC: Gestão Completa para Compras Públicas</h1>
          <p>Modernize, otimize e traga transparência para os processos de compras e contratos do seu município com o Sistema Integrado de Compras e Contratos.</p>
          <button onClick={() => setCurrentPage('cadastro')} className="cta-button">
            Solicitar Demonstração
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
          <h2 className="section-title">Funcionalidades do SICC</h2>
          <p className="section-subtitle">Uma solução completa para a gestão pública moderna.</p>
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

export default Sicc;