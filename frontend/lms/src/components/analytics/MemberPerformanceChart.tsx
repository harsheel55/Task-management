import { motion } from 'framer-motion';

export function MemberPerformanceChart() {
  const data = [
    { name: 'John Doe', completed: 15, active: 3 },
    { name: 'Alice Smith', completed: 12, active: 5 },
    { name: 'Mike Johnson', completed: 8, active: 4 },
    { name: 'Sarah Lee', completed: 5, active: 3 },
    { name: 'Tom Wilson', completed: 2, active: 1 }
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-200 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Member Performance</h2>
        <p className="text-sm text-gray-500 mt-1">Tasks assigned to each team member</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-sm text-gray-600">Completed</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="w-4 h-4 bg-blue-500 rounded" />
          <span className="text-sm text-gray-600">Active</span>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="space-y-6">
        {data.map((member, index) => {
          const total = member.completed + member.active;
          const completedPercentage = (member.completed / total) * 100;
          const activePercentage = (member.active / total) * 100;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  <span className="font-medium text-gray-900">{member.name}</span>
                </div>
                <span className="text-sm text-gray-500">{total} tasks</span>
              </div>
              
              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                {/* Completed bar */}
                <motion.div
                  className="absolute left-0 top-0 h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${completedPercentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.8, ease: "easeOut" }}
                  whileHover={{ backgroundColor: '#22c55e' }}
                >
                  {member.completed > 0 && (
                    <motion.span 
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 1.5 }}
                    >
                      {member.completed}
                    </motion.span>
                  )}
                </motion.div>
                
                {/* Active bar */}
                <motion.div
                  className="absolute top-0 h-full bg-blue-500"
                  initial={{ width: 0, left: 0 }}
                  animate={{ 
                    left: `${completedPercentage}%`,
                    width: `${activePercentage}%` 
                  }}
                  transition={{ duration: 1, delay: index * 0.1 + 1.2, ease: "easeOut" }}
                  whileHover={{ backgroundColor: '#3b82f6' }}
                >
                  {member.active > 0 && (
                    <motion.span 
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 2 }}
                    >
                      {member.active}
                    </motion.span>
                  )}
                </motion.div>
              </div>

              {/* Percentage labels */}
              <motion.div 
                className="flex justify-between mt-1 text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 1.8 }}
              >
                <span>{member.completed} completed</span>
                <span>{member.active} active</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
