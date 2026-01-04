import { motion } from 'framer-motion';
import { Users, Rocket, Target, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

const About = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 selection:bg-indigo-100 dark:selection:bg-indigo-500/30 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-50 dark:bg-purple-900/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-50 dark:bg-indigo-900/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6 inline-block shadow-sm">
              Our Journey
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 dark:text-white leading-[1.1]">
              Engineering the future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                team productivity.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We're on a mission to strip away the complexity of project management, 
              leaving only the tools that actually help teams move faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">Our Story</h2>
            <div className="space-y-6 text-base md:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed">
              <p>
                Founded in 2020, TaskFlow began as a small internal tool built to solve 
                our own frustrations with bloated project software. We realized that most 
                tools were designed for managers, not the people doing the work.
              </p>
              <p>
                We rebuilt everything from the ground up with a focus on <strong>speed</strong>, 
                <strong>simplicity</strong>, and <strong>flow</strong>. Today, we empower 
                over 10,000+ teams to stay synchronized without the noise.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-slate-200 dark:border-zinc-800 pt-10">
              <StatItem label="Active Users" value="10k+" />
              <StatItem label="Countries" value="50+" />
              <div className="col-span-2 sm:col-span-1">
                <StatItem label="Uptime" value="99.9%" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-4 order-1 lg:order-2"
          >
            <ValueCard 
              icon={<Rocket className="w-6 h-6" />}
              title="Simplicity First"
              desc="We believe the best tools are the ones you forget you're using."
            />
            <ValueCard 
              icon={<Users className="w-6 h-6" />}
              title="Team Centric"
              desc="Collaboration isn't a feature; it's the core of everything we build."
            />
            <ValueCard 
              icon={<Target className="w-6 h-6" />}
              title="Constant Iteration"
              desc="We ship fast and listen harder. Your feedback drives our roadmap."
            />
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-slate-900 dark:bg-zinc-900/50 transition-colors border-y border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Meet the creators</h2>
            <p className="text-slate-400 dark:text-zinc-400">The human faces behind the code.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <TeamMember name="Jane Smith" role="CEO & Founder" initials="JS" color="bg-indigo-500" />
            <TeamMember name="Michael Davis" role="CTO" initials="MD" color="bg-purple-500" />
            <TeamMember name="Sarah Johnson" role="Head of Design" initials="SJ" color="bg-pink-500" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to find your flow?</h2>
            <p className="text-indigo-100 text-base md:text-lg mb-10 max-w-xl mx-auto opacity-90">
              Join thousands of teams who have already transformed the way they work. 
              We're always looking for brilliant minds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                Get Started Free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                View Careers <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-20 -mb-20 blur-3xl" />
        </motion.div>
      </section>
    </div>
  );
};

// Sub-components
const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">{value}</div>
    <div className="text-xs md:text-sm text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mt-1">{label}</div>
  </div>
);

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    }}
    className="p-6 md:p-8 rounded-[2rem] bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md dark:hover:bg-zinc-900 transition-all flex gap-5 items-center"
  >
    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const TeamMember = ({ name, role, initials, color }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center hover:bg-white/10 transition-all"
  >
    <div className={`w-20 h-20 md:w-24 md:h-24 ${color} rounded-3xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300 text-white`}>
      {initials}
    </div>
    <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
    <p className="text-indigo-400 dark:text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">{role}</p>
    <div className="flex justify-center gap-4 text-slate-400 group-hover:text-white transition-colors">
      <Twitter className="w-5 h-5 cursor-pointer hover:text-indigo-400 transition-colors" />
      <Linkedin className="w-5 h-5 cursor-pointer hover:text-indigo-400 transition-colors" />
      <Github className="w-5 h-5 cursor-pointer hover:text-indigo-400 transition-colors" />
    </div>
  </motion.div>
);

export default About;