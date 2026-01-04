import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface DateRangePickerProps {
  value: '7days' | '30days' | '3months' | 'all';
  onChange: (value: '7days' | '30days' | '3months' | 'all') => void;
}

const ranges = [
  { value: '7days' as const, label: 'Last 7 Days' },
  { value: '30days' as const, label: 'Last 30 Days' },
  { value: '3months' as const, label: 'Last 3 Months' },
  { value: 'all' as const, label: 'All Time' }
];

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="w-4 h-4" />
        <span className="font-medium">Date Range:</span>
      </div>
      
      <div className="flex gap-2">
        {ranges.map((range, index) => (
          <motion.button
            key={range.value}
            onClick={() => onChange(range.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium relative overflow-hidden ${
              value === range.value
                ? 'text-white'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {value === range.value && (
              <motion.div
                className="absolute inset-0 bg-blue-600"
                layoutId="activeRange"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{range.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
