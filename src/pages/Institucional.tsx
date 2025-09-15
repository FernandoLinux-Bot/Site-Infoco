import React from 'react';
import { motion, Variants } from 'framer-motion';
import InfoCard from '../components/InfoCard';
import { FaAward, FaBullseye, FaHeart, FaLightbulb, FaBuilding } from 'react-icons/fa';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
};

const values = [
    { icon: <FaAward />, title: 'Ética e Transparência', description: 'Agimos com responsabilidade e clareza em todas as relações, fortalecendo a confiança entre gestão pública e sociedade.' },
    { icon: <FaAward />, title: 'Inovação com Propósito', description: 'Desenvolvemos soluções tecnológicas que simplificam processos e geram impacto social positivo.' },
    { icon: <FaAward />, title: 'Compromisso com o Cliente', description: 'Somos parceiros estratégicos dos gestores públicos, oferecendo suporte próximo, personalizado e contínuo.' },
    { icon: <FaAward />, title: 'Excelência e Qualidade', description: 'Buscamos constantemente superar expectativas, garantindo softwares seguros, modernos e eficientes.' },
    { icon: <FaAward />, title: 'Valorização das Pessoas', description: 'Respeitamos e reconhecemos nossos colaboradores, clientes e cidadãos como protagonistas da transformação pública.' },
    { icon: <FaAward />, title: 'Responsabilidade Social', description: 'Acreditamos que cada melhoria na gestão pública reflete diretamente na qualidade de vida da população.' }
];

const metaData = [
    {
        icon: <FaLightbulb />,
        title: 'Eficiência',
        description: 'Empoderar gestores com ferramentas modernas, simples e seguras, capazes de otimizar recursos e processos.',
    },
    {
        icon: <FaBullseye />,
        title: 'Transparência',
        description: 'Fortalecer a confiança entre governo e sociedade, tornando cada processo administrativo mais claro e acessível.',
    },
    {
        icon: <FaHeart />,
        title: 'Humanização',
        description: 'Construir pontes entre tecnologia e cidadania, tornando cada serviço público mais próximo do cidadão.',
    }
];

const Institucional = () => {
    return (
        <>
            <motion.section
                className="institucional-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container">
                    <h1>Parceiros da Gestão Pública</h1>
                    <p>Unimos tecnologia, conhecimento e experiência para entregar confiança, segurança e resultados.</p>
                </div>
            </motion.section>

            <motion.section 
                className="institucional-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="container">
                    {/* Quem Somos */}
                    <motion.div className="content-block" variants={itemVariants}>
                        <h2 className="section-title">Quem Somos</h2>
                        <div className="institutional-grid">
                            <div className="identity-card">
                                <div className="identity-card-icon-wrapper">
                                    <FaBuilding />
                                </div>
                                <h3>Parceiros da Gestão Pública</h3>
                                <p>"Unimos tecnologia, conhecimento e experiência para entregar confiança, segurança e resultados."</p>
                            </div>
                            <div className="content-text">
                                <p>Na Infoco Gestão Pública, acreditamos que a tecnologia é uma aliada estratégica para transformar a administração pública em um espaço mais eficiente, transparente e próximo do cidadão.</p>
                                <p>Somos uma empresa especializada no desenvolvimento de soluções em software voltadas exclusivamente para a gestão pública, oferecendo ferramentas que simplificam processos, ampliam o controle administrativo e fortalecem a tomada de decisão.</p>
                                <p>Com sede em Itabuna-BA, atuamos em parceria com prefeituras, câmaras municipais e demais órgãos públicos, levando inovação e suporte de excelência para diferentes regiões do país. Nosso compromisso é gerar valor real para a sociedade, ajudando gestores a otimizar recursos e entregar serviços públicos de maior qualidade.</p>
                                <p>Na Infoco, unimos tecnologia, conhecimento jurídico-administrativo e experiência prática para entregar sistemas que vão além do digital: entregamos confiança, segurança e resultados.</p>
                                <strong>Somos mais que uma empresa de software. Somos parceiros da gestão pública.</strong>
                            </div>
                        </div>
                    </motion.div>

                    {/* Nossa Meta */}
                    <motion.div className="content-block" variants={itemVariants}>
                        <h2 className="section-title">Nossa Meta</h2>
                        <p className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0, maxWidth: '900px' }}>
                            Nossa meta é clara: ser referência nacional em tecnologia aplicada à gestão pública, oferecendo soluções que transformem a administração em um processo mais eficiente, transparente e humano.
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


                    {/* Nossos Valores */}
                     <motion.div className="content-block" variants={itemVariants}>
                        <h2 className="section-title">Nossos Valores</h2>
                         <motion.div 
                            className="values-grid"
                            variants={containerVariants}
                         >
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
