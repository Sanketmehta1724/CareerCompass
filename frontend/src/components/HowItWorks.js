import React from 'react';
import { motion } from 'framer-motion'; // Import motion

// Icons
import QuizIcon from '@mui/icons-material/Quiz';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const steps = [
  {
    icon: <QuizIcon className="h-6 w-6 text-white" />,
    title: '1. Take the Assessment',
    description: 'Our 10-minute test identifies your unique strengths, interests, and personality traits.',
  },
  {
    icon: <FindInPageIcon className="h-6 w-6 text-white" />,
    title: '2. Get Your Path',
    description: 'Receive a personalized report with top career recommendations and educational roadmaps.',
  },
  {
    icon: <SchoolIcon className="h-6 w-6 text-white" />,
    title: '3. Learn In-Demand Skills',
    description: 'Enroll in expert-led courses tailored specifically to your chosen career path.',
  },
  {
    icon: <WorkIcon className="h-6 w-6 text-white" />,
    title: '4. Get Hired',
    description: 'Apply for internships and jobs directly from our platform with a verified skills profile.',
  },
];

// Animation variants for the container to orchestrate staggered animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // Each child will animate 0.3s after the previous one
    },
  },
};

// Animation variants for each timeline item
const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Start hidden, 50px down
  visible: {
    opacity: 1,
    y: 0, // Animate to visible, original position
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};


const HowItWorks = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            Your journey from confusion to clarity in four simple steps.
          </p>
        </div>

        {/* Timeline Container: We convert this to a motion.div to control the animations */}
        <motion.div
          className="relative mt-16 max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // The animation starts when the component scrolls into view
          viewport={{ once: true, amount: 0.2 }} // Animation triggers once, when 20% is visible
        >
          {/* The vertical line with a "draw" animation */}
          <motion.div
            className="absolute left-4 top-0 h-full w-0.5 bg-slate-200"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          ></motion.div>

          {steps.map((step, index) => (
            // Each step is now a motion.div and will use the itemVariants
            <motion.div key={index} className="relative flex items-start mb-12" variants={itemVariants}>
              {/* The dot on the timeline */}
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-2 border-white z-10">
                {step.icon}
              </div>

              {/* The content card for the step */}
              <div className="ml-16 w-full bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800">
                  {step.title}
                </h3>
                <p className="mt-2 text-slate-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;