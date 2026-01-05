import { X, Mail, MoreVertical, UserMinus, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MembersPanelProps {
  onClose: () => void;
}

const mockMembers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Owner', avatar: 'JD', color: 'from-blue-500 to-purple-600' },
  { id: '2', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', avatar: 'AS', color: 'from-green-500 to-teal-600' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: 'MJ', color: 'from-orange-500 to-red-600' },
  { id: '4', name: 'Sarah Lee', email: 'sarah@example.com', role: 'Member', avatar: 'SL', color: 'from-pink-500 to-rose-600' },
];

export function MembersPanel({ onClose }: MembersPanelProps) {
  return (
    <div className="w-80 bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">Team Members</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {mockMembers.map(member => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {member.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{member.name}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">{member.email}</p>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded">
                  {member.role}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-all">
                    <MoreVertical className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="w-4 h-4 mr-2" />
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <UserMinus className="w-4 h-4 mr-2" />
                    Remove from Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/80">
        <div className="text-sm text-gray-600 dark:text-zinc-400">
          <p className="font-medium text-gray-900 dark:text-white mb-1">Team Stats</p>
          <div className="space-y-1">
            <p>Total Members: <span className="font-semibold">{mockMembers.length}</span></p>
            <p>Active Today: <span className="font-semibold">3</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
