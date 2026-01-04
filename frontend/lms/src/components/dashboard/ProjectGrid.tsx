import { useState } from 'react';
import { Search, Filter, ArrowUpDown, Grid3x3, List, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectCard } from './ProjectCard';

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  taskCount: number;
  completedTasks: number;
  teamMembers: string[];
  lastUpdated: string;
  status: string;
}

interface ProjectGridProps {
  projects: Project[];
  onCreateProject?: () => void;
}

export function ProjectGrid({ projects, onCreateProject }: ProjectGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <Button 
          onClick={onCreateProject}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All Projects
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('archived')}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Name</DropdownMenuItem>
              <DropdownMenuItem>Date Created</DropdownMenuItem>
              <DropdownMenuItem>Last Updated</DropdownMenuItem>
              <DropdownMenuItem>Progress</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' ? 'bg-gray-100 dark:bg-zinc-800' : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50'
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-4 h-4 dark:text-zinc-400" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list' ? 'bg-gray-100 dark:bg-zinc-800' : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4 dark:text-zinc-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-zinc-400">No projects found</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-blue-600 hover:text-blue-700 mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
