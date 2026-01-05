import { useState } from 'react';
import { X, Trash2, ExternalLink } from 'lucide-react';
import { TaskForm } from './TaskForm.tsx';
import { TaskProperties } from './TaskProperties.tsx';
import { AttachmentList } from './AttachmentList.tsx';
import { CommentSection } from './CommentSection.tsx';
import { ActivityTimeline } from './ActivityTimeline.tsx';

interface Task {
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
  createdBy?: string;
  createdDate?: string;
  lastUpdated?: string;
}

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskDetailModal({ task, isOpen, onClose, onUpdate, onDelete }: TaskDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'activity'>('details');

  if (!isOpen || !task) return null;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-zinc-950 rounded-xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between bg-gray-50 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-zinc-400 font-mono">#{task.id}</span>
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors">
              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'details'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'activity'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {activeTab === 'details' ? (
            <>
              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <TaskForm task={task} onUpdate={onUpdate} />
                <AttachmentList taskId={task.id} />
                <CommentSection taskId={task.id} />
              </div>

              {/* Properties Sidebar */}
              <div className="w-80 border-l border-gray-200 dark:border-zinc-800 overflow-y-auto p-6 bg-gray-50 dark:bg-zinc-900">
                <TaskProperties task={task} onUpdate={onUpdate} />
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-6">
              <ActivityTimeline taskId={task.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
