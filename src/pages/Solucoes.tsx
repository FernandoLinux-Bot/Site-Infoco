import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaCalendarAlt, FaBullhorn, FaShoppingCart, FaClipboardList, FaDatabase, FaFolderOpen, FaBuilding, FaBoxes, FaArrowRight, FaTimes } from 'react-icons/fa';

interface Solution {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    details?: () => React.ReactNode;
}

const solutionsData: Record<string, Solution[]> = {
    "Gestão Estratégica": [
        {
            id: 'pca',
            icon: <FaCalendarAlt />,
            title: 'PCA – Plano de Contratações Anual',
            description: 'Planeje de forma prática e inteligente, permitindo à administração pública antecipar necessidades e otimizar recursos.',
            details: () => (
                <>
                    <p>Com nosso sistema, o Plano de Contratação Anual é planejado de forma prática e inteligente, permitindo à administração pública antecipar necessidades, otimizar recursos, aumentar a transparência em cada etapa e garantir decisões mais eficientes e econômicas.</p>
                </>
            )
        }
    ],
    "Licitações e Compras Públicas": [
        {
            id: 'plataforma',
            icon: <FaBullhorn />,
            title: 'Plataforma de Licitações',
            description: 'Conecte entes públicos, fornecedores e cidadãos de forma inteligente, garantindo processos transparentes e organizados.',
            details: () => (
                <>
                    <p>Com a INFOCO Licitações, Entes públicos, fornecedores e cidadãos se conectam de forma inteligente, garantindo processos mais transparentes, organizados e participativos.</p>
                    <p>O resultado é uma gestão pública fortalecida, um mercado fornecedor mais competitivo e uma gestão mais simples e eficiente.</p>
                </>
            )
        },
        {
            id: 'compras',
            icon: <FaShoppingCart />,
            title: 'Gestão de Compras Públicas',
            description: 'Solução completa para otimização e controle das aquisições de materiais e serviços com agilidade e precisão.',
            details: () => (
                <>
                    <p>Solução completa para otimização e controle das aquisições de materiais e serviços. As solicitações são feitas diretamente pelo sistema, analisadas pelo setor de compras e, após aprovação, a autorização de fornecimento é possível ser enviada ao fornecedor com um único clique, contendo todas as informações detalhadas da demanda. Isso garante agilidade, precisão e eficiência total em cada etapa do processo de compras.</p>
                </>
            )
        },
        {
            id: 'planejamento',
            icon: <FaClipboardList />,
            title: 'Planejamento e Licitações',
            description: 'Ambiente digital completo para gestão de processos licitatórios, da criação do PA à geração de documentos com auxílio de IA.',
            details: () => (
                <>
                    <p>Ambiente digital completo para planejamento e gestão de processos licitatórios, integrando desde a criação do Processo Administrativo (PA) até a geração inteligente de DFDs, ETP, Mapa de Riscos e Termos de Referência com auxílio da IA, até a inserção na plataforma, garantindo eficiência, transparência e controle total.</p>
                </>
            )
        },
        {
            id: 'banco-precos',
            icon: <FaDatabase />,
            title: 'Banco de Preços (Cotações)',
            description: 'Realize cotações de até 50 itens em menos de 2 minutos, garantindo conformidade e máxima economia.',
            details: () => (
                <>
                    <p>Sistema inteligente para consulta e registro de preços de mercado, garantindo total conformidade com a Lei 14.133/2021. Em poucos cliques, realize cotações de até 50 itens em menos de 2 minutos, otimizando recursos, acelerando decisões e promovendo máxima transparência e economia nas compras públicas.</p>
                </>
            )
        }
    ],
    "Gestão Administrativa": [
        {
            id: 'protocolo',
            icon: <FaFolderOpen />,
            title: 'Sistema de Protocolo Web',
            description: 'Controle eficiente de documentos e processos administrativos, organizando, rastreando e automatizando todo o fluxo.',
            details: () => (
                <>
                    <p><strong>Visão Geral:</strong> O Sistema de Protocolo Web é uma solução abrangente para a gestão de processos e documentos, garantindo organização, transparência e eficiência na administração pública.</p>
                    <p><strong>Funcionalidades Obrigatórias:</strong></p>
                    <ul>
                        <li>Controle detalhado de todo o ciclo de vida de um processo.</li>
                        <li>Cadastro de assuntos, vinculando cada um à secretaria e ao setor de destino, com prazos de conclusão.</li>
                        <li>Registro de trâmites, controle de documentos entregues e pendentes.</li>
                        <li>Anexo de arquivos digitalizados, textos e imagens.</li>
                        <li>Histórico completo de movimentações, registrando quem e quando uma operação foi realizada.</li>
                    </ul>
                    <p><strong>Outras Funcionalidades da nossa solução:</strong></p>
                    <ul>
                        <li><strong>Cadastro de Procedências:</strong> Permite definir a origem do processo (interno, externo, outros).</li>
                        <li><strong>Gestão de Contribuintes:</strong> Cadastro completo de documentos, endereços, telefones e e-mails.</li>
                        <li><strong>Relatórios:</strong> Geração de relatórios customizáveis por data, assunto, secretaria, setor e requerente.</li>
                        <li><strong>Livro de Protocolo:</strong> Geração de um livro para listar processos de um determinado período.</li>
                        <li><strong>Controle da numeração:</strong> Permite personalizar o tipo de numeração do protocolo.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'patrimonio',
            icon: <FaBuilding />,
            title: 'Gestão de Patrimônio',
            description: 'Controle integrado e automatizado de bens móveis, imóveis e intangíveis, do inventário à baixa.',
            details: () => (
                <>
                    <p><strong>Visão Geral:</strong> A ferramenta de gestão de patrimônio oferece um conjunto de funcionalidades essenciais para órgãos públicos que buscam eficiência, transparência e controle total sobre seus bens.</p>
                    <p><strong>Controle Patrimonial Integrado e Automatizado:</strong></p>
                    <ul>
                        <li>Controle completo de bens móveis, imóveis e intangíveis.</li>
                        <li>Automatiza processos de inventário, depreciação e contabilização, com histórico detalhado.</li>
                        <li>Gerencia informações cruciais como garantia, seguro e responsabilidade.</li>
                    </ul>
                    <p><strong>Funcionalidades que Simplificam o Dia a Dia:</strong></p>
                    <ul>
                        <li><strong>Gestão de Lotes:</strong> Realize rotinas em lote para tarefas como baixa, reavaliação e movimentação.</li>
                        <li><strong>Inventário Completo:</strong> Crie inventários de diferentes tipos (anual, eventual, por transferência).</li>
                        <li><strong>Incorporação de Bens:</strong> Registre novos bens por compra, doação ou transferência.</li>
                        <li><strong>Anexos e Imagens:</strong> Anexe documentos fiscais, termos e imagens aos cadastros.</li>
                        <li><strong>Relatórios e Exportação:</strong> Gere relatórios gerenciais e demonstrativos, e exporte dados para o sistema SIGA.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'almoxarifado',
            icon: <FaBoxes />,
            title: 'Sistema de Almoxarifado Web',
            description: 'Ferramenta completa para gestão de estoque, projetada para otimizar processos e garantir a precisão dos dados.',
            details: () => (
                <>
                    <p><strong>Controle de Estoque:</strong></p>
                    <ul>
                        <li>Gerencia o fluxo de materiais: entradas, saídas, devoluções e transferências.</li>
                        <li>Efetua a baixa automática no estoque quando um material é fornecido.</li>
                        <li>Controla o estoque mínimo, máximo e o ponto de reposição dos materiais.</li>
                    </ul>
                    <p><strong>Gestão e Integrações:</strong></p>
                    <ul>
                        <li>Cadastro detalhado de materiais, incluindo classificação, grupo, tipo de medida e código de barras.</li>
                        <li>Integração com os sistemas de compras, licitação e contratos, gerando entrada automática no estoque.</li>
                        <li>Integração com o sistema patrimonial.</li>
                    </ul>
                    <p><strong>Funcionalidades de Segurança e Controle:</strong></p>
                    <ul>
                        <li><strong>Controle de requisições:</strong> Mantenha um controle efetivo sobre as requisições de materiais.</li>
                        <li><strong>Inventário:</strong> Permite registrar a abertura e o fechamento de inventários, bloqueando movimentações durante sua realização.</li>
                        <li><strong>Controle de Acesso:</strong> Restrinja o acesso dos usuários a almoxarifados específicos.</li>
                        <li><strong>Controle de Vencimento:</strong> Controle as datas de vencimento de materiais perecíveis.</li>
                    </ul>
                </>
            )
        }
    ]
};

const TABS = Object.keys(solutionsData);

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
};

const SolutionModal: React.FC<{ solution: Solution; onClose: () => void }> = ({ solution, onClose }) => (
    <motion.div className="solution-modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="solution-modal-content" onClick={e => e.stopPropagation()} variants={modalVariants} initial="hidden" animate="visible" exit="exit">
            <button className="solution-modal-close" onClick={onClose} aria-label="Fechar modal"><FaTimes /></button>
            <h2>{solution.title}</h2>
            {solution.details && solution.details()}
        </motion.div>
    </motion.div>
);

const Solucoes = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

    return (
        <>
            <motion.section 
                className="solutions-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container">
                    <h1>Soluções Completas para a Gestão Pública</h1>
                    <p>Tecnologia e inovação para transformar a administração pública, garantindo eficiência, transparência e economia.</p>
                </div>
            </motion.section>

            <section className="solutions-page">
                <div className="container">
                    <div className="solutions-tabs-container">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                className={`solutions-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            className="solutions-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {solutionsData[activeTab].map(solution => (
                                <motion.div
                                    key={solution.id}
                                    className="solution-card"
                                    variants={itemVariants}
                                    onClick={() => solution.details && setSelectedSolution(solution)}
                                >
                                    <div className="solution-card-icon">{solution.icon}</div>
                                    <h3>{solution.title}</h3>
                                    <p>{solution.description}</p>
                                    {solution.details && (
                                        <div className="solution-card-button">
                                            Saiba Mais <FaArrowRight />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
            
            <AnimatePresence>
                {selectedSolution && (
                    <SolutionModal solution={selectedSolution} onClose={() => setSelectedSolution(null)} />
                )}
            </AnimatePresence>
        </>
    );
};

export default Solucoes;
