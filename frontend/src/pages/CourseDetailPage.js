import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SchoolIcon from '@mui/icons-material/School'; 
import ScheduleIcon from '@mui/icons-material/Schedule'; 
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// --- Mock Data for a Single Course ---
const mockCourseData = {
  title: 'Foundations of AI & Machine Learning',
  subtitle: 'Go from zero to hero in the most in-demand tech field. Build real-world AI models with Python.',
  rating: 4.8,
  reviewCount: 1250,
  studentsEnrolled: 25730,
  instructor: { name: 'Dr. Aarav Patel', title: 'AI Researcher & Former Google Engineer', image: '/images/instructor.jpg' },
  level: 'Beginner',
  duration: '8 Weeks',
  previewImage: '/images/course-ai.jpg',
  whatYoullLearn: [
    { skill: 'Python for Data Science', level: '95%' },
    { skill: 'Neural Networks & Deep Learning', level: '90%' },
    { skill: 'Model Evaluation & Tuning', level: '85%' },
    { skill: 'Data Visualization', level: '80%' },
  ],
  curriculum: [
    { title: 'Module 1: Introduction to AI', lessons: ['What is AI?', 'History of Machine Learning', 'Setting Up Your Environment'], duration: '1h 30m' },
    { title: 'Module 2: Python for Data Science', lessons: ['NumPy Basics', 'Pandas DataFrames', 'Data Visualization'], duration: '3h 15m' },
    { title: 'Module 3: Building Your First Model', lessons: ['Linear Regression', 'Model Evaluation', 'Project: House Price Prediction'], duration: '4h 45m' },
    { title: 'Module 4: Advanced Topics', lessons: ['Intro to Neural Networks', 'Deploying Your Model', 'Final Project'], duration: '5h 00m' },
  ],
};

// --- Reusable Components (No Changes Here) ---

const AccordionItem = ({ module, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  return (
    <div className="border-t border-slate-200 last:border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 px-6 text-left"
      >
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-500 mr-4">{`0${index + 1}`}</span>
          <h3 className="text-lg font-semibold text-slate-800">{module.title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
          <AddIcon className="text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="pl-16 pr-6 pb-6 space-y-2">
              {module.lessons.map((lesson, i) => (
                <li key={i} className="text-slate-600 flex items-start">
                  <CheckCircleOutlineIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillBar = ({ skill, level }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-slate-700">{skill}</span>
      <span className="text-sm font-medium text-blue-600">{level}</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2.5">
      <motion.div
        className="bg-blue-600 h-2.5 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: level }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  </div>
);


// --- Main Course Detail Page Component ---

const CourseDetailPage = () => {
  const { title, subtitle, rating, reviewCount, studentsEnrolled, instructor, level, duration, previewImage, whatYoullLearn, curriculum } = mockCourseData;

  return (
    <div className="bg-slate-50">
      {/* --- NEW HERO SECTION --- */}
      <header className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <motion.div 
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <a href="#" className="text-blue-600 font-semibold text-sm">TECHNOLOGY PATH</a>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2">{title}</h1>
              <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
              <div className="mt-4">
                <span className="text-slate-500">By </span>
                <span className="font-semibold text-slate-700">{instructor.name}</span>
              </div>
              <div className="mt-6 flex justify-center md:justify-start items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <span className="font-bold text-amber-500 mr-1">{rating}</span>
                  <StarIcon className="text-amber-400 h-5 w-5" />
                </div>
                <span className="text-slate-500">({reviewCount.toLocaleString()} reviews)</span>
                <span className="text-slate-500 font-medium">{studentsEnrolled.toLocaleString()} students</span>
              </div>
              <motion.button
                className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-colors"
                whileHover={{ y: -2 }}
              >
                Enroll For Free
              </motion.button>
            </motion.div>
            {/* Right Column: Image */}
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img 
                src={previewImage} 
                alt={title} 
                className="rounded-xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </header>
      {/* --- END OF NEW HERO SECTION --- */}

      <div className="bg-slate-50 border-b border-t border-slate-200">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center py-4">
            <div className="flex justify-center items-center text-slate-700"><SchoolIcon className="mr-2 text-blue-500" /> {level} Level</div>
            <div className="flex justify-center items-center text-slate-700"><ScheduleIcon className="mr-2 text-blue-500" /> Approx. {duration}</div>
            <div className="flex justify-center items-center text-slate-700"><EmojiEventsIcon className="mr-2 text-blue-500" /> Certificate of Completion</div>
          </div>
      </div>

      <main className="container mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Key Skills Section */}
          <section>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Key Skills You'll Master</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
              {whatYoullLearn.map((item, i) => (
                <SkillBar key={i} skill={item.skill} level={item.level} />
              ))}
            </div>
          </section>

          {/* Curriculum Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Course Curriculum</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {curriculum.map((module, i) => (
                <AccordionItem key={i} module={module} index={i} />
              ))}
            </div>
          </section>

          {/* Instructor Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Meet Your Instructor</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center text-center sm:text-left">
                <img src={instructor.image} alt={instructor.name} className="w-32 h-32 rounded-full object-cover flex-shrink-0" />
                <div className="sm:ml-8 mt-6 sm:mt-0">
                    <h3 className="text-2xl font-bold text-slate-900">{instructor.name}</h3>
                    <p className="text-blue-600 font-semibold">{instructor.title}</p>
                    <p className="mt-2 text-slate-600">A passionate educator with over a decade of experience in the tech industry, Dr. Patel has a unique ability to break down complex topics into easy-to-understand concepts. He is dedicated to helping the next generation of innovators succeed.</p>
                </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CourseDetailPage;