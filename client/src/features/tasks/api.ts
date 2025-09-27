// import api from '@/lib/api';

// export type Task = {
//   _id: string;
//   userId: string;
//   title: string;
//   description?: string;
//   dueDate?: string;
//   priority: 'low' | 'medium' | 'high';
//   status: 'pending' | 'in-progress' | 'completed';
//   createdAt: string;
//   updatedAt: string;
// };

// export type ListTasksResponse = {
//   items: Task[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// };

// export async function listTasks(params: Partial<{ page: number; limit: number; title: string; status: Task['status']; priority: Task['priority']; sortBy: 'dueDate' | 'createdAt'; order: 'asc' | 'desc'; }> = {}) {
//   const { data } = await api.get<ListTasksResponse>('/tasks', { params });
//   return data;
// }

// export async function getTask(id: string) {
//   const { data } = await api.get<Task>(`/tasks/${id}`);
//   return data;
// }

// export async function createTask(payload: Partial<Task>) {
//   const { data } = await api.post<Task>('/tasks', payload);
//   return data;
// }

// export async function updateTask(id: string, payload: Partial<Task>) {
//   const { data } = await api.put<Task>(`/tasks/${id}`, payload);
//   return data;
// }

// export async function deleteTask(id: string) {
//   const { data } = await api.delete<{ success: boolean }>(`/tasks/${id}`);
//   return data;
// }

// export async function updateTaskStatus(id: string, status: Task['status']) {
//   const { data } = await api.patch<Task>(`/tasks/${id}/status`, { status });
//   return data;
// }



import api from '@/lib/api';

export type Task = {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
};

export type ListTasksResponse = {
  items: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/** List tasks with optional filters */
export async function listTasks(
  params: Partial<{
    page: number;
    limit: number;
    title: string;
    status: Task['status'];
    priority: Task['priority'];
    sortBy: 'dueDate' | 'createdAt';
    order: 'asc' | 'desc';
  }> = {}
): Promise<ListTasksResponse> {
  const { data } = await api.get<ListTasksResponse>('/tasks', { params });
  return data;
}

/** Get a single task */
export async function getTask(id: string): Promise<Task> {
  const { data } = await api.get<Task>(`/tasks/${id}`);
  return data;
}

/** Create a new task */
export async function createTask(payload: Partial<Task>): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', payload);
  return data;
}

/** Update an existing task */
export async function updateTask(id: string, payload: Partial<Task>): Promise<Task> {
  const { data } = await api.put<Task>(`/tasks/${id}`, payload);
  return data;
}

/** Delete a task */
export async function deleteTask(id: string): Promise<{ success: boolean }> {
  const { data } = await api.delete<{ success: boolean }>(`/tasks/${id}`);
  return data;
}

/** Update task status */
export async function updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${id}/status`, { status });
  return data;
}
