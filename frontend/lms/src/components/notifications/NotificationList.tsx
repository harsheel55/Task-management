import { motion, AnimatePresence } from 'framer-motion';
import { NotificationItem, type Notification } from './NotificationItem';
import { Inbox } from 'lucide-react';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const groupNotificationsByDate = (notifications: Notification[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const groups: { [key: string]: Notification[] } = {
    Today: [],
    Yesterday: [],
    'This Week': [],
    Older: [],
  };

  notifications.forEach((notification) => {
    const notifDate = new Date(notification.timestamp);
    const notifDay = new Date(
      notifDate.getFullYear(),
      notifDate.getMonth(),
      notifDate.getDate()
    );

    if (notifDay.getTime() === today.getTime()) {
      groups['Today'].push(notification);
    } else if (notifDay.getTime() === yesterday.getTime()) {
      groups['Yesterday'].push(notification);
    } else if (notifDay.getTime() > weekAgo.getTime()) {
      groups['This Week'].push(notification);
    } else {
      groups['Older'].push(notification);
    }
  });

  return groups;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const NotificationList = ({ notifications, onMarkAsRead, onDelete }: NotificationListProps) => {
  const groupedNotifications = groupNotificationsByDate(notifications);
  const hasNotifications = notifications.length > 0;

  if (!hasNotifications) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 sm:py-24"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Inbox className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mb-4" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
          No notifications
        </h3>
        <p className="text-sm sm:text-base text-gray-500 text-center px-4">
          You're all caught up! Check back later for updates.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {Object.entries(groupedNotifications).map(([groupName, groupNotifications]) => {
        if (groupNotifications.length === 0) return null;

        return (
          <motion.div
            key={groupName}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-3 sm:mb-4"
            >
              <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                {groupName}
              </h3>
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs sm:text-sm text-gray-500">
                {groupNotifications.length}
              </span>
            </motion.div>

            <AnimatePresence mode="popLayout">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2 sm:space-y-3"
              >
                {groupNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onDelete={onDelete}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
