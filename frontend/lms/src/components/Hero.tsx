import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Shield, ArrowRight } from 'lucide-react';

const Hero = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-[#fafafa] dark:bg-zinc-950 transition-colors duration-500">
      
      {/* --- Background Atmosphere --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light Mode Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 dark:bg-indigo-900/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-100/50 dark:bg-purple-900/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 dark:brightness-0 contrast-150"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* --- Left Content --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide uppercase inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                TaskFlow 2.0 is here
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Organize. Collaborate. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Achieve more.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              The intuitive command center for high-performing teams. Manage complex projects with Kanban clarity and real-time collaboration.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group">
                Start for free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Watch Demo
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 pt-6"
            >
              <TrustBadge icon={<Shield className="w-4 h-4" />} text="No credit card" />
              <TrustBadge icon={<CheckCircle className="w-4 h-4" />} text="Free forever plan" />
              <TrustBadge icon={<Users className="w-4 h-4" />} text="10k+ users" />
            </motion.div>
          </motion.div>

          {/* --- Right Content - Animated Mockup --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:block relative"
          >
            {/* Main Board Card */}
            <div className="relative bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl dark:shadow-none overflow-hidden group">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="h-2 w-12 bg-slate-100 dark:bg-white/5 rounded" />
                  <MockupCard color="bg-indigo-400" width="w-full" />
                  <MockupCard color="bg-purple-400" width="w-3/4" />
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-12 bg-slate-100 dark:bg-white/5 rounded" />
                  <MockupCard color="bg-emerald-400" width="w-full" />
                  <div className="h-24 rounded-2xl border-2 border-dashed border-slate-100 dark:border-white/5" />
                </div>
              </div>

              {/* Glass Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            </div>

            {/* Floating Avatars Element */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 rounded-2xl p-3 shadow-xl border border-slate-200 dark:border-white/10 flex items-center gap-3"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-zinc-800 bg-indigo-${i+2}00`} />
                ))}
              </div>
              <span className="text-xs font-bold dark:text-white">Collaborating</span>
            </motion.div>

            {/* Floating Notification */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-6 bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-white/10 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Task Completed</p>
                <p className="text-xs font-bold dark:text-white">Design finalized</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Sub-components
const TrustBadge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 font-medium text-sm">
    <span className="text-indigo-500 dark:text-indigo-400">{icon}</span>
    {text}
  </div>
);

const MockupCard = ({ color, width }: { color: string, width: string }) => (
  <motion.div 
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl space-y-2"
  >
    <div className={`h-1.5 ${width} ${color} rounded opacity-60`} />
    <div className="h-1.5 w-1/2 bg-slate-200 dark:bg-white/10 rounded" />
  </motion.div>
);

export default Hero;