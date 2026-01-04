import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const priorityConfig = {
  low: { color: 'bg-gray-500', textColor: 'text-gray-700' },
  medium: { color: 'bg-blue-500', textColor: 'text-blue-700' },
  high: { color: 'bg-orange-500', textColor: 'text-orange-700' },
  urgent: { color: 'bg-red-500', textColor: 'text-red-700' }
};

interface CalendarViewProps {
  searchQuery?: string;
  onTaskClick?: (task: Task) => void;
}

export function CalendarView({ searchQuery = '', onTaskClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026

  // Mock tasks - should come from parent or API
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create mockups',
      priority: 'high',
      assignee: { name: 'John Doe', avatar: 'JD' },
      dueDate: '2026-01-10',
      labels: ['Design'],
      attachments: 3,
      comments: 5,
      columnId: 'todo'
    },
    {
      id: '2',
      title: 'Update documentation',
      description: 'Update API docs',
      priority: 'medium',
      assignee: { name: 'Alice Smith', avatar: 'AS' },
      dueDate: '2026-01-12',
      labels: ['Documentation'],
      attachments: 0,
      comments: 2,
      columnId: 'todo'
    },
    {
      id: '3',
      title: 'Implement authentication',
      description: 'Add JWT auth',
      priority: 'urgent',
      assignee: { name: 'Mike Johnson', avatar: 'MJ' },
      dueDate: '2026-01-08',
      labels: ['Backend'],
      attachments: 1,
      comments: 8,
      columnId: 'in-progress'
    },
    {
      id: '4',
      title: 'Setup repository',
      description: 'Init Git repo',
      priority: 'high',
      assignee: { name: 'Sarah Lee', avatar: 'SL' },
      dueDate: '2026-01-05',
      labels: ['DevOps'],
      attachments: 2,
      comments: 4,
      columnId: 'done'
    },
    {
      id: '5',
      title: 'Code review',
      description: 'Review PRs',
      priority: 'medium',
      assignee: { name: 'John Doe', avatar: 'JD' },
      dueDate: '2026-01-15',
      labels: ['Review'],
      attachments: 0,
      comments: 3,
      columnId: 'todo'
    }
  ];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getTasksForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredTasks.filter(task => task.dueDate === dateStr);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-32 bg-gray-50/50" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayTasks = getTasksForDate(day);
    const isToday = day === 4 && currentDate.getMonth() === 0; // Mock today as Jan 4

    days.push(
      <div
        key={day}
        className={`min-h-32 border border-gray-200 p-2 bg-white hover:bg-gray-50 transition-colors ${
          isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''
        }`}
      >
        <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
          {day}
          {isToday && <span className="ml-1 text-xs">(Today)</span>}
        </div>
        <div className="space-y-1">
          {dayTasks.slice(0, 3).map(task => {
            const priorityStyle = priorityConfig[task.priority];
            return (
              <div
                key={task.id}
                onClick={() => onTaskClick?.(task)}
                className="text-xs p-1.5 rounded bg-gray-50 border-l-2 hover:bg-gray-100 cursor-pointer transition-colors"
                style={{ borderLeftColor: priorityStyle.color.replace('bg-', '#') }}
                title={task.description}
              >
                <div className="font-medium text-gray-900 truncate">{task.title}</div>
                {task.assignee && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[8px] font-bold text-white">
                      {task.assignee.avatar}
                    </div>
                    <span className="text-gray-500 text-[10px] truncate">{task.assignee.name}</span>
                  </div>
                )}
              </div>
            );
          })}
          {dayTasks.length > 3 && (
            <div className="text-xs text-gray-500 pl-1.5">
              +{dayTasks.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Calendar Header */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{monthName}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Priority Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-700">Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-700">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span className="text-sm text-gray-700">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
