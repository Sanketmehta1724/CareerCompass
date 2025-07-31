// src/pages/ExplorePage.js
import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import SearchIcon from '@mui/icons-material/Search';

// Mock data to simulate fetching courses from your backend
const mockCourses = [
  { id: 1, title: 'Foundations of AI & ML', category: 'Technology', description: 'Understand the fundamentals of Artificial Intelligence and build your first predictive models.', image: '/images/course-ai.jpg' },
  { id: 2, title: 'Full-Stack Web Development', category: 'Technology', description: 'Master the MERN stack and build complete web applications from scratch.', image: '/images/course-webdev.jpg' },
  { id: 3, title: 'UI/UX Design for Beginners', category: 'Creative Arts', description: 'Learn the principles of user-centric design and create beautiful, intuitive interfaces.', image: '/images/course-uiux.jpg' },
  { id: 4, title: 'Introduction to Cloud Computing', category: 'Technology', description: 'Explore the world of cloud services with AWS and deploy your first scalable application.', image: '/images/course-cloud.jpg' },
  { id: 5, title: 'Digital Marketing Essentials', category: 'Business', description: 'Master SEO, SEM, and social media marketing to grow any business online.', image: '/images/course-marketing.jpg' },
  { id: 6, title: 'Data Science with Python', category: 'Technology', description: 'Dive into data analysis, visualization, and statistical modeling using Python.', image: '/images/course-datasci.jpg' },
  { id: 7, title: 'Graphic Design & Illustration', category: 'Creative Arts', description: 'Unleash your creativity by learning Adobe Illustrator and Photoshop from the ground up.', image: '/images/course-graphic.jpg' },
  { id: 8, title: 'Blockchain & Web3 Fundamentals', category: 'Technology', description: 'Understand the technology behind cryptocurrencies and decentralized applications.', image: '/images/course-web3.jpg' },
];

// Stagger animation for the grid container
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ExplorePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Explore Career Paths</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Discover the courses and skills you need to land your dream job in today's most in-demand industries.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for a course or career..."
              className="w-full py-3 pl-4 pr-12 text-lg border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <SearchIcon className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ExplorePage;