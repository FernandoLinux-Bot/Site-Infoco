import { motion, Variants } from 'framer-motion';
import InfoCard from '../components/InfoCard.tsx';
import {
    FaBullseye, FaHeart, FaLightbulb,
    FaBalanceScale, FaHandshake, FaTrophy, FaUsers, FaGlobeAmericas
} from 'react-icons/fa';
import AnimatedIdentityCard from '../components/AnimatedIdentityCard.tsx';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { y: 22, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const values = [
    { icon: <FaBalanceScale />, title: 'Ética e Transparência', description: 'Agimos com responsabilidade e clareza em todas as relações, fortalecendo a confiança entre gestão pública e sociedade.' },
    { icon: <FaLightbulb />, title: 'Inovação com Propósito', description: 'Desenvolvemos soluções tecnológicas que simplificam processos e geram impacto social positivo.' },
    { icon: <FaHandshake />, title: 'Compromisso com o Cliente', description: 'Somos parceiros estratégicos dos gestores públicos, oferecendo suporte próximo, personalizado e contínuo.' },
    { icon: <FaTrophy />, title: 'Excelência e Qualidade', description: 'Buscamos constantemente superar expectativas, garantindo softwares seguros, modernos e eficientes.' },
    { icon: <FaUsers />, title: 'Valorização das Pessoas', description: 'Respeitamos e reconhecemos nossos colaboradores, clientes e cidadãos como protagonistas da transformação pública.' },
    { icon: <FaGlobeAmericas />, title: 'Responsabilidade Social', description: 'Acreditamos que cada melhoria na gestão pública reflete diretamente na qualidade de vida da população.' }
];

const metaData = [
    { icon: <FaLightbulb />, title: 'Eficiência', description: 'Empoderar gestores com ferramentas modernas, simples e seguras, capazes de otimizar recursos e processos.' },
    { icon: <FaBullseye />, title: 'Transparência', description: 'Fortalecer a confiança entre governo e sociedade, tornando cada processo administrativo mais claro e acessível.' },
    { icon: <FaHeart />, title: 'Humanização', description: 'Construir pontes entre tecnologia e cidadania, tornando cada serviço público mais próximo do cidadão.' }
];

const Institucional = () => {
    return (
        <>
            <section className="institucional-hero">
                <div className="container">
                    <span className="eyebrow">Institucional / Quem somos</span>
                    <h1 className="section-title" style={{ marginTop: '1.5rem', maxWidth: '20ch' }}>
                        Mais que software. <em>Parceiros da gestão pública.</em>
                    </h1>
                </div>
            </section>

            <motion.section
                className="institucional-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    <motion.div className="content-block" variants={itemVariants}>
                        <span className="eyebrow">01 — Identidade</span>
                        <h2 className="section-title" style={{ marginTop: '1.25rem' }}>Quem somos</h2>
                        <div className="institutional-grid">
                            <AnimatedIdentityCard />
                            <div className="content-text">
                                <p>Na Infoco Gestão Pública, acreditamos que a tecnologia é uma aliada estratégica para transformar a administração pública em um espaço mais eficiente, transparente e próximo do cidadão.</p>
                                <p>Somos uma empresa especializada no desenvolvimento de soluções em software voltadas exclusivamente para a gestão pública, oferecendo ferramentas que simplificam processos, ampliam o controle administrativo e fortalecem a tomada de decisão.</p>
                                <p>Com sede em Itabuna-BA, atuamos em parceria com prefeituras, câmaras municipais e demais órgãos públicos, levando inovação e suporte de excelência para diferentes regiões do país. Nosso compromisso é gerar valor real para a sociedade, ajudando gestores a otimizar recursos e entregar serviços públicos de maior qualidade.</p>
                                <p>Na Infoco, unimos tecnologia, conhecimento jurídico-administrativo e experiência prática para entregar sistemas que vão além do digital: entregamos confiança, segurança e resultados.</p>
                                <strong>Somos mais que uma empresa de software — somos parceiros da gestão pública.</strong>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="content-block" variants={itemVariants}>
                        <span className="eyebrow">02 — Direção</span>
                        <h2 className="section-title" style={{ marginTop: '1.25rem' }}>Nossa <em>meta</em></h2>
                        <p className="section-subtitle" style={{ marginTop: '1rem' }}>
                            Ser referência nacional em tecnologia aplicada à gestão pública, oferecendo soluções que transformem a administração em um processo mais eficiente, transparente e humano.
                        </p>
                        <div className="meta-grid">
                            {metaData.map((item, index) => (
                                <InfoCard
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="content-block" variants={itemVariants}>
                        <span className="eyebrow">03 — Princípios</span>
                        <h2 className="section-title" style={{ marginTop: '1.25rem' }}>Nossos <em>valores</em></h2>
                        <motion.div className="values-grid" variants={containerVariants}>
                            {values.map((value, index) => (
                                <motion.div key={index} className="value-card" variants={itemVariants}>
                                    <div className="value-card-icon">{value.icon}</div>
                                    <div className="value-card-content">
                                        <h3>{value.title}</h3>
                                        <p>{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

export default Institucional;
