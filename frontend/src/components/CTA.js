// src/components/CTA.js
import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="bg-blue-600">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h2 
          className="text-3xl sm:text-4xl font-extrabold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to Find Your Perfect Career Path?
        </motion.h2>
        <motion.p 
          className="text-blue-100 text-lg mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Stop the confusion and start building a future you're excited about. Your personalized report is just a few clicks away.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#"
            className="inline-block mt-8 bg-white text-blue-700 font-bold py-4 px-10 rounded-full shadow-lg text-lg hover:bg-slate-100 transition-colors duration-300"
          >
            Start Your Free Assessment Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;