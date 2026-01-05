import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Calendar, 
  MessageSquare, 
  Paperclip,
  GripVertical
} from 'lucide-react';
import type { Task } from './Board';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onTaskClick?: (task: Task) => void;
}

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600', icon: '🔵' },
  medium: { color: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-700', icon: '🟡' },
  high: { color: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-700', icon: '🟠' },
  urgent: { color: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-950/40 dark:text-red-300 dark:border-red-700', icon: '🔴' }
};

export function TaskCard({ task, isDragging = false, onTaskClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const priorityStyle = priorityConfig[task.priority];

  const handleClick = (e: React.MouseEvent) => {
    // Don't open modal when clicking drag handle
    if ((e.target as HTMLElement).closest('[data-drag-handle]')) {
      return;
    }
    onTaskClick?.(task);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-3 hover:shadow-md transition-shadow cursor-pointer group ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      {/* Drag Handle & Title */}
      <div className="flex items-start gap-2 mb-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity mt-1"
        >
          <GripVertical className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{task.title}</h4>
          <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2">{task.description}</p>
        </div>
      </div>

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.map((label, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 text-xs rounded-full font-medium"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Priority Badge */}
      <div className="mb-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${priorityStyle.color}`}>
          <span>{priorityStyle.icon}</span>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-zinc-400">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              <span>{task.attachments}</span>
            </div>
          )}
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments}</span>
            </div>
          )}
        </div>

        {/* Assignee Avatar */}
        {task.assignee && (
          <div
            className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white"
            title={task.assignee.name}
          >
            {task.assignee.avatar}
          </div>
        )}
      </div>
    </div>
  );
}
