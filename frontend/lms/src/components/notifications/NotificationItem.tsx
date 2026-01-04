import { motion } from 'framer-motion';
import {
  CheckCircle2,
  MessageSquare,
  Clock,
  UserPlus,
  AtSign,
  FileText,
  Trash2,
  Circle,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Notification {
  id: string;
  type: 'task_assigned' | 'comment' | 'due_soon' | 'task_completed' | 'mentioned' | 'added_to_project' | 'project_updated';
  message: string;
  relatedLink?: string;
  relatedText?: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const notificationConfig = {
  task_assigned: {
    icon: CheckCircle2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  comment: {
    icon: MessageSquare,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  due_soon: {
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  task_completed: {
    icon: CheckCircle,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  mentioned: {
    icon: AtSign,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  added_to_project: {
    icon: UserPlus,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  project_updated: {
    icon: FileText,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
};

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  const config = notificationConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.01 }}
      className={`p-3 sm:p-4 border rounded-lg transition-colors ${
        notification.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${config.bgColor} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className={`text-sm sm:text-base ${notification.isRead ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
              {notification.message}
            </p>
            {!notification.isRead && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1.5"
              />
            )}
          </div>

          {/* Related Link */}
          {notification.relatedLink && notification.relatedText && (
            <Link
              to={notification.relatedLink}
              className="inline-block text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline mb-1"
            >
              {notification.relatedText}
            </Link>
          )}

          {/* Timestamp and Actions */}
          <div className="flex items-center gap-2 sm:gap-4 mt-2 flex-wrap">
            <span className="text-xs sm:text-sm text-gray-500">
              {formatTimestamp(notification.timestamp)}
            </span>

            <div className="flex items-center gap-2">
              {/* Mark as Read/Unread */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMarkAsRead(notification.id)}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                {notification.isRead ? (
                  <>
                    <Circle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Mark unread</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Mark read</span>
                  </>
                )}
              </motion.button>

              {/* Delete */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(notification.id)}
                className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Delete</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
