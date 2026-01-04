// types/task.types.ts

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  createdBy: User;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  assignedTo?: User;
  assignedToId?: string;
  createdBy: User;
  createdById: string;
  priority: Priority;
  dueDate?: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
  attachments?: Attachment[];
  labels?: Label[];
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  columnId: string;
  assignedToId?: string;
  priority: Priority;
  dueDate?: string;
  position: number;
  projectId: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  assignedToId?: string;
  priority?: Priority;
  dueDate?: string;
}

export interface MoveTaskDto {
  columnId: string;
  position: number;
}
