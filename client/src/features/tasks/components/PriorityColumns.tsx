import { useMemo, useState } from 'react';
import { useTaskMutations, useTasks } from '@/features/tasks/hooks';
import type { Task } from '@/features/tasks/api';
import TaskCard from './TaskCard';

const PRIORITIES: Task['priority'][] = ['high', 'medium', 'low'];

export default function PriorityColumns() {
  const [page] = useState(1);
  const params = useMemo(() => ({ page, limit: 100 }), [page]);
  const { data } = useTasks(params);
  const { update } = useTaskMutations();

  function onDragStart(e: React.DragEvent, taskId: string) {
    e.dataTransfer.setData('text/plain', taskId);
  }

  function onDragOver(e: React.DragEvent) { e.preventDefault(); }

  async function onDrop(e: React.DragEvent, priority: Task['priority']) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    await update.mutateAsync({ id, payload: { priority } });
  }

  function renderColumn(priority: Task['priority']) {
    const items = (data?.items || []).filter((t) => t.priority === priority);
    const title = priority.charAt(0).toUpperCase() + priority.slice(1);
    const color = priority === 'high' ? 'border-error' : priority === 'medium' ? 'border-warning' : 'border-success';
    return (
      <div key={priority} className={`rounded-lg border ${color} p-3 min-h-[300px] bg-base-100`} onDragOver={onDragOver} onDrop={(e) => onDrop(e, priority)}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{title}</h3>
          <div className={`badge ${color.replace('border','badge')}`}>{items.length}</div>
        </div>
        <div className="grid gap-2">
          {items.map((task) => (
            <div key={task._id} draggable onDragStart={(e) => onDragStart(e, task._id)}>
              <TaskCard
                task={task}
                onEdit={() => {}}
                onDelete={() => {}}
                onToggleStatus={() => {}}
              />
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-sm opacity-60 text-center py-6">Drop tasks here</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {PRIORITIES.map(renderColumn)}
    </div>
  );
}


