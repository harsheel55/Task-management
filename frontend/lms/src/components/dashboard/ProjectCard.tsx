import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Edit, Archive, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    progress: number;
    taskCount: number;
    completedTasks: number;
    teamMembers: string[];
    lastUpdated: string;
    status: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on dropdown menu
    if ((e.target as HTMLElement).closest('[data-dropdown]')) {
      return;
    }
    navigate(`/project/${project.id}/board`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      onClick={handleCardClick}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-white cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
        </div>
        <div data-dropdown>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span className="font-medium">Progress</span>
          <span className="font-semibold">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-2 rounded-full ${
              project.progress >= 80 ? 'bg-green-600' :
              project.progress >= 50 ? 'bg-blue-600' :
              'bg-amber-500'
            }`}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {project.teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white border-2 border-white"
                title={member}
              >
                {member}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-600 font-medium">
            {project.completedTasks}/{project.taskCount} tasks
          </span>
        </div>
        <span className="text-xs text-gray-400">{project.lastUpdated}</span>
      </div>
    </motion.div>
  );
}
