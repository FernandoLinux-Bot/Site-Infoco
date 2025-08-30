import React from 'react';
// Fix: Import `Variants` to explicitly type framer-motion animation variants.
import { motion, Variants } from 'framer-motion';

type Page = 'home' | 'fornecedor' | 'cadastro';

interface FornecedorProps {
  setCurrentPage: (page: Page) => void;
}

// Fix: Add `Variants` type to ensure the object structure is correct.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Fix: Add `Variants` type to fix type incompatibility for `variants` prop.
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

const benefits = [
    {
        icon: '📈',
        title: 'Aumente suas Vendas',
        description: 'Acesse um mercado de bilhões com milhares de oportunidades de licitação em todo o país.'
    },
    {
        icon: '🎯',
        title: 'Alertas Inteligentes',
        description: 'Receba notificações personalizadas sobre as licitações que realmente interessam para o seu negócio.'
    },
    {
        icon: '⚙️',
        title: 'Plataforma Simplificada',
        description: 'Gerencie propostas, documentos e participe de pregões em um ambiente intuitivo e fácil de usar.'
    },
    {
        icon: '🤝',
        title: 'Suporte Especializado',
        description: 'Conte com nossa equipe de especialistas para te auxiliar em todas as etapas do processo.'
    },
    {
        icon: '📊',
        title: 'Análise de Mercado',
        description: 'Utilize nossos dados para entender concorrentes e tomar decisões mais estratégicas.'
    },
    {
        icon: '🏆',
        title: 'Mais Chances de Vencer',
        description: 'Nossas ferramentas e suporte aumentam significativamente suas chances de sucesso.'
    }
];

const Fornecedor: React.FC<FornecedorProps> = ({ setCurrentPage }) => {
  return (
    <>
      <motion.section 
        className="fornecedor-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h1>Venda para o Governo com a Melhor Plataforma</h1>
          <p>Simplificamos o processo de licitação para que você foque no que realmente importa: fechar grandes negócios.</p>
          <button onClick={() => setCurrentPage('cadastro')} className="cta-button">
            Comece a Vender Agora
          </button>
        </div>
      </motion.section>

      <motion.section 
        className="benefits"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <h2 className="section-title">Vantagens de ser um Fornecedor</h2>
          <p className="section-subtitle">Descubra como podemos impulsionar os seus resultados.</p>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div key={index} className="benefit-card" variants={itemVariants}>
                <div className="icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Fornecedor;