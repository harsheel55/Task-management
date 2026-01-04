import { useState } from 'react';
import { X, Mail, Send, RotateCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PendingInvite {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  sentDate: string;
}

interface InviteMemberFormProps {
  onClose: () => void;
}

const roleOptions = [
  { value: 'admin', label: 'Admin', description: 'Can manage members and edit project' },
  { value: 'member', label: 'Member', description: 'Can create and edit tasks' },
  { value: 'viewer', label: 'Viewer', description: 'Read-only access' }
];

export function InviteMemberForm({ onClose }: InviteMemberFormProps) {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'member' | 'viewer'>('member');
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([
    {
      id: '1',
      email: 'jane@example.com',
      role: 'member',
      sentDate: '2026-01-03'
    },
    {
      id: '2',
      email: 'bob@example.com',
      role: 'admin',
      sentDate: '2026-01-02'
    }
  ]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Add to pending invites
    const newInvite: PendingInvite = {
      id: Date.now().toString(),
      email,
      role: selectedRole,
      sentDate: new Date().toISOString().split('T')[0]
    };
    setPendingInvites([newInvite, ...pendingInvites]);
    
    // Reset form
    setEmail('');
    setSelectedRole('member');
    
    // Show success message
    alert(`Invitation sent to ${email}`);
  };

  const handleResendInvite = (inviteId: string) => {
    const invite = pendingInvites.find(i => i.id === inviteId);
    if (invite) {
      alert(`Invitation resent to ${invite.email}`);
      // Update sent date
      setPendingInvites(pendingInvites.map(i => 
        i.id === inviteId ? { ...i, sentDate: new Date().toISOString().split('T')[0] } : i
      ));
    }
  };

  const handleCancelInvite = (inviteId: string) => {
    setPendingInvites(pendingInvites.filter(i => i.id !== inviteId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100 text-blue-700';
      case 'member':
        return 'bg-green-100 text-green-700';
      case 'viewer':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Invite Team Members</h2>
          <p className="text-sm text-gray-500 mt-1">Send invitations to collaborate on this project</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Invite Form */}
      <form onSubmit={handleSendInvite} className="space-y-4 mb-6 pb-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'member' | 'viewer')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label} - {role.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          <Send className="w-4 h-4 mr-2" />
          Send Invitation
        </Button>
      </form>

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Pending Invitations ({pendingInvites.length})
          </h3>
          <div className="space-y-2">
            {pendingInvites.map(invite => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{invite.email}</p>
                    <p className="text-xs text-gray-500">Sent {formatDate(invite.sentDate)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(invite.role)}`}>
                    {invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <button
                    onClick={() => handleResendInvite(invite.id)}
                    className="p-2 hover:bg-blue-100 rounded transition-colors group"
                    title="Resend invitation"
                  >
                    <RotateCw className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleCancelInvite(invite.id)}
                    className="p-2 hover:bg-red-100 rounded transition-colors group"
                    title="Cancel invitation"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
