import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Transition, Variants } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import WhatsAppButton from './components/WhatsAppButton';
import InstagramButton from './components/InstagramButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Home from './pages/Home';
import Solucoes from './pages/Solucoes';
import Institucional from './pages/Institucional';
import Fornecedor from './pages/Fornecedor';
import Cadastro from './pages/Cadastro';
import Contact from './pages/Contact';
import Noticias from './pages/Noticias';

const pageVariants: Variants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/fornecedor" element={<Fornecedor />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollProgress />
    <Header />
    <main>
      <AnimatedRoutes />
    </main>
    <Footer />
    <div className="float-stack">
      <WhatsAppButton />
      <InstagramButton />
      <ScrollToTopButton />
    </div>
    <Analytics />
    <SpeedInsights />
  </BrowserRouter>
);

export default App;
