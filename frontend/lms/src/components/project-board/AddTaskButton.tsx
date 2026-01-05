import { Plus } from 'lucide-react';

interface AddTaskButtonProps {
  onClick: () => void;
}

export function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors group"
    >
      <Plus className="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
      <span className="group-hover:text-gray-900 dark:group-hover:text-white font-medium">Add Task</span>
    </button>
  );
}
