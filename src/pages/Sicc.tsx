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
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
        ),
        title: 'Controle de Contratos',
        description: 'Monitore saldos, vencimentos e aditivos de forma centralizada. Evite surpresas e garanta a continuidade dos serviços.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9.75 12.75h4.5m-4.5 3h4.5m-4.5 3h4.5" />
            </svg>
        ),
        title: 'Gestão de Pedidos',
        description: 'Acompanhe o calendário de incidência de pedidos, organize as demandas e otimize o fluxo de aquisições.'
    },
    {
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m-5-1.5l1 1.5m0 0l.5 1.5m-5-1.5l-.5 1.5m9-3l-3-4.5m0 0l-3 4.5m3-4.5V3" />
            </svg>
        ),
        title: 'Análise de Gastos',
        description: 'Visualize os gastos por unidade e setor com gráficos intuitivos, facilitando o planejamento orçamentário.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
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

export default Sicc;
