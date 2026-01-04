import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearchParams } from 'react-router-dom';

// Mock search results
const mockResults = [
  {
    id: '1',
    type: 'project' as const,
    title: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    link: '/project/1/board',
    metadata: {
      status: 'In Progress',
    },
  },
  {
    id: '2',
    type: 'task' as const,
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication system for secure login',
    link: '/project/1/board',
    metadata: {
      status: 'In Progress',
      priority: 'high',
      assignee: 'John Doe',
      project: 'Website Redesign',
    },
  },
  {
    id: '3',
    type: 'task' as const,
    title: 'Design homepage mockup',
    description: 'Create high-fidelity mockup for the new homepage design',
    link: '/project/1/board',
    metadata: {
      status: 'Done',
      priority: 'medium',
      assignee: 'Sarah Johnson',
      project: 'Website Redesign',
    },
  },
  {
    id: '4',
    type: 'person' as const,
    title: 'Sarah Johnson',
    description: 'UI/UX Designer specializing in web and mobile applications',
    link: '/project/1/members',
    metadata: {
      role: 'Designer',
      email: 'sarah.j@example.com',
    },
  },
  {
    id: '5',
    type: 'project' as const,
    title: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement',
    link: '/project/2/board',
    metadata: {
      status: 'Planning',
    },
  },
  {
    id: '6',
    type: 'task' as const,
    title: 'API integration for user data',
    description: 'Connect frontend with backend API endpoints for user management',
    link: '/project/2/board',
    metadata: {
      status: 'To Do',
      priority: 'urgent',
      assignee: 'Michael Chen',
      project: 'Mobile App Development',
    },
  },
  {
    id: '7',
    type: 'person' as const,
    title: 'Michael Chen',
    description: 'Full-stack developer with expertise in React and Node.js',
    link: '/project/1/members',
    metadata: {
      role: 'Developer',
      email: 'michael.c@example.com',
    },
  },
];

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    project: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter results based on search query and filters
  const filteredResults = useMemo(() => {
    let results = mockResults;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type !== 'all') {
      results = results.filter((result) => result.type === filters.type);
    }

    // Filter by project
    if (filters.project !== 'all') {
      results = results.filter(
        (result) =>
          result.type === 'project' && result.title === filters.project ||
          result.metadata?.project === filters.project
      );
    }

    return results;
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-10 bg-white border-b border-gray-200"
          >
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <SidebarTrigger />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Search
                </h1>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects, tasks, and people..."
                    className="w-full pl-10 pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 border rounded-lg font-medium flex items-center gap-2 text-sm sm:text-base ${
                    showFilters ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="hidden sm:inline">Filters</span>
                </motion.button>
              </form>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Result Type
                      </label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="all">All Types</option>
                        <option value="project">Projects</option>
                        <option value="task">Tasks</option>
                        <option value="person">People</option>
                      </select>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date Range
                      </label>
                      <select
                        value={filters.dateRange}
                        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                    </div>

                    {/* Project Scope Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Scope
                      </label>
                      <select
                        value={filters.project}
                        onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="all">All Projects</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Results */}
          <div className="p-3 sm:p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              {/* Results Count */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 sm:mb-6"
                >
                  <p className="text-sm sm:text-base text-gray-600">
                    Found <span className="font-semibold">{filteredResults.length}</span> results for "
                    <span className="font-semibold">{searchQuery}</span>"
                  </p>
                </motion.div>
              )}

              {/* Results List */}
              {searchQuery ? (
                <SearchResults results={filteredResults} searchQuery={searchQuery} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 sm:py-24"
                >
                  <Search className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                    Start searching
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 text-center px-4">
                    Search for projects, tasks, or team members
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
