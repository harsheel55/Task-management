import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Comment } from './Comment';

interface CommentData {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface CommentSectionProps {
  taskId: string;
}

const mockComments: CommentData[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userAvatar: 'JD',
    text: 'I think we should focus on the user interface first before implementing the backend logic.',
    timestamp: '2h ago',
    isOwn: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'Alice Smith',
    userAvatar: 'AS',
    text: 'Good point! I can help with the UI design. Let me create some mockups.',
    timestamp: '1h ago',
    isOwn: false
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Johnson',
    userAvatar: 'MJ',
    text: 'I\'ve updated the requirements document with the latest changes. Please review when you get a chance.',
    timestamp: '30m ago',
    isOwn: false
  },
  {
    id: '4',
    userId: '1',
    userName: 'John Doe',
    userAvatar: 'JD',
    text: 'Thanks everyone! Looking forward to seeing the mockups.',
    timestamp: '15m ago',
    isOwn: true
  }
];

export function CommentSection({ taskId: _taskId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: CommentData = {
        id: `${Date.now()}`,
        userId: '1',
        userName: 'John Doe',
        userAvatar: 'JD',
        text: newComment,
        timestamp: 'Just now',
        isOwn: true
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleEdit = (commentId: string, newText: string) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, text: newText } : c
    ));
  };

  const handleDelete = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const handleLoadMore = () => {
    // Simulate loading more comments
    setShowLoadMore(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Comments ({comments.length})</h2>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            JD
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={!newComment.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Comment
          </Button>
        </div>
      </form>

      {/* Load More Button */}
      {showLoadMore && comments.length > 3 && (
        <button
          onClick={handleLoadMore}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Load more comments...
        </button>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
