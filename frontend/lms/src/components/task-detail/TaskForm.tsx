import { useState } from 'react';
import { Save, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}

interface TaskFormProps {
  task: Task;
  onUpdate: (task: Task) => void;
}

export function TaskForm({ task, onUpdate }: TaskFormProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSaveTitle = () => {
    if (title.trim()) {
      onUpdate({ ...task, title });
      setIsEditingTitle(false);
    }
  };

  const handleSaveDescription = () => {
    onUpdate({ ...task, description });
    setIsEditingDescription(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        {isEditingTitle ? (
          <div className="space-y-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold text-gray-900 border-b-2 border-blue-500 outline-none bg-transparent pb-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveTitle();
                if (e.key === 'Escape') {
                  setTitle(task.title);
                  setIsEditingTitle(false);
                }
              }}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveTitle}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTitle(task.title);
                  setIsEditingTitle(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingTitle(true)}
            className="group cursor-pointer"
          >
            <h1 className="text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
              {task.title}
            </h1>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Description</h2>
          {!isEditingDescription && (
            <button
              onClick={() => setIsEditingDescription(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        {isEditingDescription ? (
          <div className="space-y-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-700"
              placeholder="Add a description..."
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveDescription}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setDescription(task.description);
                  setIsEditingDescription(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingDescription(true)}
            className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
          >
            {description ? (
              <p className="text-gray-600 leading-relaxed">{description}</p>
            ) : (
              <p className="text-gray-400 italic">Click to add a description...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
