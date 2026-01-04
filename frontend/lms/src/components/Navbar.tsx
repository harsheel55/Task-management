import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Data (Keep your existing features/solutions arrays here...)
const features = [
  { title: "Visual Task Management", to: "/features", description: "Kanban boards with drag-and-drop functionality." },
  { title: "Real-Time Collaboration", to: "/features", description: "See updates instantly as your team works together." },
  { title: "Smart Assignments", to: "/features", description: "Automatically assign tasks based on workload." },
];

const solutions = [
  { title: "Software Development", to: "/solutions", description: "Agile workflows for dev teams" },
  { title: "Marketing Teams", to: "/solutions", description: "Campaign planning & calendars" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Logic
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] transition-all duration-300 border-b",
      scrolled 
        ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-slate-200 dark:border-white/10 py-3" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="relative z-10">
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400"
          >
            TaskFlow
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent dark:text-zinc-300 dark:hover:text-white">Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 no-underline outline-none shadow-xl"
                          to="/features"
                        >
                          <Sparkles className="h-6 w-6 text-white mb-2" />
                          <div className="text-lg font-bold text-white mb-1">TaskFlow Pro</div>
                          <p className="text-sm leading-snug text-indigo-100">
                            Unlock the full potential of your team with our premium features.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {features.map((item) => (
                      <ListItem key={item.title} title={item.title} to={item.to}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent dark:text-zinc-300 dark:hover:text-white">Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {solutions.map((item) => (
                      <ListItem key={item.title} title={item.title} to={item.to}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {['Pricing', 'About', 'Contact'].map((item) => (
                <NavigationMenuItem key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/5")}
                  >
                    {item}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDarkMode ? 'dark' : 'light'}
                initial={{ y: 10, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -10, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="px-5 py-2.5 text-sm font-bold dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-bold bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {['Features', 'Solutions', 'Pricing', 'About', 'Contact'].map((link, idx) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link}
                >
                  <Link 
                    to={`/${link.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold dark:text-white flex items-center justify-between group"
                  >
                    {link} <ChevronDown className="-rotate-90 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 font-bold dark:text-white transition-colors text-center">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold transition-all text-center">
                  Sign Up Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Refined ListItem for Nav Dropdown
const ListItem = ({ className, title, children, to, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-indigo-50 dark:hover:bg-white/5 group",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-zinc-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default Navbar;