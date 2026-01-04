import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  onViewAll?: () => void;
}

export function ActivityFeed({ activities, onViewAll }: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
        <button
          onClick={onViewAll}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-3 group"
          >
            <div className={`p-2 ${activity.bg} rounded-lg shrink-0 transition-transform group-hover:scale-110`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-semibold">{activity.user}</span>{' '}
                <span className="text-gray-600 dark:text-zinc-400">{activity.action}</span>{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-zinc-400 text-sm">No recent activity</p>
        </div>
      )}
    </div>
  );
}
