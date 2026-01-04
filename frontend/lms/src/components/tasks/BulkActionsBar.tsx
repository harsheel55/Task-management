import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Flag, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkAssign: () => void;
  onBulkChangePriority: () => void;
  onBulkDelete: () => void;
  onBulkComplete: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkAssign,
  onBulkChangePriority,
  onBulkDelete,
  onBulkComplete
}: BulkActionsBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 max-w-4xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-2xl border border-gray-200 p-3 sm:p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              {/* Selection Count */}
              <div className="flex items-center gap-3 justify-between sm:justify-start">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {selectedCount}
                  </motion.div>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    {selectedCount} task{selectedCount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Clear Selection - Mobile */}
                <motion.button
                  onClick={onClearSelection}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors sm:hidden"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />

              {/* Actions */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onBulkComplete}
                    className="gap-2 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Complete</span>
                    <span className="sm:hidden">Done</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onBulkAssign}
                    className="gap-2 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    Assign
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onBulkChangePriority}
                    className="gap-2 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                    Priority
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onBulkDelete}
                    className="gap-2 w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    Delete
                  </Button>
                </motion.div>
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />

              {/* Clear Selection - Desktop */}
              <motion.button
                onClick={onClearSelection}
                className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
