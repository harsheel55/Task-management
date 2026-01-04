const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Product Manager',
    department: 'Product',
    projects: 15,
    tasks: 124,
    rating: 4.9,
    image: 'member-1',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Lead Developer',
    department: 'Engineering',
    projects: 12,
    tasks: 156,
    rating: 4.8,
    image: 'member-2',
  },
  {
    id: 3,
    name: 'Emma Williams',
    title: 'Design Lead',
    department: 'Design',
    projects: 10,
    tasks: 98,
    rating: 4.9,
    image: 'member-3',
  },
  {
    id: 4,
    name: 'David Martinez',
    title: 'Marketing Director',
    department: 'Marketing',
    projects: 8,
    tasks: 72,
    rating: 4.7,
    image: 'member-4',
  },
];

const TopTeamMembers = () => {
  return (
    <section id="team" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Performers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our team's top performers and project leaders
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Member Image */}
              <div className="relative h-64 bg-gradient-to-br from-indigo-400 to-purple-500 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Avatar Placeholder */}
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40">
                    <span className="text-4xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                {/* Department Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-semibold rounded-full">
                    {member.department}
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {member.title}
                </p>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Projects</span>
                    <span className="font-semibold text-gray-900">
                      {member.projects}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tasks Completed</span>
                    <span className="font-semibold text-gray-900">
                      {member.tasks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Performance</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="font-semibold text-gray-900">
                        {member.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* View Profile Button */}
                <button className="w-full py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
            View All Team Members
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopTeamMembers;
