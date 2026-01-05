import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Palette, Type, Minimize2, Save } from 'lucide-react';
import { SettingsLayout } from '@/components/settings/SettingsLayout';

type Theme = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'red';
type FontSize = 'small' | 'medium' | 'large';

export const AppearanceSettings = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [compactMode, setCompactMode] = useState(false);

  const themes = [
    { value: 'light' as Theme, label: 'Light', icon: Sun, description: 'Bright and clear' },
    { value: 'dark' as Theme, label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { value: 'system' as Theme, label: 'System', icon: Monitor, description: 'Match your device' },
  ];

  const colorSchemes = [
    { value: 'blue' as ColorScheme, label: 'Blue', color: 'bg-blue-600' },
    { value: 'purple' as ColorScheme, label: 'Purple', color: 'bg-purple-600' },
    { value: 'green' as ColorScheme, label: 'Green', color: 'bg-green-600' },
    { value: 'orange' as ColorScheme, label: 'Orange', color: 'bg-orange-600' },
    { value: 'red' as ColorScheme, label: 'Red', color: 'bg-red-600' },
  ];

  const fontSizes = [
    { value: 'small' as FontSize, label: 'Small', size: '14px' },
    { value: 'medium' as FontSize, label: 'Medium', size: '16px' },
    { value: 'large' as FontSize, label: 'Large', size: '18px' },
  ];

  const handleSave = () => {
    console.log('Saving appearance settings', { theme, colorScheme, fontSize, compactMode });
  };

  return (
    <SettingsLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Theme Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Theme</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400">Choose your preferred theme</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {themes.map((t, index) => {
                const Icon = t.icon;
                return (
                  <motion.button
                    key={t.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTheme(t.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === t.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-2 ${
                        theme === t.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-zinc-500'
                      }`}
                    />
                    <div className={`text-sm font-semibold ${theme === t.value ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                      {t.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1">{t.description}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Color Scheme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Color Scheme</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400">Choose your accent color</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
              {colorSchemes.map((scheme, index) => (
                <motion.button
                  key={scheme.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setColorScheme(scheme.value)}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${scheme.color} flex items-center justify-center ${
                      colorScheme === scheme.value ? 'ring-4 ring-offset-2 ring-gray-300' : ''
                    }`}
                  >
                    {colorScheme === scheme.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-white rounded-full"
                      />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-zinc-300">{scheme.label}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Font Size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Font Size</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400">Adjust text size for readability</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {fontSizes.map((fs, index) => (
                <motion.button
                  key={fs.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFontSize(fs.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    fontSize === fs.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <div
                    style={{ fontSize: fs.size }}
                    className={`font-semibold mb-1 ${fontSize === fs.value ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    Aa
                  </div>
                  <div className={`text-sm ${fontSize === fs.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-zinc-400'}`}>
                    {fs.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1">{fs.size}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Compact Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Minimize2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Display Options</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400">Customize interface density</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Compact Mode</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Reduce spacing for a more dense interface
                </div>
              </div>
              <button
                onClick={() => setCompactMode(!compactMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  compactMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <motion.span
                  layout
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    compactMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
