import React from 'react';

// Using the same icons for consistency
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const socialLinks = [
    { icon: <FacebookIcon />, href: '#' },
    { icon: <TwitterIcon />, href: '#' },
    { icon: <LinkedInIcon />, href: '#' },
    { icon: <InstagramIcon />, href: '#' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand and mission */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white">
              Career<span className="text-blue-400">Compass</span>
            </h3>
            <p className="mt-4 text-slate-400">
              Your guide to a brighter future. We help students find clarity and confidence in their career choices.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="mt-4 text-slate-400">Get the latest career tips and course updates.</p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer section */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} CareerCompass. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-slate-400 hover:text-blue-400 transition-colors">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;