import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { EASE_EXPO, ScrollProgress } from './components/motion';

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

/** Sobe ao topo a cada rota nova; respeita âncoras como /sicc#fluxo. */
const ScrollManager = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.slice(1);
            // Espera o tile entrar no DOM antes de rolar até a âncora.
            const raf = requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            return () => cancelAnimationFrame(raf);
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
        return undefined;
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
);

export default App;
