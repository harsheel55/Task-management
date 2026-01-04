import { motion } from 'framer-motion';
import { Check, Circle, Clock, Flag, Tag, User } from 'lucide-react';

interface TaskListItemProps {
  task: {
    id: string;
    title: string;
    project: string;
    assignee: string | null;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'todo' | 'in_progress' | 'done';
    dueDate: string;
    labels: string[];
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick: (task: any) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function TaskListItem({ task, isSelected, onSelect, onClick, onStatusChange }: TaskListItemProps) {
  const priorityColors = {
    low: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    medium: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400',
    high: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400',
    urgent: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400'
  };

  const statusColors = {
    todo: 'text-gray-400',
    in_progress: 'text-blue-500',
    done: 'text-green-500'
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <motion.div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-zinc-900 border rounded-lg hover:shadow-md transition-all cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-zinc-800'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Mobile: Top row with checkbox, status, and title */}
      <div className="flex items-start gap-3 w-full sm:contents">
        {/* Checkbox */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(task.id);
          }}
          className="flex-shrink-0"
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-zinc-600'
          }`}>
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </div>
        </motion.div>

        {/* Status Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            const nextStatus = task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';
            onStatusChange(task.id, nextStatus);
          }}
          className="flex-shrink-0"
        >
          {task.status === 'done' ? (
            <Check className={`w-5 h-5 ${statusColors.done}`} />
          ) : (
            <Circle className={`w-5 h-5 ${statusColors[task.status]}`} />
          )}
        </motion.div>

        {/* Task Content */}
        <div className="flex-1 min-w-0" onClick={() => onClick(task)}>
          <motion.h3
            className={`font-medium text-gray-900 dark:text-white mb-1 text-sm sm:text-base ${task.status === 'done' ? 'line-through text-gray-500 dark:text-zinc-500' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {task.title}
          </motion.h3>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
            <span className="font-medium text-blue-600 dark:text-blue-400">{task.project}</span>
            
            {task.assignee && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-3 h-3" />
                <span className="hidden sm:inline">{task.assignee}</span>
                <span className="sm:hidden">{task.assignee.split(' ')[0]}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side Info - Stacks on mobile */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto sm:ml-auto pl-8 sm:pl-0">
        {/* Priority Badge */}
        <motion.span
          className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Flag className="w-3 h-3 inline mr-1" />
          <span className="hidden sm:inline">{task.priority}</span>
          <span className="sm:hidden">{task.priority[0].toUpperCase()}</span>
        </motion.span>

        {/* Due Date */}
        <motion.div
          className={`flex items-center gap-1 text-xs sm:text-sm ${
            isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{new Date(task.dueDate).toLocaleDateString()}</span>
          <span className="sm:hidden">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </motion.div>

        {/* Labels */}
        {task.labels.length > 0 && (
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm text-gray-600">{task.labels.length}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
