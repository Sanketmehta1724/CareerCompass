import React from 'react';
import { motion } from 'framer-motion';

const Bubbles = () => {
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {bubbles.map((_, index) => {
        const size = Math.random() * 40 + 5;
        const duration = Math.random() * 8 + 5;
        const delay = Math.random() * 2;
        
        const yStart = `${Math.random() * 80 + 10}%`; 
        const xStart = `${Math.random() * 90 + 5}%`;

        const xDrift = `${(Math.random() - 0.5) * 80}px`;
        const yDrift = `${(Math.random() - 0.5) * 80}px`;

        return (
          <motion.div
            key={index}
            // CHANGED: The bubble color is now a semi-transparent blue
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: size,
              height: size,
              top: yStart,
              left: xStart,
            }}
            animate={{
              x: [0, xDrift, 0],
              y: [0, yDrift, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

export default Bubbles;