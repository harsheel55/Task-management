import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  CheckCheck,
  Trash2,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { type Notification } from '@/components/notifications/NotificationItem';
import { NotificationList } from '@/components/notifications/NotificationList';
import { NotificationFilters } from '@/components/notifications/NotificationFilters';
import { Link } from 'react-router-dom';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_assigned',
    message: 'You have been assigned to "Implement user authentication"',
    relatedLink: '/project/1/board',
    relatedText: 'View in Website Redesign',
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    message: 'Sarah Johnson commented on "Design homepage mockup"',
    relatedLink: '/project/1/board',
    relatedText: 'View task',
    timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
    isRead: false,
  },
  {
    id: '3',
    type: 'due_soon',
    message: 'Task "Review design proposals" is due in 2 hours',
    relatedLink: '/project/2/board',
    relatedText: 'View in Mobile App Development',
    timestamp: new Date(Date.now() - 4 * 3600000), // 4 hours ago
    isRead: true,
  },
  {
    id: '4',
    type: 'mentioned',
    message: 'Michael Chen mentioned you in "API Integration Planning"',
    relatedLink: '/project/1/board',
    relatedText: 'View comment',
    timestamp: new Date(Date.now() - 6 * 3600000), // 6 hours ago
    isRead: false,
  },
  {
    id: '5',
    type: 'task_completed',
    message: 'Emily Davis completed "Create wireframes for dashboard"',
    relatedLink: '/project/1/board',
    relatedText: 'View task',
    timestamp: new Date(Date.now() - 24 * 3600000), // Yesterday
    isRead: true,
  },
  {
    id: '6',
    type: 'added_to_project',
    message: 'You were added to "Marketing Campaign Q1"',
    relatedLink: '/project/3/board',
    relatedText: 'View project',
    timestamp: new Date(Date.now() - 24 * 3600000), // Yesterday
    isRead: true,
  },
  {
    id: '7',
    type: 'project_updated',
    message: 'Website Redesign project deadline has been extended to March 15',
    relatedLink: '/project/1/board',
    relatedText: 'View project',
    timestamp: new Date(Date.now() - 3 * 24 * 3600000), // 3 days ago
    isRead: true,
  },
  {
    id: '8',
    type: 'comment',
    message: 'Alex Turner replied to your comment on "Database optimization"',
    relatedLink: '/project/2/board',
    relatedText: 'View conversation',
    timestamp: new Date(Date.now() - 5 * 24 * 3600000), // 5 days ago
    isRead: true,
  },
  {
    id: '9',
    type: 'task_assigned',
    message: 'You have been assigned to "Write documentation for API endpoints"',
    relatedLink: '/project/2/board',
    relatedText: 'View in Mobile App Development',
    timestamp: new Date(Date.now() - 10 * 24 * 3600000), // 10 days ago
    isRead: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredNotifications = useMemo(() => {
    if (selectedTypes.length === 0) {
      return notifications;
    }
    return notifications.filter((n) => selectedTypes.includes(n.type));
  }, [notifications, selectedTypes]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-10 bg-white border-b border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 md:p-6">
              {/* Breadcrumb and Title */}
              <div className="flex items-center gap-2 min-w-0">
                <SidebarTrigger className="flex-shrink-0" />
                <div className="flex items-center gap-2 min-w-0">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                    Notifications
                  </h1>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-100 text-blue-600 text-xs sm:text-sm rounded-full font-semibold flex-shrink-0"
                    >
                      {unreadCount} new
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark all as read</span>
                  <span className="sm:hidden">All read</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearAll}
                  disabled={notifications.length === 0}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear all</span>
                  <span className="sm:hidden">Clear</span>
                </motion.button>

                <Link to="/settings/notifications">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-xs sm:text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden lg:inline">Settings</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto"
          >
            {/* Stats */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {notifications.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Total</div>
                </div>
                <div className="p-3 sm:p-4 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {unreadCount}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-700">Unread</div>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    {notifications.filter((n) => n.isRead).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Read</div>
                </div>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <NotificationFilters
                selectedTypes={selectedTypes}
                onTypeChange={setSelectedTypes}
                notifications={notifications}
              />
            </motion.div>

            {/* Notification List */}
            <motion.div variants={itemVariants}>
              <NotificationList
                notifications={filteredNotifications}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            </motion.div>

            {/* Settings Footer */}
            {notifications.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200"
              >
                <Link to="/settings/notifications">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 sm:p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm sm:text-base font-semibold text-gray-900">
                          Notification Preferences
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Manage how and when you receive notifications
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
