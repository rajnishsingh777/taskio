import { useState } from 'react';
import type { Task } from '@/features/tasks/api';

type Props = {
  initial?: Partial<Task>;
  onSubmit: (payload: Partial<Task>) => Promise<void> | void;
  submitLabel?: string;
};

export default function TaskForm({ initial, onSubmit, submitLabel = 'Save' }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial!.dueDate.slice(0, 10) : '');
  const [priority, setPriority] = useState<Task['priority']>(initial?.priority ?? 'medium');
  const [status, setStatus] = useState<Task['status']>(initial?.status ?? 'pending');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({ title, description, dueDate: dueDate ? new Date(dueDate).toISOString() : undefined, priority, status });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input className="input input-bordered rounded-lg" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className="textarea textarea-bordered rounded-lg" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <input type="date" className="input input-bordered rounded-lg" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <select className="select select-bordered rounded-lg" value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <select className="select select-bordered rounded-lg" value={status} onChange={(e) => setStatus(e.target.value as Task['status'])}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button className="btn btn-primary rounded-lg transition hover:brightness-95" type="submit">{submitLabel}</button>
    </form>
  );
}



