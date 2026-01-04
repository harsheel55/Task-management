import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'Is TaskFlow really free?',
    answer: 'Yes! Our Free plan is completely free forever for teams up to 5 members. You get unlimited projects, tasks, and access to core features with no hidden fees or time limits.',
  },
  {
    id: 2,
    question: 'Can I invite team members?',
    answer: 'Absolutely! With the Free plan, you can invite up to 5 team members. Pro and Enterprise plans support unlimited team members with advanced collaboration features.',
  },
  {
    id: 3,
    question: 'How does the 14-day trial work?',
    answer: 'Start a Pro trial without entering payment details. Access all Pro features for 14 days. After the trial, choose to upgrade or continue with our generous Free plan.',
  },
  {
    id: 4,
    question: 'Can I switch plans later?',
    answer: 'Yes! You can upgrade, downgrade, or cancel anytime. When upgrading, you\'ll get immediate access to new features. Downgrades take effect at the end of your billing cycle.',
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely.',
  },
  {
    id: 6,
    question: 'Is my data secure?',
    answer: 'Security is our top priority. We use bank-level encryption, SOC 2 compliance, regular security audits, and data is backed up daily. Enterprise plans include SSO and advanced security features.',
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about TaskFlow
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact our support team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
