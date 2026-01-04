import { X, Shield, Eye, Users, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoleSelectorProps {
  currentRole: 'owner' | 'admin' | 'member' | 'viewer';
  memberName: string;
  onSelect: (role: 'owner' | 'admin' | 'member' | 'viewer') => void;
  onClose: () => void;
}

const roles = [
  {
    value: 'owner' as const,
    label: 'Owner',
    icon: Crown,
    color: 'purple',
    description: 'Full control over the project',
    permissions: ['Manage all settings', 'Delete project', 'Manage billing', 'Full access']
  },
  {
    value: 'admin' as const,
    label: 'Admin',
    icon: Shield,
    color: 'blue',
    description: 'Can manage members and project settings',
    permissions: ['Add/remove members', 'Edit project', 'Manage tasks', 'View reports']
  },
  {
    value: 'member' as const,
    label: 'Member',
    icon: Users,
    color: 'green',
    description: 'Can create and edit tasks',
    permissions: ['Create tasks', 'Edit own tasks', 'Comment', 'Upload files']
  },
  {
    value: 'viewer' as const,
    label: 'Viewer',
    icon: Eye,
    color: 'gray',
    description: 'Read-only access to project',
    permissions: ['View tasks', 'View members', 'View activity', 'Export data']
  }
];

export function RoleSelector({ currentRole, memberName, onSelect, onClose }: RoleSelectorProps) {
  const handleSelect = (role: typeof roles[number]['value']) => {
    if (role === 'owner' && currentRole !== 'owner') {
      if (!confirm(`Transfer ownership to ${memberName}? You will become an admin.`)) {
        return;
      }
    }
    onSelect(role);
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      purple: isSelected ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      blue: isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      green: isSelected ? 'bg-green-600 text-white border-green-600' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      gray: isSelected ? 'bg-gray-600 text-white border-gray-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Change Role</h2>
            <p className="text-sm text-gray-500 mt-1">Select a new role for {memberName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-6 space-y-3 overflow-y-auto max-h-[calc(90vh-180px)]">
          {roles.map(role => {
            const Icon = role.icon;
            const isSelected = currentRole === role.value;
            const isOwner = role.value === 'owner';
            
            return (
              <button
                key={role.value}
                onClick={() => handleSelect(role.value)}
                disabled={isOwner && currentRole === 'owner'}
                className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                  getColorClasses(role.color, isSelected)
                } ${isOwner && currentRole === 'owner' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : ''}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{role.label}</h3>
                      {isSelected && (
                        <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-3 ${isSelected ? 'text-white/90' : ''}`}>
                      {role.description}
                    </p>
                    <ul className="space-y-1">
                      {role.permissions.map((permission, idx) => (
                        <li key={idx} className={`text-xs flex items-center gap-2 ${isSelected ? 'text-white/80' : ''}`}>
                          <span className="w-1 h-1 rounded-full bg-current" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
