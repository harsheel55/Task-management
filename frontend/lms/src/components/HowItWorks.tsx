import { motion } from 'framer-motion';
import { Sparkles, UserPlus, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Create Your Project',
    description: 'Sign up for free and set up your workspace in under 60 seconds with our intuitive onboarding.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/10',
  },
  {
    id: '02',
    title: 'Invite Your Team',
    description: 'Break down your project into manageable tasks and invite your team to start collaborating instantly.',
    icon: <UserPlus className="w-6 h-6" />,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: '03',
    title: 'Track & Deliver',
    description: 'Monitor progress through Kanban boards and celebrate milestones as you hit your goals together.',
    icon: <Rocket className="w-6 h-6" />,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#fafafa] dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase">
              The Process
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Simple as <span className="text-indigo-600 dark:text-indigo-400 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">1, 2, 3.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Start managing your projects in minutes, not hours. We've stripped away 
              the fluff to help you focus on what matters.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[20%] left-[15%] right-[15%] h-px border-t border-dashed border-slate-200 dark:border-white/10 -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="relative group bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-300"
            >
              {/* Step Number Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-slate-100 dark:text-zinc-800 transition-colors group-hover:text-indigo-600/10 duration-500">
                  {step.id}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 dark:text-white tracking-tight leading-tight">
                {step.title}
              </h3>
              <p className="text-slate-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>

              {/* Interactive Decoration */}
              <div className="mt-8 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center space-y-6"
        >
          <button className="px-10 py-5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all active:scale-95 flex items-center gap-3 mx-auto">
            Get Started Now <CheckCircle2 className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-400 dark:text-zinc-500 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free forever</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;