import { motion } from 'framer-motion';
import { useState } from 'react';

interface TaskDistributionChartProps {
  type: 'status' | 'priority';
}

export function TaskDistributionChart({ type }: TaskDistributionChartProps) {
  const statusData = [
    { label: 'To Do', value: 15, color: '#6b7280' },
    { label: 'In Progress', value: 18, color: '#3b82f6' },
    { label: 'Done', value: 15, color: '#10b981' }
  ];

  const priorityData = [
    { label: 'Low', value: 8, color: '#6b7280' },
    { label: 'Medium', value: 20, color: '#3b82f6' },
    { label: 'High', value: 15, color: '#f59e0b' },
    { label: 'Urgent', value: 5, color: '#ef4444' }
  ];

  const data = type === 'status' ? statusData : priorityData;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const title = type === 'status' ? 'Tasks by Status' : 'Tasks by Priority';
  const description = type === 'status' 
    ? 'Distribution of tasks across different statuses' 
    : 'Distribution of tasks by priority level';
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate percentages and angles
  const dataWithAngles = data.map((item, index, arr) => {
    const percentage = (item.value / total) * 100;
    const previousAngles = arr.slice(0, index).reduce((sum, prev) => sum + (prev.value / total) * 360, 0);
    return {
      ...item,
      percentage,
      startAngle: previousAngles,
      endAngle: previousAngles + (item.value / total) * 360
    };
  });

  // SVG donut chart helper functions
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
    const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', innerEnd.x, innerEnd.y,
      'A', innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      'Z'
    ].join(' ');
  };

  const centerX = 120;
  const centerY = 120;
  const radius = 80;
  const innerRadius = 50;

  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-200 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="flex-shrink-0">
          <svg width="240" height="240" viewBox="0 0 240 240">
            {dataWithAngles.map((item, index) => (
              <motion.path
                key={index}
                d={describeArc(centerX, centerY, radius, innerRadius, item.startAngle, item.endAngle)}
                fill={item.color}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: hoveredIndex === index ? 0.9 : 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 0.8 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              />
            ))}
            
            {/* Center text */}
            <motion.text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              className="text-2xl font-bold"
              fill="#1f2937"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {total}
            </motion.text>
            <motion.text
              x={centerX}
              y={centerY + 15}
              textAnchor="middle"
              className="text-sm"
              fill="#6b7280"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Total Tasks
            </motion.text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 ml-6">
          {dataWithAngles.map((item, index) => (
            <motion.div 
              key={index} 
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ x: 5, backgroundColor: '#f9fafb', borderRadius: '8px', padding: '8px' }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
