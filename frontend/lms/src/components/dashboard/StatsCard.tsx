import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: 'blue' | 'amber' | 'green' | 'purple';
  delay?: number;
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    value: 'text-blue-900 dark:text-blue-100'
  },
  amber: {
    gradient: 'from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50',
    border: 'border-amber-200 dark:border-amber-800',
    iconBg: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    value: 'text-amber-900 dark:text-amber-100'
  },
  green: {
    gradient: 'from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50',
    border: 'border-green-200 dark:border-green-800',
    iconBg: 'bg-green-500',
    text: 'text-green-600 dark:text-green-400',
    value: 'text-green-900 dark:text-green-100'
  },
  purple: {
    gradient: 'from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50',
    border: 'border-purple-200 dark:border-purple-800',
    iconBg: 'bg-purple-500',
    text: 'text-purple-600 dark:text-purple-400',
    value: 'text-purple-900 dark:text-purple-100'
  }
};

export function StatsCard({ icon: Icon, label, value, color, delay = 0 }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br ${colors.gradient} p-4 rounded-xl border ${colors.border}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 ${colors.iconBg} rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className={`text-xs font-medium ${colors.text}`}>{label}</p>
          <p className={`text-2xl font-bold ${colors.value}`}>{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
