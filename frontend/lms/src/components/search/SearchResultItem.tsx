import { motion } from 'framer-motion';
import { ExternalLink, User, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface SearchResultItemProps {
  result: SearchResult;
  searchQuery: string;
}

const typeConfig = {
  project: {
    icon: ExternalLink,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  task: {
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  person: {
    icon: User,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-yellow-200 text-gray-900 font-semibold">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export const SearchResultItem = ({ result, searchQuery }: SearchResultItemProps) => {
  const config = typeConfig[result.type];
  const Icon = config.icon;

  return (
    <Link to={result.link}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01, backgroundColor: 'rgba(0,0,0,0.02)' }}
        className="p-3 sm:p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex gap-3 sm:gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                {highlightText(result.title, searchQuery)}
              </h3>
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded capitalize flex-shrink-0">
                {result.type}
              </span>
            </div>

            {result.description && (
              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                {highlightText(result.description, searchQuery)}
              </p>
            )}

            {/* Metadata */}
            {result.metadata && (
              <div className="flex flex-wrap gap-2 text-xs">
                {result.metadata.status && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {result.metadata.status}
                  </span>
                )}
                {result.metadata.priority && (
                  <span className={`px-2 py-0.5 rounded ${
                    result.metadata.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    result.metadata.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    result.metadata.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {result.metadata.priority}
                  </span>
                )}
                {result.metadata.assignee && (
                  <span className="text-gray-500">
                    Assigned to: {result.metadata.assignee}
                  </span>
                )}
                {result.metadata.project && (
                  <span className="text-gray-500">
                    Project: {result.metadata.project}
                  </span>
                )}
                {result.metadata.role && (
                  <span className="text-gray-500">
                    {result.metadata.role}
                  </span>
                )}
                {result.metadata.email && (
                  <span className="text-gray-500 hidden sm:inline">
                    {result.metadata.email}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
