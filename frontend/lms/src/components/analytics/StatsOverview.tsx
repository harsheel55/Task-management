import { CheckCircle, Clock, AlertCircle, ListTodo, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsOverviewProps {
  dateRange: '7days' | '30days' | '3months' | 'all';
}

export function StatsOverview({ dateRange: _dateRange }: StatsOverviewProps) {
  // Mock data - would be filtered by _dateRange in real app
  const cards = [
    {
      icon: ListTodo,
      value: '48',
      label: 'Total Tasks',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      icon: CheckCircle,
      value: '32',
      label: 'Completed',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      icon: Clock,
      value: '12',
      label: 'In Progress',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200'
    },
    {
      icon: AlertCircle,
      value: '4',
      label: 'Overdue',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200'
    },
    {
      icon: TrendingUp,
      value: '66.7%',
      label: 'Completion Rate',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-white dark:bg-zinc-900 rounded-lg border ${card.borderColor} dark:border-zinc-800 p-6 shadow-sm cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                className={`p-3 rounded-lg ${card.bgColor} dark:bg-opacity-20`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </motion.div>
            </div>
            <motion.h3 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              {card.value}
            </motion.h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
