import { useState } from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Search, 
  SlidersHorizontal,
  LayoutGrid,
  Users,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskList } from '@/components/tasks/TaskList';
import { BulkActionsBar } from '@/components/tasks/BulkActionsBar';

export function AllTasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<'none' | 'project' | 'assignee' | 'due_date'>('none');
  const [sortBy, _setSortBy] = useState('due_date');
  const [filters, setFilters] = useState({
    project: 'All Projects',
    assignee: 'All',
    priority: 'All',
    status: 'All',
    dueDate: 'All',
    labels: []
  });

  // Mock data
  const allTasks = [
    {
      id: '1',
      title: 'Design new landing page',
      project: 'Advanced React Patterns',
      assignee: 'John Doe',
      priority: 'high' as const,
      status: 'in_progress' as const,
      dueDate: '2026-01-10',
      labels: ['Design', 'UI/UX']
    },
    {
      id: '2',
      title: 'Implement authentication',
      project: 'E-commerce Platform',
      assignee: 'Alice Smith',
      priority: 'urgent' as const,
      status: 'todo' as const,
      dueDate: '2026-01-08',
      labels: ['Backend', 'Security']
    },
    {
      id: '3',
      title: 'Setup project repository',
      project: 'Mobile App',
      assignee: null,
      priority: 'medium' as const,
      status: 'done' as const,
      dueDate: '2026-01-05',
      labels: ['DevOps']
    },
    {
      id: '4',
      title: 'Update documentation',
      project: 'Advanced React Patterns',
      assignee: 'John Doe',
      priority: 'low' as const,
      status: 'todo' as const,
      dueDate: '2026-01-15',
      labels: ['Documentation']
    }
  ];

  const handleSelectTask = (id: string) => {
    setSelectedTasks(prev =>
      prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
    );
  };

  const handleTaskClick = (task: any) => {
    console.log('Open task detail:', task);
  };

  const handleStatusChange = (id: string, status: string) => {
    console.log('Change status:', id, status);
  };

  const handleBulkAssign = () => {
    alert(`Assign ${selectedTasks.length} tasks`);
  };

  const handleBulkChangePriority = () => {
    alert(`Change priority for ${selectedTasks.length} tasks`);
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedTasks.length} tasks?`)) {
      console.log('Delete tasks:', selectedTasks);
      setSelectedTasks([]);
    }
  };

  const handleBulkComplete = () => {
    console.log('Complete tasks:', selectedTasks);
    setSelectedTasks([]);
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-gray-50/50 dark:bg-zinc-950 overflow-hidden">
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-20">
            <div className="px-6 py-4">
              {/* Breadcrumb */}
              <motion.div
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SidebarTrigger />
                <div className="h-6 w-[1px] bg-gray-200 dark:bg-zinc-700 mx-2" />
                <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white font-medium">All Tasks</span>
              </motion.div>

              {/* Page Header */}
              <motion.div
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">All Tasks</h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">View and manage tasks across all projects</p>
                </div>

                {/* View Options */}
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
                      <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Sort: {sortBy.replace('_', ' ')}</span>
                      <span className="sm:hidden">Sort</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Search and Group By */}
              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex-1 relative sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 font-medium hidden sm:inline">Group by:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <motion.button
                      onClick={() => setGroupBy('none')}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        groupBy === 'none' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      None
                    </motion.button>
                    <motion.button
                      onClick={() => setGroupBy('project')}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors gap-1 sm:gap-2 flex items-center whitespace-nowrap ${
                        groupBy === 'project' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Project</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setGroupBy('assignee')}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors gap-1 sm:gap-2 flex items-center whitespace-nowrap ${
                        groupBy === 'assignee' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Assignee</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setGroupBy('due_date')}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors gap-1 sm:gap-2 flex items-center whitespace-nowrap ${
                        groupBy === 'due_date' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Due Date</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 pb-24">
              {/* Filters */}
              <TaskFilters filters={filters} onFilterChange={setFilters} />

              {/* Task List */}
              <TaskList
                tasks={allTasks}
                selectedTasks={selectedTasks}
                onSelectTask={handleSelectTask}
                onTaskClick={handleTaskClick}
                onStatusChange={handleStatusChange}
                groupBy={groupBy}
              />
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        <BulkActionsBar
          selectedCount={selectedTasks.length}
          onClearSelection={() => setSelectedTasks([])}
          onBulkAssign={handleBulkAssign}
          onBulkChangePriority={handleBulkChangePriority}
          onBulkDelete={handleBulkDelete}
          onBulkComplete={handleBulkComplete}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
