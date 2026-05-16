import { useState } from 'react';
// Fix: Import `Transition` and `Variants` to explicitly type framer-motion configurations.
import { motion, AnimatePresence, Transition, Variants } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import InstagramButton from './components/InstagramButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Import page components
import Home from './pages/Home';
import Solucoes from './pages/Solucoes';
import Institucional from './pages/Institucional';
import Fornecedor from './pages/Fornecedor';
import Cadastro from './pages/Cadastro';
import Contact from './pages/Contact';
import Noticias from './pages/Noticias';

type Page = 'home' | 'solucoes' | 'institucional' | 'fornecedor' | 'cadastro' | 'contact' | 'noticias';

// Fix: Add `Variants` type to ensure the object structure is correct.
const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

// Fix: Add `Transition` type to fix type incompatibility for `transition` prop.
const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'solucoes':
        return <Solucoes />;
      case 'institucional':
        return <Institucional />;
      case 'fornecedor':
        return <Fornecedor setCurrentPage={setCurrentPage} />;
      case 'cadastro':
        return <Cadastro />;
      case 'contact':
        return <Contact />;
      case 'noticias':
        return <Noticias />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header setCurrentPage={setCurrentPage} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
      <InstagramButton />
      <ScrollToTopButton />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;
