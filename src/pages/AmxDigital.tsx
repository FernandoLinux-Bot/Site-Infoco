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
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
        ),
        title: 'Rastreabilidade Total',
        description: 'Monitore todas as movimentações: entradas, saídas, transferências e requisições, garantindo um histórico completo e confiável.'
    },
    {
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Controle de Validade',
        description: 'Receba alertas automáticos sobre materiais próximos ao vencimento, reduza perdas e otimize o uso dos insumos.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
        ),
        title: 'Múltiplos Almoxarifados',
        description: 'Gerencie diversos estoques de forma centralizada, com dados consolidados e relatórios por unidade.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5m-16.5 0a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 013.75 4.5h16.5a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0120.25 19.5m-16.5 0h.008v.008h-.008v-.008zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zm-3.75 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm7.5 0a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" />
            </svg>
        ),
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
                <div className="benefit-icon-wrapper">{feature.icon}</div>
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
