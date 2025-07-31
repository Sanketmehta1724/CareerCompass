import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setCoursesOpen] = useState(false);

  const navLinks = [{ title: 'Explore', href: '#' }]; // Simplified for this example

  // --- Data for our new dropdown menu ---
  const courseCategories = [
    { name: 'Technology', icon: <CodeIcon />, href: '#' },
    { name: 'Creative Arts', icon: <PaletteIcon />, href: '#' },
    { name: 'Business', icon: <BusinessCenterIcon />, href: '#' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-600">
              Career<span className="text-slate-700">Compass</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Courses Dropdown Trigger */}
            <div 
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
              className="relative"
            >
              <button className="flex items-center font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-200">
                Courses
                <KeyboardArrowDownIcon className={`ml-1 transition-transform duration-200 ${isCoursesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* The Dropdown Menu Itself */}
              <AnimatePresence>
                {isCoursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-sm"
                  >
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 grid grid-cols-1 gap-4">
                      {courseCategories.map((category) => (
                        <a key={category.name} href={category.href} className="flex items-center p-3 rounded-lg hover:bg-slate-50">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">{category.icon}</div>
                          <span className="ml-4 font-semibold text-slate-700">{category.name}</span>
                        </a>
                      ))}
                      <div className="border-t border-slate-200 pt-4 mt-2">
                        <a href="/explore" className="flex items-center justify-between p-3 rounded-lg bg-slate-100 hover:bg-slate-200">
                          <span className="font-bold text-slate-800">Explore All Courses</span>
                          <ArrowForwardIcon className="text-blue-600" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <a key={link.title} href={link.href} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-200">
                {link.title}
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <a href="#" className="font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200">
              Log In
            </a>
            <a href="#" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-slate-100">
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Courses</h3>
              {courseCategories.map(c => <a key={c.name} href={c.href} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">{c.name}</a>)}
              <h3 className="px-3 pt-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</h3>
              {navLinks.map(l => <a key={l.title} href={l.href} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">{l.title}</a>)}
              <div className="pt-4 pb-2 border-t border-slate-200">
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Log In</a>
                <a href="#" className="mt-1 block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Sign Up</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;