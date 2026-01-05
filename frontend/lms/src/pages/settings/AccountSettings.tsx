import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertTriangle, Save, Eye, EyeOff } from 'lucide-react';
import { SettingsLayout } from '@/components/settings/SettingsLayout';

export const AccountSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [emailPreferences, setEmailPreferences] = useState({
    taskAssignment: true,
    comments: true,
    dueDates: true,
    weeklySummary: false,
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = () => {
    // API call would go here
    console.log('Updating password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEmailToggle = (key: string) => {
    setEmailPreferences({ ...emailPreferences, [key]: !emailPreferences[key as keyof typeof emailPreferences] });
  };

  const handleDeleteAccount = () => {
    // API call would go here
    console.log('Deleting account');
    setShowDeleteModal(false);
  };

  return (
    <SettingsLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Change Password</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400">Update your account password</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <button
                  onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
                >
                  {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <button
                  onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
                >
                  {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <button
                  onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
                >
                  {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpdatePassword}
              disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Lock className="w-4 h-4" />
              Update Password
            </motion.button>
          </div>
        </motion.div>

        {/* Email Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Email Preferences</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400">Choose what emails you receive</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {[
              { key: 'taskAssignment', label: 'Task Assignments', description: 'Get notified when assigned to a task' },
              { key: 'comments', label: 'Comments', description: 'Receive emails for new comments on your tasks' },
              { key: 'dueDates', label: 'Due Date Reminders', description: 'Reminders for upcoming task deadlines' },
              { key: 'weeklySummary', label: 'Weekly Summary', description: 'Weekly digest of your tasks and projects' },
            ].map((pref, index) => (
              <motion.div
                key={pref.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-800 last:border-0"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{pref.label}</div>
                  <div className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">{pref.description}</div>
                </div>
                <button
                  onClick={() => handleEmailToggle(pref.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailPreferences[pref.key as keyof typeof emailPreferences]
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  }`}
                >
                  <motion.span
                    layout
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailPreferences[pref.key as keyof typeof emailPreferences]
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-zinc-800">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </motion.button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border-2 border-red-200 dark:border-red-900"
        >
          <div className="p-4 sm:p-6 border-b border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-red-900 dark:text-red-400">Danger Zone</h2>
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-400/80">Irreversible actions</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Delete Account</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 mt-1">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(true)}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <AlertTriangle className="w-4 h-4" />
                Delete Account
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Delete Account?</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-zinc-400 mb-6">
              This action cannot be undone. All your data, projects, and tasks will be permanently deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete Permanently
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </SettingsLayout>
  );
};
