import { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { Task } from './Board';

interface QuickTaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'columnId'>) => void;
  onCancel: () => void;
}

/**
 * Quick task form component for inline task creation
 */
export function QuickTaskForm({ onSubmit, onCancel }: QuickTaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: '',
        priority: 'medium',
        labels: [],
        attachments: 0,
        comments: 0,
      });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-lg border-2 border-blue-500 p-3 shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="w-full mb-3 px-2 py-1 text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded outline-none focus:border-blue-500"
        autoFocus
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Check className="w-4 h-4" />
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-200 text-sm rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}