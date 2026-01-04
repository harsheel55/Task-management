import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Facebook } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 selection:bg-indigo-100 dark:selection:bg-indigo-500/30 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50 dark:bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 dark:bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4 inline-block border border-indigo-100 dark:border-indigo-500/20">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 dark:text-white">
            Let's start a <span className="text-indigo-600 dark:text-indigo-400">conversation.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Have a question or just want to say hi? We'd love to hear from you. 
            Our team usually responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-10 md:space-y-12 order-2 lg:order-1"
          >
            <div className="space-y-6 md:space-y-8">
              <ContactInfoCard 
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                details={["support@taskflow.com", "sales@taskflow.com"]}
              />
              <ContactInfoCard 
                icon={<Phone className="w-6 h-6" />}
                title="Phone"
                details={["+1 (555) 123-4567", "Mon-Fri 9am-6pm EST"]}
              />
              <ContactInfoCard 
                icon={<MapPin className="w-6 h-6" />}
                title="Office"
                details={["123 Business Street", "San Francisco, CA 94102"]}
              />
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-zinc-800">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-6">Follow our journey</h3>
              <div className="flex gap-4">
                {[Twitter, Linkedin, Facebook].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors shadow-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-white dark:border-white/10">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                  <InputField 
                    label="Full Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="John Doe" 
                  />
                  <InputField 
                    label="Email Address" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="john@example.com" 
                  />
                </div>
                <InputField 
                  label="Subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="How can we help?" 
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2 ml-1">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your project..."
                    className="w-full px-5 py-4 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 resize-none placeholder:text-slate-400 dark:placeholder:text-zinc-600 dark:text-white"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoCard = ({ icon, title, details }: { icon: React.ReactNode, title: string, details: string[] }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    }}
    className="flex items-start gap-5 group"
  >
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:shadow-md group-hover:border-indigo-100 dark:group-hover:border-indigo-500/30 transition-all duration-300 shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      {details.map((line, i) => (
        <p key={i} className="text-slate-500 dark:text-zinc-400 text-sm md:text-base">{line}</p>
      ))}
    </div>
  </motion.div>
);

const InputField = ({ label, ...props }: any) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2 ml-1">{label}</label>
    <input
      {...props}
      required
      className="w-full px-5 py-4 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-zinc-600 dark:text-white text-sm md:text-base"
    />
  </div>
);

export default Contact;