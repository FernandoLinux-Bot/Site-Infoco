import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { EASE_EXPO, ScrollProgress } from './components/motion';
import { ScrollTrigger } from './components/motion/gsap';

import Home from './pages/Home';
import Sicc from './pages/Sicc';
import Solucoes from './pages/Solucoes';
import Institucional from './pages/Institucional';
import Fornecedor from './pages/Fornecedor';
import Cadastro from './pages/Cadastro';
import Contact from './pages/Contact';
import Noticias from './pages/Noticias';
import TrabalheConosco from './pages/TrabalheConosco';
import NotFound from './pages/NotFound';

/**
 * Dono único de "a rota mudou → remedir → posicionar a página".
 *
 * A ordem importa. O ScrollTrigger mede a página quando cria os gatilhos, e
 * numa SPA a altura muda sem recarregar — sem remedir, os gatilhos da rota
 * nova apontam para as posições da antiga. Mas remedir e rolar ao mesmo tempo
 * viram uma corrida: o `refresh` restaura a posição de rolagem e desfaz o salto
 * para a âncora. Por isso remedimos primeiro e só então posicionamos.
 */
const ScrollManager = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            ScrollTrigger.refresh();

            if (!hash) {
                window.scrollTo({ top: 0, behavior: 'auto' });
                return;
            }
            const alvo = document.getElementById(hash.slice(1));
            if (!alvo) return;
            // `auto` e não `smooth`: quem chega por link direto quer estar lá, e
            // a rolagem suave ainda estaria a meio caminho quando o ScrollTrigger
            // avaliasse os gatilhos.
            const topoFixo = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
            window.scrollTo({
                top: alvo.getBoundingClientRect().top + window.scrollY - topoFixo,
                behavior: 'auto',
            });
        });
        return () => cancelAnimationFrame(raf);
    }, [pathname, hash]);

    return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE_EXPO }}
            >
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/sicc" element={<Sicc />} />
                    <Route path="/solucoes" element={<Solucoes />} />
                    <Route path="/institucional" element={<Institucional />} />
                    <Route path="/fornecedor" element={<Fornecedor />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/contato" element={<Contact />} />
                    <Route path="/noticias" element={<Noticias />} />
                    <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};

const App = () => (
    // `reducedMotion="user"` faz o framer-motion respeitar a preferência do
    // sistema em toda animação, e não só nas primitivas: os motion.p e
    // motion.div dos heros de cada página usam initial/animate direto e antes
    // se moviam mesmo para quem pediu menos movimento. O GSAP já respeita pela
    // função semMovimento().
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
        <ScrollManager />
        <Header />
        <ScrollProgress />
        <main className="app-main">
            <AnimatedRoutes />
        </main>
        <Footer />
        <FloatingActions />
        <Analytics />
        <SpeedInsights />
    </BrowserRouter>
    </MotionConfig>
);

export default App;
