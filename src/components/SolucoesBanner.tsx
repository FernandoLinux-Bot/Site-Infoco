import React from 'react';
import { motion, Variants } from "framer-motion";
import { MdShowChart, MdShoppingCart, MdSettings, MdDescription, MdGavel, MdBusinessCenter } from "react-icons/md";

interface SolucoesBannerProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    TABS: string[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.3, delayChildren: 0.6 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const SolucoesBanner: React.FC<SolucoesBannerProps> = ({ activeTab, setActiveTab, TABS }) => {
    const icons = {
        "Gestão Estratégica": <MdShowChart size={20} />,
        "Licitações e Compras Públicas": <MdShoppingCart size={20} />,
        "Gestão Administrativa": <MdSettings size={20} />
    };

    return (
        <div className="solucoes-banner">
            {/* Animated Background */}
            <motion.div
                className="solucoes-banner-bg-shape1"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="solucoes-banner-bg-shape2"
                animate={{ scale: [1.1, 0.9, 1.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Icons */}
            <motion.div
                className="solucoes-banner-icon icon1"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <MdDescription />
            </motion.div>
            <motion.div
                className="solucoes-banner-icon icon2"
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
            >
                <MdGavel />
            </motion.div>
            <motion.div
                className="solucoes-banner-icon icon3"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
            >
                <MdBusinessCenter />
            </motion.div>

            <div className="solucoes-banner-content container">
                <motion.h1
                    className="solucoes-banner-title"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Soluções Completas para a Gestão Pública
                </motion.h1>

                <motion.p
                    className="solucoes-banner-subtitle"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Tecnologia e inovação para transformar a administração pública,
                    garantindo eficiência, transparência e economia.
                </motion.p>

                <motion.div
                    className="solucoes-banner-buttons"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {TABS.map((tab, index) => (
                        <motion.div key={tab} variants={itemVariants}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`solucoes-banner-button ${activeTab === tab ? 'active' : ''}`}
                            >
                                <motion.span
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    animate={{ y: [0, -3, 0], color: ["var(--accent-color)", "#1d4ed8", "var(--accent-color)"] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                                >
                                    {icons[tab as keyof typeof icons]}
                                </motion.span>
                                {tab}
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SolucoesBanner;
