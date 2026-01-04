import { useState } from 'react';
import { Upload, X, Download, FileText, Image, File } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  uploadedDate: string;
  url: string;
}

interface AttachmentListProps {
  taskId: string;
}

const mockAttachments: Attachment[] = [
  {
    id: '1',
    name: 'design-mockup.fig',
    size: '2.4 MB',
    type: 'figma',
    uploadedBy: 'John Doe',
    uploadedDate: '2h ago',
    url: '#'
  },
  {
    id: '2',
    name: 'requirements.pdf',
    size: '1.8 MB',
    type: 'pdf',
    uploadedBy: 'Alice Smith',
    uploadedDate: '1d ago',
    url: '#'
  },
  {
    id: '3',
    name: 'screenshot.png',
    size: '456 KB',
    type: 'image',
    uploadedBy: 'Mike Johnson',
    uploadedDate: '2d ago',
    url: '#'
  }
];

export function AttachmentList({ taskId: _taskId }: AttachmentListProps) {
  const [attachments] = useState<Attachment[]>(mockAttachments);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload
    console.log('Files selected:', e.target.files);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-blue-600" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Attachments ({attachments.length})</h2>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop files here, or{' '}
            <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
              browse
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-xs text-gray-500">Max file size: 10MB</p>
        </div>
      </div>

      {/* Attachment List */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map(attachment => (
            <div
              key={attachment.id}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="shrink-0">
                {getFileIcon(attachment.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{attachment.name}</p>
                <p className="text-xs text-gray-500">
                  {attachment.size} • Uploaded by {attachment.uploadedBy} • {attachment.uploadedDate}
                </p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => window.open(attachment.url, '_blank')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => console.log('Delete:', attachment.id)}
                  className="p-2 hover:bg-red-100 rounded transition-colors"
                  title="Delete"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
