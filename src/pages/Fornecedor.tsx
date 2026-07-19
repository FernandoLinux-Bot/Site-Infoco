import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBell, FaLaptopCode, FaHeadset, FaChartPie, FaTrophy } from 'react-icons/fa';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { y: 22, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const benefits = [
    { icon: <FaChartLine />, title: 'Aumente suas Vendas', description: 'Acesse um mercado de bilhões com milhares de oportunidades de licitação em todo o país.' },
    { icon: <FaBell />, title: 'Alertas Inteligentes', description: 'Receba notificações personalizadas sobre as licitações que realmente interessam para o seu negócio.' },
    { icon: <FaLaptopCode />, title: 'Plataforma Simplificada', description: 'Gerencie propostas, documentos e participe de pregões em um ambiente intuitivo e fácil de usar.' },
    { icon: <FaHeadset />, title: 'Suporte Especializado', description: 'Conte com nossa equipe de especialistas para te auxiliar em todas as etapas do processo.' },
    { icon: <FaChartPie />, title: 'Análise de Mercado', description: 'Utilize nossos dados para entender concorrentes e tomar decisões mais estratégicas.' },
    { icon: <FaTrophy />, title: 'Mais Chances de Vencer', description: 'Nossas ferramentas e suporte aumentam significativamente suas chances de sucesso.' }
];

const Fornecedor = () => {
  const navigate = useNavigate();
  return (
    <>
      <motion.section
        className="fornecedor-hero"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <span className="eyebrow">Fornecedor / Venda para o governo</span>
          <h1 style={{ marginTop: '1.5rem' }}>
            Venda para o governo com a <em>melhor plataforma</em>.
          </h1>
          <p>
            Simplificamos o processo de licitação para que você foque no que realmente importa: fechar grandes negócios.
          </p>
          <button onClick={() => navigate('/cadastro')} className="cta-button">
            Comece a vender agora
          </button>
        </div>
      </motion.section>

      <motion.section
        className="benefits"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="container">
          <motion.div variants={itemVariants}>
            <span className="eyebrow">Vantagens</span>
            <h2 className="section-title" style={{ marginTop: '1.5rem' }}>
              Por que ser um <em>fornecedor</em> INFOCO.
            </h2>
          </motion.div>
          <div className="benefits-grid">
            {benefits.map((b) => (
              <motion.div key={b.title} className="benefit-card" variants={itemVariants}>
                <div className="icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Fornecedor;
