import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
  labels: string[];
  attachments: number;
  comments: number;
  columnId: string;
}

export interface ColumnData {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

interface BoardProps {
  searchQuery?: string;
  onTaskClick?: (task: Task) => void;
}

export function Board({ searchQuery = '', onTaskClick }: BoardProps) {
  const [columns, setColumns] = useState<ColumnData[]>([
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-500',
      tasks: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create mockups for the new landing page design',
          priority: 'high',
          assignee: { name: 'John Doe', avatar: 'JD' },
          dueDate: '2026-01-10',
          labels: ['Design', 'UI/UX'],
          attachments: 3,
          comments: 5,
          columnId: 'todo'
        },
        {
          id: '2',
          title: 'Update documentation',
          description: 'Update API documentation with new endpoints',
          priority: 'medium',
          assignee: { name: 'Alice Smith', avatar: 'AS' },
          dueDate: '2026-01-12',
          labels: ['Documentation'],
          attachments: 0,
          comments: 2,
          columnId: 'todo'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-500',
      tasks: [
        {
          id: '3',
          title: 'Implement authentication',
          description: 'Add JWT authentication to the backend API',
          priority: 'urgent',
          assignee: { name: 'Mike Johnson', avatar: 'MJ' },
          dueDate: '2026-01-08',
          labels: ['Backend', 'Security'],
          attachments: 1,
          comments: 8,
          columnId: 'in-progress'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-500',
      tasks: [
        {
          id: '4',
          title: 'Setup project repository',
          description: 'Initialize Git repo and configure CI/CD pipeline',
          priority: 'high',
          assignee: { name: 'Sarah Lee', avatar: 'SL' },
          dueDate: '2026-01-05',
          labels: ['DevOps'],
          attachments: 2,
          comments: 4,
          columnId: 'done'
        }
      ]
    }
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap(col => col.tasks)
      .find(t => t.id === active.id);
    
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the columns
    const activeColumn = columns.find(col => 
      col.tasks.some(task => task.id === activeId) || col.id === activeId
    );
    const overColumn = columns.find(col => 
      col.tasks.some(task => task.id === overId) || col.id === overId
    );

    if (!activeColumn || !overColumn) return;
    if (activeColumn.id === overColumn.id) return;

    setColumns(cols => {
      const activeItems = activeColumn.tasks;
      const overItems = overColumn.tasks;
      const activeIndex = activeItems.findIndex(t => t.id === activeId);
      const overIndex = overItems.findIndex(t => t.id === overId);

      let newIndex: number;
      if (overId in cols.map(c => c.id)) {
        newIndex = overItems.length;
      } else {
        newIndex = overIndex >= 0 ? overIndex : 0;
      }

      return cols.map(col => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter(t => t.id !== activeId)
          };
        }
        if (col.id === overColumn.id) {
          const newTask = { ...activeItems[activeIndex], columnId: col.id };
          const newTasks = [...col.tasks];
          newTasks.splice(newIndex, 0, newTask);
          return {
            ...col,
            tasks: newTasks
          };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = columns.find(col =>
      col.tasks.some(task => task.id === activeId)
    );

    if (!activeColumn) return;

    const activeIndex = activeColumn.tasks.findIndex(t => t.id === activeId);
    const overIndex = activeColumn.tasks.findIndex(t => t.id === overId);

    if (activeIndex !== overIndex) {
      setColumns(cols =>
        cols.map(col => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              tasks: arrayMove(col.tasks, activeIndex, overIndex)
            };
          }
          return col;
        })
      );
    }
  };

  const handleAddColumn = () => {
    const newColumn: ColumnData = {
      id: `column-${Date.now()}`,
      title: 'New Column',
      color: 'bg-purple-500',
      tasks: []
    };
    setColumns([...columns, newColumn]);
  };

  const handleUpdateColumn = (columnId: string, title: string) => {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId ? { ...col, title } : col
      )
    );
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(cols => cols.filter(col => col.id !== columnId));
  };

  const handleAddTask = (columnId: string, task: Omit<Task, 'id' | 'columnId'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      columnId
    };

    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  };

  // Filter tasks by search query
  const filteredColumns = columns.map(col => ({
    ...col,
    tasks: col.tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }));

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full p-6">
        <div className="flex gap-4 h-full min-w-max">
          {filteredColumns.map(column => (
            <Column
              key={column.id}
              column={column}
              onUpdateTitle={handleUpdateColumn}
              onDelete={handleDeleteColumn}
              onAddTask={handleAddTask}
              onTaskClick={onTaskClick}
            />
          ))}

          {/* Add Column Button */}
          <button
            onClick={handleAddColumn}
            className="flex-shrink-0 w-72 h-fit bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors group"
          >
            <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-900">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Column</span>
            </div>
          </button>
        </div>
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="rotate-3 opacity-80">
            <TaskCard task={activeTask} isDragging />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
