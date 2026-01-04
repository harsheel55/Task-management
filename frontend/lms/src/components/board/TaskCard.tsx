// components/board/TaskCard.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task, Priority, Label } from '@/types/task.types';
import { Calendar, User, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors: Record<Priority, string> = {
    Low: 'bg-gray-100 text-gray-700',
    Medium: 'bg-blue-100 text-blue-700',
    High: 'bg-orange-100 text-orange-700',
    Urgent: 'bg-red-100 text-red-700',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 flex-1">{task.title}</h4>
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          {task.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{task.assignedTo.firstName}</span>
            </div>
          )}
        </div>
        
        {task.comments && task.comments.length > 0 && (
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {task.comments.length}
          </span>
        )}
      </div>

      {task.labels && task.labels.length > 0 && (
        <div className="flex gap-1 mt-2 flex-wrap">
          {task.labels.map((label: Label) => (
            <span
              key={label.id}
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: label.color + '20', color: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
