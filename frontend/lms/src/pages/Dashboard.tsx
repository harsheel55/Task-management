import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  FolderKanban,
  ListChecks,
  CheckCircle2,
  Users,
  Plus,
  ListChecks as TaskIcon,
  Settings,
  MessageSquare,
  Upload,
  UserPlus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectGrid } from "@/components/dashboard/ProjectGrid";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CreateProjectModal } from "@/components/dashboard/CreateProjectModal";
import { authService } from '@/services/authService';

// Mock data - Replace with actual data from your backend
const mockProjects = [
  {
    id: 1,
    name: "Advanced React Patterns",
    description: "Learn advanced React patterns including compound components, render props, and hooks",
    progress: 65,
    taskCount: 12,
    completedTasks: 8,
    teamMembers: ["JD", "AS", "MK"],
    lastUpdated: "2 hours ago",
    status: "active"
  },
  {
    id: 2,
    name: "TypeScript Masterclass",
    description: "Complete guide to TypeScript from basics to advanced topics",
    progress: 45,
    taskCount: 20,
    completedTasks: 9,
    teamMembers: ["JD", "LT"],
    lastUpdated: "1 day ago",
    status: "active"
  },
  {
    id: 3,
    name: "Full Stack Development",
    description: "Build full stack applications with modern tools and frameworks",
    progress: 80,
    taskCount: 15,
    completedTasks: 12,
    teamMembers: ["JD", "AS", "MK", "RT"],
    lastUpdated: "3 days ago",
    status: "active"
  }
];

const mockActivities = [
  { id: 1, user: "John Doe", action: "completed task", target: "Module 5: State Management", time: "2h ago", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { id: 2, user: "Alice Smith", action: "submitted", target: "Assignment 3", time: "3h ago", icon: Upload, color: "text-blue-600", bg: "bg-blue-50" },
  { id: 3, user: "Mike Johnson", action: "created project", target: "UI Design System", time: "5h ago", icon: FolderKanban, color: "text-purple-600", bg: "bg-purple-50" },
  { id: 4, user: "John Doe", action: "joined team", target: "Backend Development", time: "1d ago", icon: UserPlus, color: "text-amber-600", bg: "bg-amber-50" },
  { id: 5, user: "Sarah Lee", action: "sent message", target: "Team Chat", time: "1d ago", icon: MessageSquare, color: "text-indigo-600", bg: "bg-indigo-50" },
];

/**
 * Dashboard page component
 */
const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user?.firstName) {
      setUserName(user.firstName);
    }
  }, []);

  const handleCreateProject = (project: { name: string; description: string }) => {
    console.log("Creating project:", project);
    // TODO: Implement actual project creation logic
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-gray-50/50 dark:bg-zinc-950">
        <div className="flex flex-col min-h-screen">
          {/* Header Section */}
          <header className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4 mb-4">
                <SidebarTrigger />
                <div className="h-6 w-[1px] bg-gray-200" />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {userName}! 👋</h1>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">Here's what's happening with your projects today</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard 
                  icon={FolderKanban}
                  label="Total Projects"
                  value="12"
                  color="blue"
                  delay={0}
                />
                <StatsCard 
                  icon={ListChecks}
                  label="Active Tasks"
                  value="24"
                  color="amber"
                  delay={0.1}
                />
                <StatsCard 
                  icon={CheckCircle2}
                  label="Completed Tasks"
                  value="156"
                  color="green"
                  delay={0.2}
                />
                <StatsCard 
                  icon={Users}
                  label="Team Members"
                  value="8"
                  color="purple"
                  delay={0.3}
                />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Projects Section */}
                <div className="lg:col-span-2 space-y-6">
                  <ProjectGrid 
                    projects={mockProjects}
                    onCreateProject={() => setIsModalOpen(true)}
                  />
                  
                  {/* Quick Actions */}
                  <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                      </Button>
                      <Button 
                        variant="outline"
                        className="justify-start"
                      >
                        <TaskIcon className="w-4 h-4 mr-2" />
                        View All Tasks
                      </Button>
                      <Button 
                        variant="outline"
                        className="justify-start"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Team Settings
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Activity Feed Sidebar */}
                <div>
                  <ActivityFeed 
                    activities={mockActivities}
                    onViewAll={() => console.log("View all activities")}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>

      <CreateProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </SidebarProvider>
  );
};

export default Dashboard;