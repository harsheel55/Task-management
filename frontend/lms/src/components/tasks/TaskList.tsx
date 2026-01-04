import { motion, AnimatePresence } from 'framer-motion';
import { TaskListItem } from './TaskListItem';

interface Task {
  id: string;
  title: string;
  project: string;
  assignee: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'done';
  dueDate: string;
  labels: string[];
}

interface TaskListProps {
  tasks: Task[];
  selectedTasks: string[];
  onSelectTask: (id: string) => void;
  onTaskClick: (task: Task) => void;
  onStatusChange: (id: string, status: string) => void;
  groupBy?: 'none' | 'project' | 'assignee' | 'due_date';
}

export function TaskList({ 
  tasks, 
  selectedTasks, 
  onSelectTask, 
  onTaskClick, 
  onStatusChange,
  groupBy = 'none'
}: TaskListProps) {
  const groupTasks = () => {
    if (groupBy === 'none') {
      return { 'All Tasks': tasks };
    }

    const grouped: { [key: string]: Task[] } = {};

    tasks.forEach(task => {
      let key = '';
      
      switch (groupBy) {
        case 'project':
          key = task.project;
          break;
        case 'assignee':
          key = task.assignee || 'Unassigned';
          break;
        case 'due_date':
          const dueDate = new Date(task.dueDate);
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          if (dueDate < today) {
            key = 'Overdue';
          } else if (dueDate.toDateString() === today.toDateString()) {
            key = 'Today';
          } else if (dueDate.toDateString() === tomorrow.toDateString()) {
            key = 'Tomorrow';
          } else if (dueDate < new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
            key = 'This Week';
          } else {
            key = 'Later';
          }
          break;
        default:
          key = 'All Tasks';
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(task);
    });

    return grouped;
  };

  const groupedTasks = groupTasks();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {Object.entries(groupedTasks).map(([groupName, groupTasks], groupIndex) => (
          <motion.div
            key={groupName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
          >
            {groupBy !== 'none' && (
              <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: groupIndex * 0.1 + 0.1 }}
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{groupName}</h2>
                <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-xs font-medium rounded-full">
                  {groupTasks.length}
                </span>
              </motion.div>
            )}

            <motion.div
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {groupTasks.map((task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  isSelected={selectedTasks.includes(task.id)}
                  onSelect={onSelectTask}
                  onClick={onTaskClick}
                  onStatusChange={onStatusChange}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {tasks.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 dark:text-zinc-400 text-lg">No tasks found</p>
          <p className="text-gray-400 dark:text-zinc-500 text-sm mt-2">Try adjusting your filters</p>
        </motion.div>
      )}
    </div>
  );
}
