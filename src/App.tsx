import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </>
  );
};

export default App;
