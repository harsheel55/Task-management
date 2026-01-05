import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreVertical, Edit2, Trash2, Palette } from 'lucide-react';
// Project board components
import { TaskCard } from './TaskCard.tsx';
import { AddTaskButton } from './AddTaskButton.tsx';
import { QuickTaskForm } from './QuickTaskForm.tsx';
import type { ColumnData, Task } from './Board.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnProps {
  column: ColumnData;
  onUpdateTitle: (columnId: string, title: string) => void;
  onDelete: (columnId: string) => void;
  onAddTask: (columnId: string, task: Omit<Task, 'id' | 'columnId'>) => void;
  onTaskClick?: (task: Task) => void;
}

export function Column({ column, onUpdateTitle, onDelete, onAddTask, onTaskClick }: ColumnProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleSaveTitle = () => {
    if (title.trim()) {
      onUpdateTitle(column.id, title);
    } else {
      setTitle(column.title);
    }
    setIsEditingTitle(false);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'columnId'>) => {
    onAddTask(column.id, taskData);
    setShowQuickAdd(false);
  };

  return (
    <div className="flex-shrink-0 w-80 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg flex flex-col max-h-full">
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-3 h-3 rounded-full ${column.color}`} />
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle();
                  if (e.key === 'Escape') {
                    setTitle(column.title);
                    setIsEditingTitle(false);
                  }
                }}
                className="flex-1 font-semibold text-gray-900 dark:text-white bg-white dark:bg-zinc-900 border border-blue-500 rounded px-2 py-1 outline-none"
                autoFocus
              />
            ) : (
              <h3
                onClick={() => setIsEditingTitle(true)}
                className="flex-1 font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {column.title}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-zinc-300 bg-gray-200 dark:bg-zinc-800 px-2 py-1 rounded">
              {column.tasks.length}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditingTitle(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Rename Column
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Palette className="w-4 h-4 mr-2" />
                  Change Color
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => onDelete(column.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Column
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        <SortableContext
          items={column.tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map(task => (
            <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
          ))}
        </SortableContext>

        {/* Quick Add Form */}
        {showQuickAdd && (
          <QuickTaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowQuickAdd(false)}
          />
        )}
      </div>

      {/* Add Task Button */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
        <AddTaskButton onClick={() => setShowQuickAdd(true)} />
      </div>
    </div>
  );
}
