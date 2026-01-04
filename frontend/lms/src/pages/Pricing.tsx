import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, Zap, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for individuals and side projects',
      features: ['10 projects', 'Basic management', '5 team members', 'Mobile app', 'Email support'],
      highlighted: false,
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: isYearly ? '9' : '12',
      description: 'For growing teams and businesses',
      features: ['Unlimited projects', 'Advanced analytics', '50 team members', 'Priority support', 'Custom workflows', 'Integrations'],
      highlighted: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: isYearly ? '39' : '49',
      description: 'For large-scale organizations',
      features: ['Everything in Pro', 'Unlimited members', '24/7 support', 'Dedicated CSM', 'Advanced security', 'SLA guarantees'],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 selection:bg-indigo-100 dark:selection:bg-indigo-500/30 pb-20 transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-500/10 dark:to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 dark:text-white"
          >
            Predictable <span className="text-indigo-600 dark:text-indigo-400">pricing.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            Whether you're a solo creator or a global enterprise, we have a plan that fits your workflow.
          </motion.p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-slate-200 dark:bg-zinc-800 rounded-full p-1 relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <motion.div 
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-white dark:bg-indigo-400 rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              Yearly <span className="ml-1 text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 items-center">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-8 md:p-16 shadow-sm mb-20">
          <div className="flex items-center gap-3 mb-12">
            <HelpCircle className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Common Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <FAQItem 
              question="Can I change plans later?" 
              answer="Absolutely. You can upgrade or downgrade at any time. If you upgrade, the prorated difference will be applied immediately." 
            />
            <FAQItem 
              question="Is there a free trial for Pro?" 
              answer="Yes, all paid plans start with a 14-day free trial. No credit card is required to set up your workspace." 
            />
            <FAQItem 
              question="Do you offer education discounts?" 
              answer="We do! We offer a 50% discount for registered students and non-profit organizations. Reach out to our support team." 
            />
            <FAQItem 
              question="What is your refund policy?" 
              answer="If you're unhappy with TaskFlow, we offer a 30-day money-back guarantee, no questions asked." 
            />
          </div>
        </section>

        {/* Bottom CTA */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-slate-900 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-slate-400 dark:text-zinc-400 mb-8 max-w-lg mx-auto text-sm md:text-base">
              Our sales team is happy to help you find the right setup for your organization's specific needs.
            </p>
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 mx-auto">
              Talk to an Expert <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[100%] bg-indigo-500 rounded-full blur-[120px]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Sub-components
const PricingCard = ({ plan, isYearly }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`relative p-8 rounded-[2.5rem] transition-all duration-300 border h-full flex flex-col ${
        plan.highlighted 
          ? 'bg-white dark:bg-zinc-900 border-indigo-600 dark:border-indigo-500 ring-1 ring-indigo-600 dark:ring-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-indigo-900/40 z-10' 
          : 'bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-white/10'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
          <Zap className="w-3 h-3 fill-current" /> Recommended
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 dark:text-white">{plan.name}</h3>
        <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">{plan.description}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl md:text-4xl font-bold dark:text-white">$</span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={plan.price}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-5xl md:text-6xl font-bold tracking-tight dark:text-white"
            >
              {plan.price}
            </motion.span>
          </AnimatePresence>
          <span className="text-slate-400 dark:text-zinc-500 font-medium">/mo</span>
        </div>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-zinc-300 text-sm">
            <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 stroke-[3px]" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
        plan.highlighted 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-500' 
        : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10'
      }`}>
        {plan.cta}
      </button>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
  <div className="space-y-3">
    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{question}</h4>
    <p className="text-slate-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base">{answer}</p>
  </div>
);

export default Pricing;