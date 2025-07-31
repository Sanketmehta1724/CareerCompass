// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import Bubbles from './Bubble'; // Import the bubbles component

const illustrationUrl = '/images/student-success.png';

// Variants for the staggered headline container
const sentenceVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.08,
    },
  },
};

// Variants for each word in the headline
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  const headline = "Don't Just Guess Your Future.";

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(45deg,#0d47a1_30%,#42a5f5_90%)] text-white py-20 md:py-28">
      
      {/* THE CHANGE IS HERE: Replaced the old drifting shapes with the new Bubbles component */}
      <Bubbles />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Column: Text Content & CTA */}
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {headline.split(" ").map((word, index) => (
                <motion.span key={index} variants={wordVariants} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p
              className="mt-4 text-lg md:text-xl text-indigo-100 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              Find the perfect career path that matches your personality and skills. We'll guide you from college admissions to your first job offer.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              <motion.button
                className="mt-8 inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Start Your Free Assessment
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Illustration */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <img 
              src={illustrationUrl} 
              alt="Students planning their future" 
              className="w-full max-w-lg mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;