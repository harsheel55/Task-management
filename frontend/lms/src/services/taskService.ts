// services/taskService.ts
import { api } from './api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task.types';

export const taskService = {
  async getTasks(projectId: string): Promise<Task[]> {
    const response = await api.get(`/tasks?projectId=${projectId}`);
    return response.data;
  },

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const response = await api.post('/tasks', dto);
    return response.data;
  },

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, dto);
    return response.data;
  },

  async moveTask(id: string, columnId: string, position: number): Promise<void> {
    await api.put(`/tasks/${id}/move`, { columnId, position });
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async addComment(taskId: string, content: string): Promise<void> {
    await api.post(`/tasks/${taskId}/comments`, { content });
  },
};
