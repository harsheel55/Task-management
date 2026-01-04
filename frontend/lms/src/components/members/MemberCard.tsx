import { MoreVertical, Mail, Shield, UserMinus, Calendar, ListTodo } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RoleSelector } from './RoleSelector';
import { useState } from 'react';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedDate: string;
  tasksAssigned: number;
}

interface MemberCardProps {
  member: Member;
  onChangeRole: (memberId: string, newRole: 'owner' | 'admin' | 'member' | 'viewer') => void;
  onRemove: (memberId: string) => void;
}

const roleConfig = {
  owner: { label: 'Owner', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  admin: { label: 'Admin', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  member: { label: 'Member', color: 'bg-green-100 text-green-700 border-green-200' },
  viewer: { label: 'Viewer', color: 'bg-gray-100 text-gray-700 border-gray-200' }
};

const avatarColors = {
  owner: 'bg-purple-600',
  admin: 'bg-blue-600',
  member: 'bg-green-600',
  viewer: 'bg-gray-600'
};

export function MemberCard({ member, onChangeRole, onRemove }: MemberCardProps) {
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const roleStyle = roleConfig[member.role];
  const avatarColor = avatarColors[member.role];

  const handleSendMessage = () => {
    window.location.href = `mailto:${member.email}`;
  };

  const handleRemove = () => {
    if (member.role === 'owner') {
      alert('Cannot remove the project owner');
      return;
    }
    if (confirm(`Remove ${member.name} from this project?`)) {
      onRemove(member.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      {/* Header with Avatar and Actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-lg font-bold text-white`}>
            {member.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSendMessage} className="cursor-pointer">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </DropdownMenuItem>
            {member.role !== 'owner' && (
              <>
                <DropdownMenuItem 
                  onClick={() => setShowRoleSelector(true)} 
                  className="cursor-pointer"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Change Role
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleRemove}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  Remove from Project
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Role Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${roleStyle.color}`}>
          {roleStyle.label}
        </span>
      </div>

      {/* Member Info */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Joined {formatDate(member.joinedDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <ListTodo className="w-4 h-4" />
          <span>{member.tasksAssigned} task{member.tasksAssigned !== 1 ? 's' : ''} assigned</span>
        </div>
      </div>

      {/* Role Selector Modal */}
      {showRoleSelector && (
        <RoleSelector
          currentRole={member.role}
          memberName={member.name}
          onSelect={(newRole) => {
            onChangeRole(member.id, newRole);
            setShowRoleSelector(false);
          }}
          onClose={() => setShowRoleSelector(false)}
        />
      )}
    </div>
  );
}
