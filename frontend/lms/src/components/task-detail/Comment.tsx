import { useState } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';

interface CommentData {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface CommentProps {
  comment: CommentData;
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
}

export function Comment({ comment, onEdit, onDelete }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(comment.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      onDelete(comment.id);
    }
  };

  return (
    <div className="flex gap-3 group">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
        comment.isOwn ? 'from-blue-500 to-purple-600' : 'from-green-500 to-teal-600'
      } flex items-center justify-center text-xs font-bold text-white shrink-0`}>
        {comment.userAvatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 text-sm">{comment.userName}</span>
          <span className="text-xs text-gray-500">{comment.timestamp}</span>
        </div>
        
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.text}</p>
            {comment.isOwn && (
              <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs text-gray-600 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
