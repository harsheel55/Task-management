import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TaskFiltersProps {
  filters: {
    project: string;
    assignee: string;
    priority: string;
    status: string;
    dueDate: string;
    labels: string[];
  };
  onFilterChange: (filters: any) => void;
}

export function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const projects = ['All Projects', 'Advanced React Patterns', 'E-commerce Platform', 'Mobile App'];
  const assignees = ['All', 'Me', 'John Doe', 'Alice Smith', 'Unassigned'];
  const priorities = ['All', 'Low', 'Medium', 'High', 'Urgent'];
  const statuses = ['All', 'To Do', 'In Progress', 'Done'];
  const dueDateOptions = ['All', 'Overdue', 'Today', 'This Week', 'Custom Range'];

  const activeFiltersCount = Object.values(filters).filter(v => 
    Array.isArray(v) ? v.length > 0 : v && v !== 'All' && v !== 'All Projects'
  ).length;

  const clearFilters = () => {
    onFilterChange({
      project: 'All Projects',
      assignee: 'All',
      priority: 'All',
      status: 'All',
      dueDate: 'All',
      labels: []
    });
  };

  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: '#f9fafb' }}
      >
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {activeFiltersCount > 0 && (
            <motion.span
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              {activeFiltersCount}
            </motion.span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilters();
                }}
                className="text-sm"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </motion.div>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Options */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Project Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
            <select
              value={filters.project}
              onChange={(e) => onFilterChange({ ...filters, project: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </motion.div>

          {/* Assignee Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
            <select
              value={filters.assignee}
              onChange={(e) => onFilterChange({ ...filters, assignee: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {assignees.map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
          </motion.div>

          {/* Priority Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </motion.div>

          {/* Status Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </motion.div>

          {/* Due Date Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <select
              value={filters.dueDate}
              onChange={(e) => onFilterChange({ ...filters, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dueDateOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
