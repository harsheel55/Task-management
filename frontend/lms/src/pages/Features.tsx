import { motion } from 'framer-motion';
import { 
  Layout, Users, Zap, BarChart3, Settings, 
  Share2, Smartphone, ShieldCheck, Clock, ArrowRight 
} from 'lucide-react';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide uppercase inline-block border border-indigo-100 dark:border-indigo-500/20 mb-6">
            Capabilities
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 dark:text-white leading-tight">
            Built for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              modern workflow.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to manage projects, collaborate with your team, 
            and deliver exceptional results without the friction.
          </p>
        </motion.div>

        {/* Bento-style Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {/* Main Feature - Large */}
          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-8 bg-indigo-600 dark:bg-indigo-500 text-white"
            icon={<Layout className="w-8 h-8" />}
            title="Visual Task Management"
            desc="Organize tasks with intuitive Kanban boards, lists, and calendars. Drag and drop to prioritize and manage your workflow effortlessly."
            lightText
          />

          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-4"
            icon={<Users className="w-8 h-8 text-blue-500" />}
            title="Team Collaboration"
            desc="Work together seamlessly. See updates instantly and stay in sync."
          />

          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-4"
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="Smart Assignments"
            desc="Automatically distribute tasks based on team workload."
          />

          {/* Feature with extra space */}
          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-4"
            icon={<BarChart3 className="w-8 h-8 text-purple-500" />}
            title="Powerful Analytics"
            desc="Track performance with detailed reports and make data-driven decisions to boost productivity."
          />

          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-4"
            icon={<Settings className="w-8 h-8 text-slate-500" />}
            title="Custom Workflows"
            desc="Define stages and automate transitions to match your process."
          />

          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-4"
            icon={<Share2 className="w-8 h-8 text-pink-500" />}
            title="Deep Integrations"
            desc="Connect with Slack, GitHub, and more seamlessly."
          />

          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-6"
            icon={<Smartphone className="w-8 h-8 text-emerald-500" />}
            title="Mobile Ready"
            desc="Stay productive on the go with our native iOS and Android apps. Access tasks anywhere, anytime."
          />

          <FeatureCard 
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-6"
            icon={<ShieldCheck className="w-8 h-8 text-indigo-500" />}
            title="Enterprise Security"
            desc="End-to-end encryption, SSO, and SOC 2 compliance to keep your most sensitive data safe."
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-8 md:p-16 rounded-[2.5rem] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-center relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Ready to streamline <br /> your operations?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-indigo-600 dark:bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-indigo-500/20">
                Start Free Trial <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 dark:bg-zinc-100 dark:text-zinc-900 border border-white/20 dark:border-zinc-200 backdrop-blur-md rounded-2xl font-bold hover:bg-white/20 dark:hover:bg-zinc-200 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -ml-32 -mb-32" />
        </motion.div>
      </div>
    </div>
  );
};

// Sub-component for Feature Cards
const FeatureCard = ({ icon, title, desc, className, variants, lightText = false }: any) => {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`p-8 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between group ${className} ${
        lightText 
          ? 'border-transparent shadow-2xl shadow-indigo-200 dark:shadow-none' 
          : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl dark:shadow-none'
      }`}
    >
      <div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 ${
          lightText ? 'bg-white/20 text-white' : 'bg-slate-50 dark:bg-zinc-800'
        }`}>
          {icon}
        </div>
        <h3 className={`text-2xl font-bold mb-4 tracking-tight ${lightText ? 'text-white' : 'dark:text-white'}`}>
          {title}
        </h3>
        <p className={`text-sm md:text-base leading-relaxed ${
          lightText ? 'text-indigo-50' : 'text-slate-500 dark:text-zinc-400'
        }`}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default Features;