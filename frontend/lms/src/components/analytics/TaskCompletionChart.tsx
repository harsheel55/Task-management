import { motion } from 'framer-motion';

interface TaskCompletionChartProps {
  dateRange: '7days' | '30days' | '3months' | 'all';
}

export function TaskCompletionChart({ dateRange }: TaskCompletionChartProps) {
  // Mock data based on date range
  const getData = () => {
    switch (dateRange) {
      case '7days':
        return [
          { date: 'Mon', completed: 5 },
          { date: 'Tue', completed: 8 },
          { date: 'Wed', completed: 6 },
          { date: 'Thu', completed: 10 },
          { date: 'Fri', completed: 12 },
          { date: 'Sat', completed: 4 },
          { date: 'Sun', completed: 7 }
        ];
      case '30days':
        return [
          { date: 'Week 1', completed: 20 },
          { date: 'Week 2', completed: 35 },
          { date: 'Week 3', completed: 28 },
          { date: 'Week 4', completed: 42 }
        ];
      case '3months':
        return [
          { date: 'Month 1', completed: 85 },
          { date: 'Month 2', completed: 120 },
          { date: 'Month 3', completed: 95 }
        ];
      case 'all':
        return [
          { date: 'Q1', completed: 120 },
          { date: 'Q2', completed: 150 },
          { date: 'Q3', completed: 180 },
          { date: 'Q4', completed: 200 }
        ];
      default:
        return [];
    }
  };

  const data = getData();
  const maxValue = Math.max(...data.map(d => d.completed)) * 1.2;

  return (
    <motion.div 
      className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Task Completion Trend</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Number of tasks completed over time</p>
      </div>

      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500 dark:text-zinc-400">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-right pr-2">
              {Math.round(maxValue - (maxValue / 4) * i)}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="ml-12 mr-4">
          <svg width="100%" height="300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

          {/* Line chart */}
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* Create path */}
            <motion.path
              d={data.map((point, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - (point.completed / maxValue) * 100;
                return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Area under line */}
            <motion.path
              d={`
                ${data.map((point, i) => {
                  const x = (i / (data.length - 1)) * 100;
                  const y = 100 - (point.completed / maxValue) * 100;
                  return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                }).join(' ')}
                L 100% 100% L 0% 100% Z
              `}
              fill="url(#gradient)"
              opacity="0.2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Data points */}
            {data.map((point, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 100 - (point.completed / maxValue) * 100;
              return (
                <g key={i}>
                  <motion.circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="5"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.2 }}
                    whileHover={{ scale: 1.5 }}
                  />
                </g>
              );
            })}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-zinc-400">
            {data.map((point, i) => (
              <div key={i}>{point.date}</div>
            ))}
          </div>
        </svg>
        </div>
      </div>
    </motion.div>
  );
}
