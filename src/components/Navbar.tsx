import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Eye, EyeOff, Scale, HelpCircle, Home } from 'lucide-react';
import { ViewType } from '../types';

interface NavbarProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  showOrbits: boolean;
  setShowOrbits: (show: boolean) => void;
  isNightMode: boolean;
  setIsNightMode: (isNight: boolean) => void;
  isRealisticScale: boolean;
  setIsRealisticScale: (isRealistic: boolean) => void;
}

const Navbar = ({ 
  view, 
  setView, 
  showOrbits, 
  setShowOrbits, 
  isNightMode, 
  setIsNightMode,
  isRealisticScale,
  setIsRealisticScale
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (newView: ViewType) => {
    setView(newView);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`w-full h-16 ${isNightMode ? 'bg-gray-800 text-white' : 'bg-indigo-900 text-white'} px-4 flex items-center justify-between shadow-lg z-10`}>
      <div className="flex items-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mr-2 text-yellow-400"
        >
          <span className="text-2xl">☀️</span>
        </motion.div>
        <h1 className="text-xl font-bold">Solar System Explorer</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-2">
        <motion.button 
          onClick={() => handleNavigation('system')} 
          className={`px-3 py-2 rounded-md transition-colors flex items-center ${view === 'system' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={18} className="mr-1" />
          Solar System
        </motion.button>
        <motion.button 
          onClick={() => handleNavigation('quiz')} 
          className={`px-3 py-2 rounded-md transition-colors flex items-center ${view === 'quiz' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle size={18} className="mr-1" />
          Quiz
        </motion.button>
        <div className="h-6 border-l border-indigo-700 mx-1"></div>
        <motion.button 
          onClick={() => setShowOrbits(!showOrbits)} 
          className={`p-2 rounded-full transition-colors ${showOrbits ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={showOrbits ? "Hide Orbits" : "Show Orbits"}
        >
          {showOrbits ? <Eye size={20} /> : <EyeOff size={20} />}
        </motion.button>
        <motion.button 
          onClick={() => setIsRealisticScale(!isRealisticScale)} 
          className={`p-2 rounded-full transition-colors ${isRealisticScale ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isRealisticScale ? "Switch to Visual Scale" : "Switch to Realistic Scale"}
        >
          <Scale size={20} />
        </motion.button>
        <motion.button 
          onClick={() => setIsNightMode(!isNightMode)} 
          className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          title={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
        >
          {isNightMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <motion.button 
        className="md:hidden p-2 rounded-md hover:bg-indigo-800 transition-colors"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-16 right-0 w-48 bg-indigo-900 shadow-lg rounded-bl-md z-20"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-2">
              <button 
                onClick={() => handleNavigation('system')} 
                className={`px-3 py-2 rounded-md text-left flex items-center transition-colors ${view === 'system' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
              >
                <Home size={16} className="mr-2" />
                Solar System
              </button>
              <button 
                onClick={() => handleNavigation('quiz')} 
                className={`px-3 py-2 rounded-md text-left flex items-center transition-colors ${view === 'quiz' ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
              >
                <HelpCircle size={16} className="mr-2" />
                Quiz
              </button>
              <div className="border-t border-indigo-800 my-2"></div>
              <button 
                onClick={() => setShowOrbits(!showOrbits)} 
                className="px-3 py-2 rounded-md text-left flex items-center hover:bg-indigo-800 transition-colors"
              >
                {showOrbits ? <Eye size={16} className="mr-2" /> : <EyeOff size={16} className="mr-2" />}
                {showOrbits ? "Hide Orbits" : "Show Orbits"}
              </button>
              <button 
                onClick={() => setIsRealisticScale(!isRealisticScale)} 
                className={`px-3 py-2 rounded-md text-left flex items-center transition-colors ${isRealisticScale ? 'bg-indigo-700' : 'hover:bg-indigo-800'}`}
              >
                <Scale size={16} className="mr-2" />
                {isRealisticScale ? "Visual Scale" : "Realistic Scale"}
              </button>
              <button 
                onClick={() => setIsNightMode(!isNightMode)} 
                className="px-3 py-2 rounded-md text-left flex items-center hover:bg-indigo-800 transition-colors"
              >
                {isNightMode ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
                {isNightMode ? "Day Mode" : "Night Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;