import React from 'react';
import { Check, X } from 'lucide-react';

const permissions = [
  {
    category: 'Project Management',
    items: [
      { name: 'View project', owner: true, admin: true, member: true, viewer: true },
      { name: 'Edit project details', owner: true, admin: true, member: false, viewer: false },
      { name: 'Delete project', owner: true, admin: false, member: false, viewer: false },
      { name: 'Archive project', owner: true, admin: true, member: false, viewer: false }
    ]
  },
  {
    category: 'Member Management',
    items: [
      { name: 'View members', owner: true, admin: true, member: true, viewer: true },
      { name: 'Invite members', owner: true, admin: true, member: false, viewer: false },
      { name: 'Remove members', owner: true, admin: true, member: false, viewer: false },
      { name: 'Change member roles', owner: true, admin: true, member: false, viewer: false }
    ]
  },
  {
    category: 'Task Management',
    items: [
      { name: 'View tasks', owner: true, admin: true, member: true, viewer: true },
      { name: 'Create tasks', owner: true, admin: true, member: true, viewer: false },
      { name: 'Edit all tasks', owner: true, admin: true, member: false, viewer: false },
      { name: 'Edit own tasks', owner: true, admin: true, member: true, viewer: false },
      { name: 'Delete tasks', owner: true, admin: true, member: false, viewer: false },
      { name: 'Assign tasks', owner: true, admin: true, member: true, viewer: false }
    ]
  },
  {
    category: 'Content & Communication',
    items: [
      { name: 'Add comments', owner: true, admin: true, member: true, viewer: false },
      { name: 'Upload attachments', owner: true, admin: true, member: true, viewer: false },
      { name: 'Edit own comments', owner: true, admin: true, member: true, viewer: false },
      { name: 'Delete any comment', owner: true, admin: true, member: false, viewer: false }
    ]
  },
  {
    category: 'Reporting & Analytics',
    items: [
      { name: 'View reports', owner: true, admin: true, member: true, viewer: true },
      { name: 'Export data', owner: true, admin: true, member: true, viewer: true },
      { name: 'View activity log', owner: true, admin: true, member: true, viewer: true }
    ]
  }
];

const roleColors = {
  owner: 'bg-purple-50 text-purple-700 font-semibold',
  admin: 'bg-blue-50 text-blue-700 font-semibold',
  member: 'bg-green-50 text-green-700 font-semibold',
  viewer: 'bg-gray-50 text-gray-700 font-semibold'
};

export function PermissionsTable() {
  const PermissionIcon = ({ allowed }: { allowed: boolean }) => (
    allowed ? (
      <div className="flex justify-center">
        <Check className="w-5 h-5 text-green-600" />
      </div>
    ) : (
      <div className="flex justify-center">
        <X className="w-5 h-5 text-gray-300" />
      </div>
    )
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                Permission
              </th>
              <th className={`px-6 py-4 text-center text-sm ${roleColors.owner}`}>
                Owner
              </th>
              <th className={`px-6 py-4 text-center text-sm ${roleColors.admin}`}>
                Admin
              </th>
              <th className={`px-6 py-4 text-center text-sm ${roleColors.member}`}>
                Member
              </th>
              <th className={`px-6 py-4 text-center text-sm ${roleColors.viewer}`}>
                Viewer
              </th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((category, categoryIdx) => (
              <React.Fragment key={categoryIdx}>
                {/* Category Header */}
                <tr className="bg-gray-50">
                  <td colSpan={5} className="px-6 py-3 text-sm font-semibold text-gray-700">
                    {category.category}
                  </td>
                </tr>
                {/* Permission Rows */}
                {category.items.map((item, itemIdx) => (
                  <tr 
                    key={itemIdx} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-6 py-3">
                      <PermissionIcon allowed={item.owner} />
                    </td>
                    <td className="px-6 py-3">
                      <PermissionIcon allowed={item.admin} />
                    </td>
                    <td className="px-6 py-3">
                      <PermissionIcon allowed={item.member} />
                    </td>
                    <td className="px-6 py-3">
                      <PermissionIcon allowed={item.viewer} />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">Allowed</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-gray-300" />
            <span className="text-gray-600">Not allowed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
