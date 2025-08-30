import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <Stats />
            <HowItWorks />
            <Contact />
        </>
    );
};

export default Home;
