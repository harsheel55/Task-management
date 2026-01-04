import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Save } from 'lucide-react';
import { SettingsLayout } from '@/components/settings/SettingsLayout';

type NotificationType = 'taskAssignments' | 'comments' | 'mentions' | 'dueDates' | 'projectUpdates';
type EmailFrequency = 'immediately' | 'daily' | 'weekly';

export const NotificationSettings = () => {
  const [inAppNotifications, setInAppNotifications] = useState({
    taskAssignments: true,
    comments: true,
    mentions: true,
    dueDates: true,
    projectUpdates: false,
  });

  const [emailNotifications, setEmailNotifications] = useState({
    taskAssignments: true,
    comments: false,
    mentions: true,
    dueDates: true,
    projectUpdates: false,
  });

  const [emailFrequency, setEmailFrequency] = useState<EmailFrequency>('immediately');

  const notificationTypes = [
    { key: 'taskAssignments' as NotificationType, label: 'Task Assignments', description: 'When you are assigned to a task' },
    { key: 'comments' as NotificationType, label: 'Comments', description: 'New comments on your tasks' },
    { key: 'mentions' as NotificationType, label: 'Mentions', description: 'When someone mentions you' },
    { key: 'dueDates' as NotificationType, label: 'Due Date Reminders', description: 'Upcoming task deadlines' },
    { key: 'projectUpdates' as NotificationType, label: 'Project Updates', description: 'Changes to projects you\'re part of' },
  ];

  const handleInAppToggle = (key: NotificationType) => {
    setInAppNotifications({ ...inAppNotifications, [key]: !inAppNotifications[key] });
  };

  const handleEmailToggle = (key: NotificationType) => {
    setEmailNotifications({ ...emailNotifications, [key]: !emailNotifications[key] });
  };

  const handleSave = () => {
    console.log('Saving notification preferences');
  };

  return (
    <SettingsLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* In-App Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">In-App Notifications</h2>
                <p className="text-xs sm:text-sm text-gray-600">Manage your in-app notification preferences</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3">
            {notificationTypes.map((type, index) => (
              <motion.div
                key={type.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{type.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{type.description}</div>
                </div>
                <button
                  onClick={() => handleInAppToggle(type.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    inAppNotifications[type.key] ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <motion.span
                    layout
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      inAppNotifications[type.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Email Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Email Notifications</h2>
                <p className="text-xs sm:text-sm text-gray-600">Choose what notifications to receive via email</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3">
            {notificationTypes.map((type, index) => (
              <motion.div
                key={type.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{type.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{type.description}</div>
                </div>
                <button
                  onClick={() => handleEmailToggle(type.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailNotifications[type.key] ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <motion.span
                    layout
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications[type.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Email Frequency */}
          <div className="p-4 sm:p-6 border-t border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Frequency
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['immediately', 'daily', 'weekly'] as EmailFrequency[]).map((freq) => (
                <motion.button
                  key={freq}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEmailFrequency(freq)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    emailFrequency === freq
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="capitalize">{freq}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {freq === 'immediately' && 'Real-time emails'}
                    {freq === 'daily' && 'Once per day'}
                    {freq === 'weekly' && 'Weekly digest'}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 text-sm sm:text-base"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </motion.button>
        </motion.div>
      </div>
    </SettingsLayout>
  );
};
