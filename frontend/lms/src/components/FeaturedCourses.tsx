import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'Website Redesign Project',
    team: 'Design Team',
    status: 'In Progress',
    progress: 75,
    members: 8,
    tasks: 24,
    dueDate: 'Jan 15, 2026',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    team: 'Development Team',
    status: 'In Progress',
    progress: 45,
    members: 12,
    tasks: 36,
    dueDate: 'Feb 20, 2026',
    priority: 'High',
  },
  {
    id: 3,
    title: 'Marketing Campaign Q1',
    team: 'Marketing Team',
    status: 'Planning',
    progress: 20,
    members: 6,
    tasks: 18,
    dueDate: 'Jan 30, 2026',
    priority: 'Medium',
  },
  {
    id: 4,
    title: 'Product Launch Strategy',
    team: 'Product Team',
    status: 'In Progress',
    progress: 60,
    members: 10,
    tasks: 28,
    dueDate: 'Feb 10, 2026',
    priority: 'High',
  },
  {
    id: 5,
    title: 'Customer Support System',
    team: 'Operations Team',
    status: 'In Progress',
    progress: 85,
    members: 7,
    tasks: 15,
    dueDate: 'Jan 25, 2026',
    priority: 'Medium',
  },
  {
    id: 6,
    title: 'Database Migration',
    team: 'Infrastructure Team',
    status: 'Planning',
    progress: 30,
    members: 5,
    tasks: 22,
    dueDate: 'Mar 5, 2026',
    priority: 'High',
  },
];

const FeaturedProjects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-600';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-green-100 text-green-600';
    }
  };

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Active Projects
            </h2>
            <p className="text-gray-600">Track your ongoing projects and their progress</p>
          </div>
          
          {/* Scroll Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Projects Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            >
              {/* Project Header */}
              <div className="h-32 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">Team: {project.team}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-indigo-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{project.members} members</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>{project.tasks} tasks</span>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-gray-500">Due: {project.dueDate}</span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-semibold">
                    View Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
