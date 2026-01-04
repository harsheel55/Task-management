import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import {
  User,
  Shield,
  Bell,
  Palette,
  ChevronRight,
} from 'lucide-react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const settingsMenuItems = [
  {
    title: 'Profile',
    path: '/settings/profile',
    icon: User,
    description: 'Manage your personal information',
  },
  {
    title: 'Account',
    path: '/settings/account',
    icon: Shield,
    description: 'Security and email preferences',
  },
  {
    title: 'Notifications',
    path: '/settings/notifications',
    icon: Bell,
    description: 'Configure notification preferences',
  },
  {
    title: 'Appearance',
    path: '/settings/appearance',
    icon: Palette,
    description: 'Customize theme and display',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800"
          >
            <div className="flex items-center gap-2 p-3 sm:p-4 md:p-6">
              <SidebarTrigger />
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                <Link to="/dashboard" className="hover:text-gray-900 dark:hover:text-white">
                  Dashboard
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white font-semibold">Settings</span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Settings Menu */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-1"
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-2">
                    <nav className="space-y-1">
                      {settingsMenuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                          <motion.div key={item.path} variants={itemVariants}>
                            <Link to={item.path}>
                              <motion.div
                                whileHover={{ x: 4 }}
                                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                                  isActive
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                                }`}
                              >
                                <Icon
                                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-zinc-500'
                                  }`}
                                />
                                <div className="flex-1 min-w-0">
                                  <div
                                    className={`text-sm font-semibold ${
                                      isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                                    }`}
                                  >
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 hidden sm:block">
                                    {item.description}
                                  </div>
                                </div>
                                {isActive && (
                                  <motion.div
                                    layoutId="activeSettingsIndicator"
                                    className="w-1 h-full bg-blue-600 rounded-full -mr-2"
                                  />
                                )}
                              </motion.div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </nav>
                  </div>
                </motion.div>

                {/* Settings Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-3"
                >
                  {children}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
