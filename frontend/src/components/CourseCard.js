// src/components/CourseCard.js
import React from 'react';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Animation variants for each card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 20 },
  },
};

const CourseCard = ({ course }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
    >
      <img className="h-40 w-full object-cover" src={course.image} alt={course.title} />
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-sm font-semibold text-blue-600">{course.category}</p>
        <h3 className="mt-2 text-xl font-bold text-slate-800">{course.title}</h3>
        <p className="mt-2 text-slate-600 text-sm flex-grow">{course.description}</p>
        <a href="#" className="mt-4 font-semibold text-blue-600 inline-flex items-center group">
          Learn More
          <ArrowForwardIcon className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default CourseCard;