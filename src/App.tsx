/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, ArrowRight, Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect, createContext, useContext } from 'react';
import { cn } from './lib/utils';

// --- Theme Context ---
const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-paper dark:bg-royal-black flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center pb-6 overflow-visible"
      >
<span className="text-6xl md:text-8xl font-handwriting text-ink dark:text-paper inline-block py-12 px-8 leading-none overflow-visible">
  jiya ghai
</span>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-[1px] bg-ink/20 dark:bg-paper/20 mt-8 mx-auto"
        />
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 lg:px-24 flex justify-center mix-blend-difference text-white">
      <div className="max-w-7xl w-full flex justify-between items-center">
        <Link 
          to="/" 
          className={cn(
            "text-xl md:text-2xl font-serif font-bold tracking-tighter transition-all duration-500",
            scrolled ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100"
          )}
        >
          JIYA GHAI
        </Link>
        
        <div className="flex items-center gap-6 md:gap-12">
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 lg:gap-12 text-[10px] uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "hover:opacity-50 transition-opacity relative py-1",
                  location.pathname === link.path && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 hover:opacity-50 transition-opacity"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-paper dark:bg-royal-black flex flex-col items-center justify-center gap-8 text-3xl font-serif z-[60]"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="hover:italic transition-all text-ink dark:text-paper"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Portfolio = () => {
  const illustrations = [
    // First two images are the attached ones
    { id: 1, src: '/illus/wide2.JPG', aspect: 'aspect-video' },
    { id: 2, src: '/illus/wide5.JPG', aspect: 'aspect-video' },
    { id: 3, src: '/illus/wide7.JPG', aspect: 'aspect-video' },
    { id: 4, src: '/illus/wide6.JPG', aspect: 'aspect-[1280/874]'},
    { id: 5, src: '/illus/wide11.JPG', aspect: 'aspect-[1280/877]' },
    { id: 6, src: '/illus/wide4.JPG', aspect: 'aspect-[1280/874]' },
    { id: 7, src: '/illus/wide1.JPG', aspect: 'aspect-[1280/875]' },
    { id: 8, src: '/illus/wide10.JPG', aspect: 'aspect-[1280/875]' },
    { id: 9, src: '/illus/wide3.JPG', aspect: 'aspect-[1280/875]' },
    { id: 10, src: '/illus/wide8.JPG', aspect: 'aspect-[1280/875]' },
    { id: 11, src: '/illus/wide9.JPG', aspect: 'aspect-[1280/875]' },
    { id: 12, src: '/illus/banana.JPG', aspect: 'aspect-[1280/1080]' },
    { id: 13, src: '/illus/eeping.JPG', aspect: 'aspect-[2425/2720]' },
    { id: 14, src: '/illus/coke.JPG', aspect: 'aspect-[1080/1920]' },
    { id: 15, src: '/illus/tulips.JPG', aspect: 'aspect-[2480/3508]' },
    { id: 16, src: '/illus/menpippa.JPG', aspect: 'aspect-[2480/3508]' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <header className="mb-24 max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[1.2] tracking-tighter mb-8"
        >
          <span className="font-serif font-light italic">Visual</span> <br /> 
          <span className="font-serif font-light italic opacity-30 dark:opacity-100">Storytelling</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-xl text-base md:text-lg text-ink font-light leading-relaxed lowercase"
        >
          i, jiya ghai, is an illustrator and visual artist based in new delhi, 
          crafting whimsical, surreal digital narratives where the ordinary 
          dissolves into dreamlike, emotionally charged worlds.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 lg:gap-x-24 gap-y-16 md:gap-y-32 max-w-7xl mx-auto">
        {illustrations.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={cn(
              "group relative",
              index % 2 !== 0 && "md:mt-32" // Staggered layout
            )}
          >
<div className="flex justify-center items-center">
              <img 
                src={item.src} 
                alt={`Illustration ${item.id}`}
                referrerPolicy="no-referrer"
                loading="lazy"
className="max-h-[70vh] w-auto object-contain transition-transform duration-1000 rounded-xl"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[12vw] md:text-[10vw] lg:text-[6vw] font-serif font-bold leading-none tracking-tighter mb-12 text-ink"
        >
          Let's create <br />
          <span className="italic font-normal text-stroke text-ink">something</span> new.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div className="space-y-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-ink mb-4 opacity-40">Inquiries</p>
              <a href="mailto:jiyaghai2005@gmail.com" className="text-xl md:text-2xl lg:text-3xl hover:italic transition-all border-b border-ink/20 pb-2 break-all">
                jiyaghai2005@gmail.com
              </a>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-widest text-ink mb-4 opacity-40">Social</p>
              <div className="flex gap-8">
                <a href="https://www.instagram.com/purplllepip?igsh=MWMxZm02MjVocTYzeQ==" className="hover:opacity-50 transition-opacity flex items-center gap-2">
                  <Instagram size={20} />
                  <span className="text-lg">Instagram</span>
                </a>
                <a href="https://dribbble.com/jiya-ghai" className="hover:opacity-50 transition-opacity flex items-center gap-2">
                  <Mail size={20} />
                  <span className="text-lg">Dribbble</span>
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-ink">Name</label>
              <input type="text" className="w-full bg-transparent border-b border-ink/20 py-4 outline-none focus:border-ink transition-colors font-light placeholder:text-ink/40" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-ink">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-ink/20 py-4 outline-none focus:border-ink transition-colors font-light placeholder:text-ink/40" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-ink">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-ink/20 py-4 outline-none focus:border-ink transition-colors font-light resize-none placeholder:text-ink/40" placeholder="Tell me about your project"></textarea>
            </div>
            <button className="px-12 py-4 bg-ink text-paper text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-4 group">
              Send Message
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="px-6 md:px-12 py-24 border-t border-ink/5 flex flex-col items-center justify-center gap-6 overflow-visible">
<span className="text-5xl md:text-7xl font-handwriting text-ink opacity-80 inline-block py-10 px-8 leading-none overflow-visible">
  jiya ghai
</span>
  </footer>
);

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Router>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative selection:bg-ink dark:selection:bg-paper selection:text-paper dark:selection:text-ink"
            >
              <Navbar />
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </ThemeContext.Provider>
  );
}
