import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterPanelProps {
  onClose: () => void;
}

export function FilterPanel({ onClose }: FilterPanelProps) {
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const labels = ['Design', 'UI/UX', 'Backend', 'Frontend', 'Documentation', 'Security', 'DevOps'];
  const assignees = ['John Doe', 'Alice Smith', 'Mike Johnson', 'Sarah Lee'];

  return (
    <div className="w-80 bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Priority Filter */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Priority</h4>
          <div className="space-y-2">
            {priorities.map(priority => (
              <label key={priority} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-zinc-300">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Assignee Filter */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Assignee</h4>
          <div className="space-y-2">
            {assignees.map(assignee => (
              <label key={assignee} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-zinc-300">{assignee}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Labels Filter */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Labels</h4>
          <div className="space-y-2">
            {labels.map(label => (
              <label key={label} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-zinc-300">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Due Date Filter */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Due Date</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded transition-colors">
              <input
                type="radio"
                name="dueDate"
                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-zinc-300">No due date</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded transition-colors">
              <input
                type="radio"
                name="dueDate"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-zinc-300">Overdue</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded transition-colors">
              <input
                type="radio"
                name="dueDate"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-zinc-300">Due this week</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded transition-colors">
              <input
                type="radio"
                name="dueDate"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-zinc-300">Due this month</span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-2">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  );
}
