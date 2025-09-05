import React from 'react';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import Features from '../components/Features';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
    return (
        <>
            <Hero />
            <VideoSection />
            <Features />
            <Stats />
            <HowItWorks />
        </>
    );
};

export default Home;
