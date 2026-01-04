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
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    iconBg: 'bg-blue-500',
    text: 'text-blue-600',
    value: 'text-blue-900'
  },
  amber: {
    gradient: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    iconBg: 'bg-amber-500',
    text: 'text-amber-600',
    value: 'text-amber-900'
  },
  green: {
    gradient: 'from-green-50 to-green-100',
    border: 'border-green-200',
    iconBg: 'bg-green-500',
    text: 'text-green-600',
    value: 'text-green-900'
  },
  purple: {
    gradient: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    iconBg: 'bg-purple-500',
    text: 'text-purple-600',
    value: 'text-purple-900'
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
