import { 
  CheckCircle, 
  Edit, 
  UserPlus, 
  Calendar,
  Flag,
  Tag,
  Archive
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'assigned' | 'status_changed' | 'priority_changed' | 'label_added' | 'due_date_set' | 'comment_added' | 'attachment_added';
  user: string;
  userAvatar: string;
  description: string;
  timestamp: string;
  details?: string;
}

interface ActivityTimelineProps {
  taskId: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'created',
    user: 'John Doe',
    userAvatar: 'JD',
    description: 'created this task',
    timestamp: '3 days ago'
  },
  {
    id: '2',
    type: 'assigned',
    user: 'Alice Smith',
    userAvatar: 'AS',
    description: 'assigned this to',
    details: 'John Doe',
    timestamp: '3 days ago'
  },
  {
    id: '3',
    type: 'priority_changed',
    user: 'Mike Johnson',
    userAvatar: 'MJ',
    description: 'changed priority from',
    details: 'Medium → High',
    timestamp: '2 days ago'
  },
  {
    id: '4',
    type: 'label_added',
    user: 'John Doe',
    userAvatar: 'JD',
    description: 'added labels',
    details: 'Design, UI/UX',
    timestamp: '2 days ago'
  },
  {
    id: '5',
    type: 'due_date_set',
    user: 'Sarah Lee',
    userAvatar: 'SL',
    description: 'set due date to',
    details: 'Jan 10, 2026',
    timestamp: '1 day ago'
  },
  {
    id: '6',
    type: 'comment_added',
    user: 'Alice Smith',
    userAvatar: 'AS',
    description: 'added a comment',
    timestamp: '1 day ago'
  },
  {
    id: '7',
    type: 'attachment_added',
    user: 'John Doe',
    userAvatar: 'JD',
    description: 'uploaded',
    details: 'design-mockup.fig',
    timestamp: '2 hours ago'
  },
  {
    id: '8',
    type: 'updated',
    user: 'Mike Johnson',
    userAvatar: 'MJ',
    description: 'updated the description',
    timestamp: '1 hour ago'
  }
];

export function ActivityTimeline({ taskId: _taskId }: ActivityTimelineProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return <CheckCircle className="w-4 h-4" />;
      case 'updated':
        return <Edit className="w-4 h-4" />;
      case 'assigned':
        return <UserPlus className="w-4 h-4" />;
      case 'status_changed':
        return <CheckCircle className="w-4 h-4" />;
      case 'priority_changed':
        return <Flag className="w-4 h-4" />;
      case 'label_added':
        return <Tag className="w-4 h-4" />;
      case 'due_date_set':
        return <Calendar className="w-4 h-4" />;
      case 'comment_added':
        return <Edit className="w-4 h-4" />;
      case 'attachment_added':
        return <Archive className="w-4 h-4" />;
      default:
        return <Edit className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'created':
        return 'bg-green-100 text-green-600';
      case 'updated':
        return 'bg-blue-100 text-blue-600';
      case 'assigned':
        return 'bg-purple-100 text-purple-600';
      case 'status_changed':
        return 'bg-emerald-100 text-emerald-600';
      case 'priority_changed':
        return 'bg-orange-100 text-orange-600';
      case 'label_added':
        return 'bg-pink-100 text-pink-600';
      case 'due_date_set':
        return 'bg-indigo-100 text-indigo-600';
      case 'comment_added':
        return 'bg-cyan-100 text-cyan-600';
      case 'attachment_added':
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Activity Timeline</h2>
      
      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              {index < mockActivities.length - 1 && (
                <div className="w-0.5 flex-1 bg-gray-200 my-1" />
              )}
            </div>

            {/* Activity Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {activity.userAvatar}
                </div>
                <span className="font-semibold text-gray-900 text-sm">{activity.user}</span>
                <span className="text-sm text-gray-600">{activity.description}</span>
                {activity.details && (
                  <span className="text-sm font-medium text-gray-900">{activity.details}</span>
                )}
              </div>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
