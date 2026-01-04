import { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  Paperclip,
  MoreVertical,
  Edit,
  Archive,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  status: string;
}

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: '🔵' },
  medium: { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: '🟡' },
  high: { color: 'bg-orange-100 text-orange-700 border-orange-300', icon: '🟠' },
  urgent: { color: 'bg-red-100 text-red-700 border-red-300', icon: '🔴' }
};

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-gray-100 text-gray-700' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  done: { label: 'Done', color: 'bg-green-100 text-green-700' }
};

interface ListViewProps {
  searchQuery?: string;
  onTaskClick?: (task: Task) => void;
}

export function ListView({ searchQuery = '', onTaskClick }: ListViewProps) {
  // Mock data - should come from parent or API
  const [tasks] = useState<Task[]>([
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
      columnId: 'todo',
      status: 'todo'
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
      columnId: 'todo',
      status: 'todo'
    },
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
      columnId: 'in-progress',
      status: 'in-progress'
    },
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
      columnId: 'done',
      status: 'done'
    }
  ]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-700">
            <div className="col-span-4">Task</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-1">Due Date</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredTasks.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No tasks found
              </div>
            ) : (
              filteredTasks.map(task => {
                const priorityStyle = priorityConfig[task.priority];
                const statusStyle = statusConfig[task.status as keyof typeof statusConfig];

                return (
                  <div 
                    key={task.id} 
                    onClick={() => onTaskClick?.(task)}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
                  >
                    {/* Task */}
                    <div className="col-span-4">
                      <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
                      {task.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.labels.map((label, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
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
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex items-center">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${statusStyle.color}`}>
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* Priority */}
                    <div className="col-span-2 flex items-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${priorityStyle.color}`}>
                        <span>{priorityStyle.icon}</span>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>

                    {/* Assignee */}
                    <div className="col-span-2 flex items-center">
                      {task.assignee && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                            {task.assignee.avatar}
                          </div>
                          <span className="text-sm text-gray-700">{task.assignee.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Due Date */}
                    <div className="col-span-1 flex items-center">
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded transition-all">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
