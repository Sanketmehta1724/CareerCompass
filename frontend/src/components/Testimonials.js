// src/components/Testimonials.js
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "I was completely lost after my 12th exams. CareerCompass didn't just show me a career, it gave me a clear roadmap to get there. Truly life-changing!",
    name: 'Priya Sharma',
    title: 'B.Tech in AI & ML Student',
    image: '/images/student-1.jpg', // Replace with your image paths
  },
  {
    quote: "The personalized assessment was shockingly accurate. It pointed me towards a field I love but had never considered before. The courses are top-notch.",
    name: 'Rohan Mehta',
    title: 'UX/UI Design Intern',
    image: '/images/student-2.jpg',
  },
  {
    quote: "As a parent, I was worried about my son's future. This platform provided the clarity and direction we both needed. Highly recommended for every student.",
    name: 'Anjali Desai',
    title: 'Parent',
    image: '/images/parent-1.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Trusted by Students & Parents
          </h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Hear what others have to say.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-slate-50 p-8 rounded-xl border border-slate-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
            >
              <p className="text-slate-700 italic">"{testimonial.quote}"</p>
              <div className="flex items-center mt-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-4">
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;