import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ChevronRight, Download, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { StatsOverview } from '@/components/analytics/StatsOverview.tsx';
import { TaskCompletionChart } from '@/components/analytics/TaskCompletionChart.tsx';
import { TaskDistributionChart } from '@/components/analytics/TaskDistributionChart.tsx';
import { MemberPerformanceChart } from '@/components/analytics/MemberPerformanceChart.tsx';
import { DateRangePicker } from '@/components/analytics/DateRangePicker.tsx';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function AnalyticsPage() {
  const { id } = useParams();
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '3months' | 'all'>('30days');

  const handleExportPDF = () => {
    alert('PDF export will be implemented with a library like jsPDF');
  };

  const handleExportCSV = () => {
    alert('CSV export will be implemented');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-gray-50/50 dark:bg-zinc-950 overflow-hidden">
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-20">
            <div className="px-6 py-4">
              {/* Breadcrumb Navigation */}
              <motion.div 
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <SidebarTrigger />
                </motion.div>
                <div className="h-6 w-[1px] bg-gray-200 dark:bg-zinc-700 mx-2" />
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Dashboard
                  </Link>
                </motion.div>
                <ChevronRight className="w-4 h-4" />
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Link to={`/project/${id}/board`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Project
                  </Link>
                </motion.div>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white font-medium">Analytics</span>
              </motion.div>

              {/* Header */}
              <motion.div 
                className="flex items-start justify-between mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex-1">
                  <motion.h1 
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Project Analytics
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-500 dark:text-zinc-400 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Track your project's progress and team performance
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Export CSV
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={handleExportPDF} className="gap-2">
                      <Download className="w-4 h-4" />
                      Export PDF
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Date Range Picker */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <DateRangePicker value={dateRange} onChange={setDateRange} />
              </motion.div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <motion.div 
              className="p-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Stats Overview */}
              <motion.div 
                className="mb-6"
                variants={itemVariants}
              >
                <StatsOverview dateRange={dateRange} />
              </motion.div>

              {/* Charts Grid */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskCompletionChart dateRange={dateRange} />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskDistributionChart type="status" />
                </motion.div>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskDistributionChart type="priority" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <MemberPerformanceChart />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
