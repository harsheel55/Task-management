import { motion } from 'framer-motion';
import { 
  Code2, Megaphone, BarChart3, Settings2, 
  DollarSign, LifeBuoy, Check, ArrowRight, Sparkles
} from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      title: 'Software Development',
      description: 'Agile project management built for high-velocity dev teams.',
      benefits: ['Sprint planning', 'Bug tracking', 'Git integration', 'Code reviews'],
      icon: <Code2 className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Marketing Teams',
      description: 'Campaign planning and creative asset management.',
      benefits: ['Content calendars', 'Campaign tracking', 'Asset organization', 'Approvals'],
      icon: <Megaphone className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Product Management',
      description: 'Roadmap planning and feature prioritization.',
      benefits: ['Roadmap visuals', 'Prioritization', 'Feedback loops', 'Stakeholder sync'],
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Operations',
      description: 'Process automation and resource management.',
      benefits: ['SOP automation', 'Resource allocation', 'Compliance', 'Optimization'],
      icon: <Settings2 className="w-8 h-8" />,
      color: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Sales Teams',
      description: 'Pipeline visualization and deal tracking.',
      benefits: ['Pipeline management', 'Lead tracking', 'Forecasting', 'Proposal tools'],
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Customer Support',
      description: 'Ticket management and customer service sync.',
      benefits: ['SLA management', 'Knowledge base', 'Team sync', 'Satisfaction metrics'],
      icon: <LifeBuoy className="w-8 h-8" />,
      color: 'from-sky-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-500/30">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-50 dark:bg-indigo-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-50 dark:bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide uppercase inline-flex items-center gap-2 mb-6 shadow-sm">
              <Sparkles size={14} /> Ecosystem
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 dark:text-white leading-[1.1]">
              Solutions for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                every team.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              TaskFlow is built to be flexible. We provide the structure; you provide the workflow. 
              Find the perfect fit for your department.
            </p>
          </motion.div>
        </div>

        {/* Staggered Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {solutions.map((solution, idx) => (
            <SolutionCard key={idx} {...solution} />
          ))}
        </motion.div>

        {/* Secondary Help Section */}
        <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 text-center shadow-sm mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Not sure where to start?</h2>
          <p className="text-slate-500 dark:text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Our solution architects can help you build the perfect workspace for your unique organizational needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
              Book a Strategy Call
            </button>
            <button className="px-8 py-4 bg-slate-100 dark:bg-white/5 dark:text-white rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
              Contact Sales
            </button>
          </div>
        </section>

        {/* Final CTA */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-none"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start your free trial today.</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-lg mx-auto opacity-90">
              No credit card required. Setup takes less than 2 minutes.
            </p>
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-colors shadow-xl">
              Get Started Free
            </button>
          </div>
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-20 -mb-20 blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
};

// Card Component
const SolutionCard = ({ title, description, benefits, icon, color }: any) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8 }}
      className="group p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-3 dark:text-white leading-tight">{title}</h3>
      <p className="text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed text-sm md:text-base">
        {description}
      </p>

      <ul className="space-y-3 mb-10 flex-grow">
        {benefits.map((benefit: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-zinc-300">
            <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 stroke-[3px]" />
            </div>
            {benefit}
          </li>
        ))}
      </ul>

      <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all group/btn">
        Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

export default Solutions;