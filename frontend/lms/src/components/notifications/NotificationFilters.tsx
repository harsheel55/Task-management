import { motion } from 'framer-motion';
import {
  CheckCircle2,
  MessageSquare,
  Clock,
  UserPlus,
  AtSign,
  FileText,
  ChevronDown,
  X,
} from 'lucide-react';
import { type Notification } from './NotificationItem';

interface NotificationFiltersProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  notifications: Notification[];
}

const notificationTypes = [
  { value: 'task_assigned', label: 'Task Assigned', icon: CheckCircle2, color: 'text-blue-500' },
  { value: 'comment', label: 'Comments', icon: MessageSquare, color: 'text-green-500' },
  { value: 'due_soon', label: 'Due Soon', icon: Clock, color: 'text-amber-500' },
  { value: 'task_completed', label: 'Task Completed', icon: CheckCircle2, color: 'text-emerald-500' },
  { value: 'mentioned', label: 'Mentions', icon: AtSign, color: 'text-purple-500' },
  { value: 'added_to_project', label: 'Added to Project', icon: UserPlus, color: 'text-indigo-500' },
  { value: 'project_updated', label: 'Project Updates', icon: FileText, color: 'text-cyan-500' },
];

export const NotificationFilters = ({ selectedTypes, onTypeChange, notifications }: NotificationFiltersProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const clearFilters = () => {
    onTypeChange([]);
  };

  // Count notifications by type
  const typeCounts = notificationTypes.map((type) => ({
    ...type,
    count: notifications.filter((n) => n.type === type.value).length,
  }));

  const activeFiltersCount = selectedTypes.length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-semibold text-gray-700">
            Filter by Type
          </span>
          {activeFiltersCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full font-medium"
            >
              {activeFiltersCount}
            </motion.span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                clearFilters();
              }}
              className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Clear</span>
            </motion.button>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.button>

      {/* Filter Options */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="p-3 sm:p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {typeCounts.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedTypes.includes(type.value);

            return (
              <motion.button
                key={type.value}
                onClick={() => toggleType(type.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between p-2 sm:p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-500' : type.color}`} />
                  <span className={`text-xs sm:text-sm ${isSelected ? 'font-semibold text-blue-700' : 'text-gray-700'}`}>
                    {type.label}
                  </span>
                </div>
                <span className={`text-xs ${isSelected ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                  {type.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

// Add React import for useState
import React from 'react';
