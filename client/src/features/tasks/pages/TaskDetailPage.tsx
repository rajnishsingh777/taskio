import { useParams, Link } from 'react-router-dom';
import { useTask, useTaskMutations } from '@/features/tasks/hooks';
import { useToast } from '@/contexts/ToastContext';
import TaskForm from '@/features/tasks/components/TaskForm';
import { useState } from 'react';

export default function TaskDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useTask(id!);
  const { update, setStatus } = useTaskMutations();
  const { show } = useToast();
  const [editing, setEditing] = useState(false);

  if (isLoading) return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="skeleton h-8 w-64 mb-3" />
      <div className="skeleton h-32 w-full" />
    </div>
  );
  if (!data) return <div className="p-6">Task not found</div>;

  async function handleUpdate(payload: any) {
    await update.mutateAsync({ id: id!, payload });
    setEditing(false);
    show('Task updated', 'success');
  }

  async function handleToggleStatus() {
    if (!data) return;
    const next = data.status === 'pending' ? 'in-progress' : data.status === 'in-progress' ? 'completed' : 'pending';
    await setStatus.mutateAsync({ id: id!, status: next });
    show('Status updated', 'success');
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4"><Link className="link" to="/tasks">← Back to My Tasks</Link></div>

      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <div className="card-body gap-4">
          <div className="flex items-start justify-between gap-3">
            <h1 className="card-title text-2xl leading-tight">{data.title}</h1>
            <div className="flex flex-wrap gap-2">
              <div className={`badge badge-outline capitalize`}>{data.status}</div>
              <div className={`badge ${data.priority === 'high' ? 'badge-error' : data.priority === 'medium' ? 'badge-warning' : 'badge-success'} capitalize`}>{data.priority}</div>
            </div>
          </div>

          {data.description && (
            <p className="text-base opacity-90 leading-relaxed">{data.description}</p>
          )}

          <div className="divider my-0" />

          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>
              Edit Task
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleToggleStatus}>
              {data.status === 'completed' ? 'Mark Pending' : 'Toggle Status'}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {data.dueDate && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="opacity-80">
                  <path d="M7 2v2H5a2 2 0 00-2 2v1h18V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm14 7H3v11a2 2 0 002 2h14a2 2 0 002-2V9zm-2 9H5v-7h14v7z" />
                </svg>
                <div>
                  <div className="opacity-70">Due date</div>
                  <div className="font-medium">{new Date(data.dueDate).toLocaleString()}</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="opacity-80">
                <path d="M12 22a1 1 0 01-1-1v-6H7a1 1 0 110-2h4V7a1 1 0 112 0v6h4a1 1 0 110 2h-4v6a1 1 0 01-1 1z" />
              </svg>
              <div>
                <div className="opacity-70">Created</div>
                <div className="font-medium">{new Date(data.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="opacity-80">
                <path d="M12 22a1 1 0 01-1-1v-6H7a1 1 0 110-2h4V7a1 1 0 112 0v6h4a1 1 0 110 2h-4v6a1 1 0 01-1 1z" />
              </svg>
              <div>
                <div className="opacity-70">Last updated</div>
                <div className="font-medium">{new Date(data.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="edit_task_modal" className={`modal ${editing ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Edit Task</h3>
          <TaskForm initial={data} onSubmit={handleUpdate} submitLabel="Update" />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setEditing(false)}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}


