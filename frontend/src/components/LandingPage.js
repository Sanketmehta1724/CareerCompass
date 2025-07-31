// src/pages/LandingPage.js
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials'; // <-- Import
import FAQ from '../components/FAQ';                   // <-- Import
import CTA from '../components/CTA';                   // <-- Import
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;