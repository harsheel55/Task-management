import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Facebook, Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', to: '/about' },
      { name: 'Careers', to: '#' },
      { name: 'Press Kit', to: '#' },
      { name: 'Contact', to: '/contact' },
    ],
    Product: [
      { name: 'Features', to: '#' },
      { name: 'Pricing', to: '/pricing' },
      { name: 'Integrations', to: '#' },
      { name: 'Changelog', to: '#' },
    ],
    Resources: [
      { name: 'Blog', to: '#' },
      { name: 'Help Center', to: '#' },
      { name: 'Templates', to: '#' },
      { name: 'Community', to: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', to: '#' },
      { name: 'Terms of Service', to: '#' },
      { name: 'Cookie Policy', to: '#' },
    ]
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">
                TaskFlow
              </h3>
            </Link>
            <p className="text-lg text-slate-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Transform your team's productivity with the world's most intuitive project management platform.
            </p>
            
            {/* Newsletter */}
            <div className="relative max-w-sm">
              <p className="text-sm font-bold dark:text-white mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-indigo-500" /> Stay updated
              </p>
              <form className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-2xl outline-none transition-all dark:text-white text-sm"
                />
                <button className="absolute right-1.5 top-1.5 p-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
                  {category}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.to} 
                        className="text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Legal / Copyright */}
          <div className="flex flex-col md:items-end gap-2">
            <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium text-center md:text-right">
              © {currentYear} TaskFlow Inc. Built for high-performing teams.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-6">
              <Link to="#" className="text-xs text-slate-400 dark:text-zinc-600 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold">Status</Link>
              <Link to="#" className="text-xs text-slate-400 dark:text-zinc-600 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold">Privacy</Link>
              <Link to="#" className="text-xs text-slate-400 dark:text-zinc-600 hover:text-indigo-500 transition-colors uppercase tracking-widest font-bold">Security</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;