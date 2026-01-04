import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { 
  ChevronRight, 
  Search,
  UserPlus,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/members/MemberCard";
import { InviteMemberForm } from "@/components/members/InviteMemberForm";
import { PermissionsTable } from "@/components/members/PermissionsTable.tsx";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedDate: string;
  tasksAssigned: number;
}

export default function MembersPage() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showInviteForm, setShowInviteForm] = useState(false);

  // Mock data
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'JD',
      role: 'owner',
      joinedDate: '2025-12-01',
      tasksAssigned: 15
    },
    {
      id: '2',
      name: 'Alice Smith',
      email: 'alice@example.com',
      avatar: 'AS',
      role: 'admin',
      joinedDate: '2025-12-15',
      tasksAssigned: 12
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'MJ',
      role: 'member',
      joinedDate: '2025-12-20',
      tasksAssigned: 8
    },
    {
      id: '4',
      name: 'Sarah Lee',
      email: 'sarah@example.com',
      avatar: 'SL',
      role: 'member',
      joinedDate: '2026-01-02',
      tasksAssigned: 5
    },
    {
      id: '5',
      name: 'Tom Wilson',
      email: 'tom@example.com',
      avatar: 'TW',
      role: 'viewer',
      joinedDate: '2026-01-03',
      tasksAssigned: 0
    }
  ]);

  const projectName = "Advanced React Patterns";

  const handleChangeRole = (memberId: string, newRole: 'owner' | 'admin' | 'member' | 'viewer') => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    ));
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="bg-gray-50 dark:bg-zinc-950">
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-20">
            <div className="px-6 py-4">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400 mb-3">
                <SidebarTrigger />
                <div className="h-6 w-[1px] bg-gray-200 dark:bg-zinc-700 mx-2" />
                <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to={`/project/${id}/board`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {projectName}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white font-medium">Members</span>
              </div>

              {/* Page Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h1>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Manage project members and permissions</p>
                </div>
                <Button 
                  onClick={() => setShowInviteForm(!showInviteForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite Member
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Role Filter */}
                <div className="flex gap-2">
                  {['all', 'owner', 'admin', 'member', 'viewer'].map(role => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(role)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        roleFilter === role
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Invite Form */}
              {showInviteForm && (
                <InviteMemberForm onClose={() => setShowInviteForm(false)} />
              )}

              {/* Members Count */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                <Users className="w-4 h-4" />
                <span>{filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found</span>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map(member => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onChangeRole={handleChangeRole}
                    onRemove={handleRemoveMember}
                  />
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 dark:text-zinc-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-zinc-400">No members found</p>
                </div>
              )}

              {/* Permissions Table */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Roles & Permissions</h2>
                <PermissionsTable />
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
