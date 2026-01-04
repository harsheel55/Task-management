import { motion } from 'framer-motion';
import { Users, CheckCircle2, FolderKanban, Activity } from 'lucide-react';

const stats = [
  {
    number: '10,000',
    suffix: '+',
    label: 'Active Users',
    icon: <Users className="w-6 h-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    number: '500,000',
    suffix: '+',
    label: 'Tasks Completed',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    number: '2,500',
    suffix: '+',
    label: 'Active Projects',
    icon: <FolderKanban className="w-6 h-6" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    number: '99.9',
    suffix: '%',
    label: 'Uptime Guarantee',
    icon: <Activity className="w-6 h-6" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-[#fafafa] dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Trusted by high-performing <br />
            <span className="text-indigo-600 dark:text-indigo-400 font-black">teams worldwide.</span>
          </motion.h2>
        </div>
        
        {/* Stats Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm transition-all group overflow-hidden"
            >
              {/* Subtle background icon for depth */}
              <div className={`absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                {stat.icon && <div className="scale-[4]">{stat.icon}</div>}
              </div>

              <div className="relative z-10 flex flex-col items-center">
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} ${stat.color} flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 duration-300`}>
                  {stat.icon}
                </div>

                {/* Number Section */}
                <div className="flex items-baseline gap-0.5 mb-2">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                    {stat.number}
                  </span>
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm md:text-base font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest text-center">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;