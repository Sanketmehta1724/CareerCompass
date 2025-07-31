// src/components/FAQ.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const faqData = [
  {
    question: 'Is the initial career assessment really free?',
    answer: 'Yes, absolutely! Our core assessment to help you find your direction is 100% free. We only offer paid specialized courses after you have your personalized career roadmap.',
  },
  {
    question: 'Are the courses certified?',
    answer: 'Many of our advanced courses offer certificates of completion, and some partner with industry leaders to provide official certifications that you can add to your resume and LinkedIn profile.',
  },
  {
    question: "What if I don't like the career path recommended to me?",
    answer: "Our recommendations are a starting point based on data. You can retake the assessment, explore alternative paths suggested by the platform, or connect with one of our career counselors to discuss your results.",
  },
  {
    question: 'Do you guarantee a job after course completion?',
    answer: 'While we do not guarantee employment, we provide you with all the necessary tools to become highly employable: in-demand skills, portfolio projects, resume-building workshops, and direct connections to our network of hiring partners.',
  },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4 border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg font-semibold text-slate-800">{question}</h3>
        <div className="text-blue-600">
          {isOpen ? <RemoveIcon /> : <AddIcon />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '16px' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-slate-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-12">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;