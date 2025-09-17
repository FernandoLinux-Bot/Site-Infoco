import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { GoogleGenAI, Type } from '@google/genai';
import { FaExternalLinkAlt } from 'react-icons/fa';
import NotFoundAnimation from '../components/NotFoundAnimation';
import NoticiasBanner from '../components/NoticiasBanner';

interface NewsArticle {
    title: string;
    url: string;
    source: string;
}

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

const Noticias = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            // Fix: Use `process.env.API_KEY` as per the coding guidelines.
            const apiKey = process.env.API_KEY;

            if (!apiKey) {
                setError("A chave da API não foi configurada.");
                setLoading(false);
                return;
            }

            try {
                const ai = new GoogleGenAI({ apiKey: apiKey });

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: "Busque as 6 notícias mais recentes e relevantes sobre os seguintes tópicos da gestão pública brasileira: e-TCM (Tribunais de Contas dos Municípios), UPB (União dos Municípios da Bahia), Licitações e Contratos Públicos (Lei 14.133), e decisões do STF (Supremo Tribunal Federal) que impactam os municípios. Para cada notícia, forneça o título, o link original e o nome da fonte.",
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING, description: 'O título da notícia.' },
                                    url: { type: Type.STRING, description: 'O link (URL) para a notícia completa.' },
                                    source: { type: Type.STRING, description: 'O nome do site ou portal da notícia (Ex: G1, Conjur).' }
                                },
                                required: ["title", "url", "source"]
                            }
                        }
                    }
                });
                
                const jsonStr = response.text.trim();
                const parsedArticles = JSON.parse(jsonStr);
                setArticles(parsedArticles);
            } catch (err) {
                console.error("Erro ao buscar notícias:", err);
                setError("Não foi possível carregar as notícias. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="loading-spinner">Carregando notícias...</div>;
        }

        if (error) {
            return <div className="error-message">{error}</div>;
        }

        if (articles.length === 0) {
            return (
                <div className="not-found-container">
                    <NotFoundAnimation />
                    <p className="section-subtitle" style={{ marginTop: '2rem' }}>
                        Nenhuma notícia encontrada no momento.
                    </p>
                </div>
            );
        }

        return (
            <motion.div
                className="noticias-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {articles.map((article, index) => (
                    <motion.a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-card"
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)' }}
                    >
                        <div className="news-card-content">
                            <span className="news-card-source">{article.source}</span>
                            <h3>{article.title}</h3>
                        </div>
                        <div className="news-card-footer">
                            <span>Ler mais</span>
                            <FaExternalLinkAlt />
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        );
    };

    return (
        <>
            <NoticiasBanner />

            <section className="noticias-page">
                <div className="container">
                    {renderContent()}
                </div>
            </section>
        </>
    );
};

export default Noticias;
