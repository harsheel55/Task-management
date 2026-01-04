import { Calendar, User, Flag, Tag, Clock, UserCheck, Mail, Shield, UserMinus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    name: string;
    avatar: string;
    email?: string;
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

interface TaskPropertiesProps {
  task: Task;
  onUpdate: (task: Task) => void;
}

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-gray-700', bg: 'bg-gray-100' },
  { value: 'medium', label: 'Medium', color: 'text-blue-700', bg: 'bg-blue-100' },
  { value: 'high', label: 'High', color: 'text-orange-700', bg: 'bg-orange-100' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-700', bg: 'bg-red-100' },
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const assigneeOptions = [
  { name: 'John Doe', avatar: 'JD', email: 'john@example.com' },
  { name: 'Alice Smith', avatar: 'AS', email: 'alice@example.com' },
  { name: 'Mike Johnson', avatar: 'MJ', email: 'mike@example.com' },
  { name: 'Sarah Lee', avatar: 'SL', email: 'sarah@example.com' },
];

const labelOptions = ['Design', 'UI/UX', 'Backend', 'Frontend', 'Documentation', 'Security', 'DevOps', 'Bug', 'Feature'];

export function TaskProperties({ task, onUpdate }: TaskPropertiesProps) {
  const currentPriority = priorityOptions.find(p => p.value === task.priority) || priorityOptions[1];
  const currentStatus = statusOptions.find(s => s.value === task.columnId) || statusOptions[0];

  const handlePriorityChange = (priority: 'low' | 'medium' | 'high' | 'urgent') => {
    onUpdate({ ...task, priority });
  };

  const handleStatusChange = (columnId: string) => {
    onUpdate({ ...task, columnId });
  };

  const handleAssigneeChange = (assignee: { name: string; avatar: string; email?: string }) => {
    onUpdate({ ...task, assignee });
  };

  const handleRemoveAssignee = () => {
    onUpdate({ ...task, assignee: undefined });
  };

  const handleSendMessage = () => {
    if (task.assignee?.email) {
      window.location.href = `mailto:${task.assignee.email}`;
    }
  };

  const handleChangeRole = () => {
    // TODO: Implement role change functionality
    console.log('Change role for:', task.assignee?.name);
    alert('Change Role functionality - coming soon!');
  };

  const handleRemoveFromProject = () => {
    if (confirm(`Remove ${task.assignee?.name} from this project?`)) {
      // TODO: Implement remove from project functionality
      console.log('Remove from project:', task.assignee?.name);
      alert('Remove from Project functionality - coming soon!');
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...task, dueDate: e.target.value });
  };

  const toggleLabel = (label: string) => {
    const newLabels = task.labels.includes(label)
      ? task.labels.filter(l => l !== label)
      : [...task.labels, label];
    onUpdate({ ...task, labels: newLabels });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Properties</h3>

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Flag className="w-4 h-4" />
          Status
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full px-4 py-2.5 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-900">
              {currentStatus.label}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {statusOptions.map(status => (
              <DropdownMenuItem
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
              >
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Flag className="w-4 h-4" />
          Priority
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={`w-full px-4 py-2.5 text-left border-0 rounded-lg transition-colors ${currentPriority.bg} ${currentPriority.color} font-medium`}>
              {currentPriority.label}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {priorityOptions.map(priority => (
              <DropdownMenuItem
                key={priority.value}
                onClick={() => handlePriorityChange(priority.value as any)}
                className={`${priority.bg} ${priority.color}`}
              >
                {priority.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Assignee */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <User className="w-4 h-4" />
          Assignee
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full px-4 py-2.5 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              {task.assignee ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">
                    {task.assignee.avatar}
                  </div>
                  <span className="font-medium text-gray-900">{task.assignee.name}</span>
                </>
              ) : (
                <span className="text-gray-500">Unassigned</span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72" align="start">
            {task.assignee ? (
              <>
                {/* Current Assignee Info */}
                <div className="px-3 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold text-white">
                      {task.assignee.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{task.assignee.name}</p>
                      <p className="text-sm text-gray-500">{task.assignee.email || 'mike@example.com'}</p>
                    </div>
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                
                {/* Actions for current assignee */}
                <DropdownMenuItem onClick={handleSendMessage} className="cursor-pointer">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleChangeRole} className="cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Role
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleRemoveFromProject} 
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  Remove from Project
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                {/* Change Assignee */}
                <div className="px-2 py-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase px-2 py-1">Change Assignee</p>
                </div>
                {assigneeOptions.map(assignee => (
                  <DropdownMenuItem
                    key={assignee.avatar}
                    onClick={() => handleAssigneeChange(assignee)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {assignee.avatar}
                    </div>
                    {assignee.name}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={handleRemoveAssignee}
                  className="cursor-pointer text-gray-600"
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  Unassign
                </DropdownMenuItem>
              </>
            ) : (
              <>
                {/* Select Assignee */}
                {assigneeOptions.map(assignee => (
                  <DropdownMenuItem
                    key={assignee.avatar}
                    onClick={() => handleAssigneeChange(assignee)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {assignee.avatar}
                    </div>
                    {assignee.name}
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Due Date */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Due Date
        </label>
        <input
          type="date"
          value={task.dueDate || ''}
          onChange={handleDueDateChange}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-medium text-gray-900"
        />
      </div>

      {/* Labels */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Labels
        </label>
        <div className="flex flex-wrap gap-2">
          {labelOptions.map(label => {
            const isBackend = label === 'Backend';
            const isSelected = task.labels.includes(label);
            return (
              <button
                key={label}
                onClick={() => toggleLabel(label)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isSelected && isBackend
                    ? 'bg-purple-600 text-white'
                    : isSelected
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metadata */}
      <div className="pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <UserCheck className="w-4 h-4" />
          <span className="font-medium">Created by:</span>
          <span>{task.createdBy || 'John Doe'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Created:</span>
          <span>{task.createdDate || 'Jan 3, 2026'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Updated:</span>
          <span>{task.lastUpdated || 'Jan 4, 2026'}</span>
        </div>
      </div>
    </div>
  );
}
