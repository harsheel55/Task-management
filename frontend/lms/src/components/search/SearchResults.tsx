import { motion, AnimatePresence } from 'framer-motion';
import { SearchResultItem } from './SearchResultItem';
import { Search as SearchIcon } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'project' | 'task' | 'person';
  title: string;
  description?: string;
  link: string;
  metadata?: {
    status?: string;
    priority?: string;
    assignee?: string;
    project?: string;
    role?: string;
    email?: string;
  };
}

interface SearchResultsProps {
  results: SearchResult[];
  searchQuery: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const SearchResults = ({ results, searchQuery }: SearchResultsProps) => {
  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 sm:py-24"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <SearchIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mb-4" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
          No results found
        </h3>
        <p className="text-sm sm:text-base text-gray-500 text-center px-4">
          Try different keywords or check your spelling
        </p>
      </motion.div>
    );
  }

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const typeLabels = {
    project: 'Projects',
    task: 'Tasks',
    person: 'People',
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      {Object.entries(groupedResults).map(([type, typeResults]) => (
        <motion.div key={type} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {typeLabels[type as keyof typeof typeLabels]}
              </h3>
              <span className="text-xs sm:text-sm text-gray-500">
                {typeResults.length} {typeResults.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {typeResults.map((result) => (
              <SearchResultItem
                key={result.id}
                result={result}
                searchQuery={searchQuery}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};
