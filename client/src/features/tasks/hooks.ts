import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTask, deleteTask, getTask, listTasks, updateTask, updateTaskStatus, Task, ListTasksResponse } from './api';

export function useTasks(params: Parameters<typeof listTasks>[0]) {
  return useQuery({ queryKey: ['tasks', params], queryFn: () => listTasks(params) });
}

export function useTask(id: string) {
  return useQuery({ queryKey: ['task', id], queryFn: () => getTask(id), enabled: !!id });
}

export function useTaskMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['tasks'] });
  
  function updateAllTaskLists(updateFn: (task: Task) => Task) {
    const queries = qc.getQueriesData<ListTasksResponse>({ queryKey: ['tasks'] });
    for (const [queryKey, old] of queries) {
      if (!old) continue;
      const next: ListTasksResponse = {
        ...old,
        items: old.items.map((t) => updateFn(t)),
      };
      qc.setQueryData(queryKey, next);
    }
  }

  const create = useMutation({
    mutationFn: (payload: Partial<Task>) => createTask(payload),
    onSuccess: (createdTask) => {
      // Optimistically update all task lists (including the priority board)
      const queries = qc.getQueriesData<ListTasksResponse>({ queryKey: ['tasks'] });
      for (const [queryKey, old] of queries) {
        const params = Array.isArray(queryKey) ? (queryKey[1] as any) : undefined;

        // Only inject into caches where filters would include this task
        const statusMatches = !params?.status || params.status === createdTask.status;
        const priorityMatches = !params?.priority || params.priority === createdTask.priority;
        if (!statusMatches || !priorityMatches) continue;

        const limit = old?.limit || 0;
        const newItems = [createdTask, ...(old?.items || [])];
        const slicedItems = limit ? newItems.slice(0, limit) : newItems;
        const next: ListTasksResponse = {
          items: slicedItems,
          total: (old?.total ?? slicedItems.length) + (limit && newItems.length > slicedItems.length ? 0 : 0),
          page: old?.page ?? 1,
          limit: old?.limit ?? slicedItems.length,
          totalPages: old?.totalPages ?? 1,
        };
        qc.setQueryData(queryKey, next);
      }

      // Still invalidate to stay consistent with server sorting/pagination
      invalidate();
    },
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Task> }) => updateTask(id, payload),
    onMutate: async ({ id, payload }) => {
      // Optimistically apply updates across lists
      updateAllTaskLists((t) => (t._id === id ? { ...t, ...payload, updatedAt: new Date().toISOString() } : t));
    },
    onSuccess: () => {
      invalidate();
      qc.invalidateQueries({ queryKey: ['task'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: invalidate,
  });

  const setStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Task['status'] }) => updateTaskStatus(id, status),
    onMutate: async ({ id, status }) => {
      // Optimistically update status across lists
      updateAllTaskLists((t) => (t._id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t));
    },
    onSuccess: invalidate,
  });

  return { create, update, remove, setStatus };
}



