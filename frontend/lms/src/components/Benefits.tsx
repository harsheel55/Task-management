const benefits = [
  {
    id: 1,
    title: 'Increase Productivity',
    description: 'Teams using TaskFlow report 40% faster project completion and 3x better task visibility.',
    icon: 'lightning',
    stat: '40%',
    statLabel: 'Faster',
  },
  {
    id: 2,
    title: 'Reduce Meetings',
    description: 'Keep everyone aligned without endless meetings. All project updates and discussions in one place.',
    icon: 'message',
    stat: '60%',
    statLabel: 'Less Meetings',
  },
  {
    id: 3,
    title: 'Stay Organized',
    description: 'No more scattered tools and lost information. Everything your team needs lives in TaskFlow.',
    icon: 'folder',
    stat: '100%',
    statLabel: 'Organized',
  },
  {
    id: 4,
    title: 'Scale Effortlessly',
    description: 'Perfect for teams of 5 or 500. Grow your workspace as your organization expands.',
    icon: 'trending',
    stat: '∞',
    statLabel: 'Scalable',
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Teams Love TaskFlow
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real results from real teams using TaskFlow every day
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="relative group"
            >
              {/* Card */}
              <div className="h-full bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {benefit.icon === 'lightning' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )}
                    {benefit.icon === 'message' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    )}
                    {benefit.icon === 'folder' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    )}
                    {benefit.icon === 'trending' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    )}
                  </svg>
                </div>

                {/* Stat Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-indigo-600">{benefit.stat}</span>
                    <span className="text-sm font-semibold text-gray-500">{benefit.statLabel}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to boost your team's productivity?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of teams already using TaskFlow to deliver projects faster
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
