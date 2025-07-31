import React from 'react';
import { motion } from 'framer-motion';

// Icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const featuresData = [
  {
    icon: <AutoAwesomeIcon className="h-8 w-8 text-blue-600" />,
    title: 'AI-Powered Analysis',
    description: 'Our advanced assessment finds careers that truly match your personality and innate talents.',
  },
  {
    icon: <SchoolIcon className="h-8 w-8 text-blue-600" />,
    title: 'Expert-Led Courses',
    description: 'Learn in-demand skills with courses designed by industry experts for your recommended career path.',
  },
  {
    icon: <CardGiftcardIcon className="h-8 w-8 text-blue-600" />,
    title: 'Earn Rewards',
    description: 'Stay motivated by earning vouchers, subscriptions, and other cool rewards as you complete your courses.',
  },
  {
    icon: <WorkOutlineIcon className="h-8 w-8 text-blue-600" />,
    title: 'Direct Job Connections',
    description: 'Showcase your verified skills to our network of partner companies and find exclusive job opportunities.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const Features = () => {
  return (
    <section className="bg-slate-50 pl-12 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 mb-4">
          Everything You Need
        </h2>
        <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
          From self-discovery to landing your first job, we provide the tools for every step of your journey.
        </p>

        {/* THE CHANGE IS HERE: Added 'py-8' for vertical padding */}
        <motion.div
          className="flex overflow-x-auto gap-8 py-8 scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-80 bg-white p-8 rounded-xl shadow-lg border border-slate-200"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;