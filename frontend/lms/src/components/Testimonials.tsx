import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    initials: 'SJ',
    color: 'bg-blue-500',
    review: "TaskFlow transformed how our team works. We've cut project delivery time by 35% and everyone knows exactly what they need to do.",
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Engineering Lead',
    company: 'StartupXYZ',
    initials: 'MC',
    color: 'bg-indigo-500',
    review: "The best project management tool we've used. Simple enough for everyone to adopt, powerful enough for complex projects.",
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'CreativeAgency',
    initials: 'ER',
    color: 'bg-purple-500',
    review: "Real-time collaboration features are game-changing. Our remote team feels more connected than ever.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play (Optional)
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="py-24 bg-[#fafafa] dark:bg-zinc-950 transition-colors duration-500 overflow-hidden relative">
      
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase">
              Social Proof
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Trusted by the world's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                best teams.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          
          <div className="relative min-h-[450px] md:min-h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-indigo-100/20 dark:shadow-none flex flex-col items-center text-center">
                  
                  {/* Quote Icon */}
                  <div className="mb-8 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Quote size={32} fill="currentColor" className="opacity-20" />
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-xl md:text-3xl font-medium text-slate-800 dark:text-zinc-100 leading-snug md:leading-tight mb-10 max-w-3xl">
                    "{testimonials[currentIndex].review}"
                  </blockquote>

                  {/* Star Rating */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl ${testimonials[currentIndex].color} flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg`}>
                      {testimonials[currentIndex].initials}
                    </div>
                    <h4 className="text-xl font-bold dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-slate-500 dark:text-zinc-500 font-medium">
                      {testimonials[currentIndex].role} — {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 md:-px-12 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-xl pointer-events-auto text-slate-600 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-xl pointer-events-auto text-slate-600 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </motion.button>
          </div>
        </div>

        {/* Dynamic Dot Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="relative py-2 focus:outline-none"
            >
              <div className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                {index === currentIndex && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute inset-0 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;