import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { 
  ChevronRight, 
  Users, 
  UserPlus, 
  Settings,
  Search,
  Filter,
  LayoutGrid,
  List,
  Calendar,
  Edit,
  Archive,
  Trash2,
  BarChart3
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Board } from "@/components/project-board/Board";
import { ListView } from "@/components/project-board/ListView";
import { CalendarView } from "@/components/project-board/CalendarView";
import { MembersPanel } from "@/components/project-board/MembersPanel";
import { FilterPanel } from "@/components/project-board/FilterPanel";
import { TaskDetailModal } from "@/components/task-detail/TaskDetailModal";
import type { Task } from "@/components/project-board/Board";

export default function ProjectBoard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("Advanced React Patterns");
  
  // TODO: Use id to fetch project data from backend
  console.log('Project ID:', id);
  const [isEditingName, setIsEditingName] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'board' | 'list' | 'calendar'>('board');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectDescription = "Learn advanced React patterns including compound components, render props, and hooks";

  const handleNameSave = () => {
    setIsEditingName(false);
    // TODO: Save to backend
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskUpdate = (task: Task) => {
    // TODO: Update task in backend
    console.log('Update task:', task);
    setSelectedTask(task);
  };

  const handleTaskDelete = (taskId: string) => {
    // TODO: Delete task from backend
    console.log('Delete task:', taskId);
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-gray-50/50 overflow-hidden">
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white border-b sticky top-0 z-20">
            <div className="px-6 py-4">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <SidebarTrigger />
                <div className="h-6 w-[1px] bg-gray-200 mx-2" />
                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">{projectName}</span>
              </div>

              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      onBlur={handleNameSave}
                      onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                      className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 outline-none bg-transparent"
                      autoFocus
                    />
                  ) : (
                    <h1 
                      onClick={() => setIsEditingName(true)}
                      className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {projectName}
                    </h1>
                  )}
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">{projectDescription}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/project/${id}/members`)}
                    className="gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Members
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/project/${id}/analytics`)}
                    className="gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <UserPlus className="w-4 h-4" />
                    Invite
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/project/${id}/analytics`)}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/project/${id}/members`)}>
                        <Users className="w-4 h-4 mr-2" />
                        Manage Members
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive Project
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <Button 
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>

                {/* View Options */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('board')}
                    className={`p-2 transition-colors ${
                      viewMode === 'board' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    title="Board View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`p-2 transition-colors ${
                      viewMode === 'calendar' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    title="Calendar View"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex overflow-hidden">
              {/* Board Area */}
              <div className="flex-1 overflow-x-auto overflow-y-hidden">
                {viewMode === 'board' && <Board searchQuery={searchQuery} onTaskClick={handleTaskClick} />}
                {viewMode === 'list' && <ListView searchQuery={searchQuery} onTaskClick={handleTaskClick} />}
                {viewMode === 'calendar' && <CalendarView searchQuery={searchQuery} onTaskClick={handleTaskClick} />}
              </div>

              {/* Side Panels */}
              {showMembers && (
                <MembersPanel onClose={() => setShowMembers(false)} />
              )}
              {showFilters && (
                <FilterPanel onClose={() => setShowFilters(false)} />
              )}
            </div>
          </main>
        </div>
      </SidebarInset>
      
      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
      />
    </SidebarProvider>
  );
}
