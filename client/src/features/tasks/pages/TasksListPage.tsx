// import { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '@/contexts/ToastContext';
// import { useTaskMutations, useTasks } from '@/features/tasks/hooks';
// import TaskCard from '@/features/tasks/components/TaskCard';
// import TaskForm from '@/features/tasks/components/TaskForm';

// export default function TasksListPage() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const [title, setTitle] = useState('');
//   const [status, setStatus] = useState<string>('');
//   const [priority, setPriority] = useState<string>('');
//   const params = useMemo(
//     () => ({
//       page,
//       limit: 5,
//       title: title || undefined,
//       status: status || undefined,
//       priority: priority || undefined,
//     }),
//     [page, title, status, priority]
//   );

//   const { data, isLoading, error } = useTasks(params);
//   const { create, update, remove, setStatus: setTaskStatus } = useTaskMutations();
//   const { show } = useToast();

//   useEffect(() => {
//     const status = (error as any)?.response?.status;
//     if (status === 401) {
//       navigate('/login');
//     }
//   }, [error, navigate]);

//   const [editingTask, setEditingTask] = useState<any | null>(null);

//   async function handleCreate(payload: any) {
//     await create.mutateAsync(payload);
//     show('Task created', 'success');
//     (document.getElementById('create_task_modal') as HTMLDialogElement)?.close();
//   }

//   async function handleUpdate(payload: any) {
//     await update.mutateAsync({ id: editingTask._id, payload });
//     setEditingTask(null);
//     show('Task updated', 'success');
//     (document.getElementById('edit_task_modal') as HTMLDialogElement)?.close();
//   }

//   async function handleDelete(id: string) {
//     const ok = confirm('Delete task?');
//     if (!ok) return;
//     await remove.mutateAsync(id);
//     show('Task deleted', 'success');
//   }

//   async function handleToggleStatus(id: string) {
//     const t = data?.items.find((x) => x._id === id);
//     if (!t) return;
//     const next =
//       t.status === 'pending'
//         ? 'in-progress'
//         : t.status === 'in-progress'
//         ? 'completed'
//         : 'pending';
//     await setTaskStatus.mutateAsync({ id, status: next });
//     show('Status updated', 'success');
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Page header */}
//       <div className="flex items-center justify-between mb-6 gap-2">
//         <h1 className="text-3xl font-bold">My Tasks</h1>
//         <button
//           className="btn btn-primary rounded-lg transition hover:brightness-95"
//           onClick={() =>
//             (document.getElementById('create_task_modal') as HTMLDialogElement).showModal()
//           }
//         >
//           New Task
//         </button>
//       </div>

//       {/* Sticky Filters */}
//       <div className="sticky top-0 bg-base-100 z-10 p-4 mb-4 rounded-lg shadow-md flex flex-wrap gap-3">
//         <input
//           className="input input-bordered rounded-lg flex-1 min-w-[150px]"
//           placeholder="Search title"
//           value={title}
//           onChange={(e) => {
//             setTitle(e.target.value);
//             setPage(1);
//           }}
//         />
//         <select
//           className="select select-bordered rounded-lg flex-1 min-w-[150px]"
//           value={status}
//           onChange={(e) => {
//             setStatus(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="">All statuses</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//         <select
//           className="select select-bordered rounded-lg flex-1 min-w-[150px]"
//           value={priority}
//           onChange={(e) => {
//             setPriority(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="">All priorities</option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       {/* Modern Progress Bar with counts */}
//       {data && data.items.length > 0 && (() => {
//         const total = data.items.length;
//         const pending = data.items.filter((t) => t.status === 'pending').length;
//         const inProgress = data.items.filter((t) => t.status === 'in-progress').length;
//         const completed = data.items.filter((t) => t.status === 'completed').length;
//         const completedPercent = Math.round((completed / total) * 100);

//         return (
//           <div className="mb-6">
//             {/* Task counts */}
//             <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
//               <span>Pending: {pending}</span>
//               <span>In Progress: {inProgress}</span>
//               <span>Completed: {completed}</span>
//             </div>

//             {/* Progress bar */}
//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//               <div
//                 className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
//                 style={{ width: `${completedPercent}%` }}
//               ></div>
//             </div>
//           </div>
//         );
//       })()}

//       {/* Task List */}
//       {isLoading && (
//         <div className="grid gap-3">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <div key={i} className="skeleton h-24 w-full" />
//           ))}
//         </div>
//       )}
//       {!isLoading && (
//         <div className="grid gap-4">
//           {error && (
//             <div className="alert alert-error">
//               <span>{(error as any)?.response?.data?.message || 'Failed to load tasks'}</span>
//             </div>
//           )}
//           {data?.items.map((t) => (
//             <TaskCard
//               key={t._id}
//               task={t}
//               onEdit={(task) => {
//                 setEditingTask(task);
//                 (document.getElementById('edit_task_modal') as HTMLDialogElement).showModal();
//               }}
//               onDelete={handleDelete}
//               onToggleStatus={handleToggleStatus}
//             />
//           ))}
//           {data && data.totalPages > 1 && (
//             <div className="join">
//               <button className="btn join-item" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
//                 Prev
//               </button>
//               <button className="btn join-item" disabled>
//                 {page} / {data.totalPages}
//               </button>
//               <button className="btn join-item" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Create Task Modal */}
//       <dialog id="create_task_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-3">New Task</h3>
//           <TaskForm onSubmit={handleCreate} submitLabel="Create" />
//           <div className="modal-action">
//             <form method="dialog">
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>

//       {/* Edit Task Modal */}
//       <dialog id="edit_task_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-3">Edit Task</h3>
//           {editingTask && <TaskForm initial={editingTask} onSubmit={handleUpdate} submitLabel="Update" />}
//           <div className="modal-action">
//             <form method="dialog">
//               <button className="btn" onClick={() => setEditingTask(null)}>
//                 Close
//               </button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }
// import { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '@/contexts/ToastContext';
// import { useTaskMutations, useTasks } from '@/features/tasks/hooks';
// import TaskCard from '@/features/tasks/components/TaskCard';
// import TaskForm from '@/features/tasks/components/TaskForm';

// export default function TasksListPage() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const [title, setTitle] = useState('');
//   const [status, setStatus] = useState<string>('');
//   const [priority, setPriority] = useState<string>('');
//   const params = useMemo(
//     () => ({
//       page,
//       limit: 6, // show more cards per page
//       title: title || undefined,
//       status: status || undefined,
//       priority: priority || undefined,
//     }),
//     [page, title, status, priority]
//   );

//   const { data, isLoading, error } = useTasks(params);
//   const { create, update, remove, setStatus: setTaskStatus } = useTaskMutations();
//   const { show } = useToast();

//   useEffect(() => {
//     const status = (error as any)?.response?.status;
//     if (status === 401) {
//       navigate('/login');
//     }
//   }, [error, navigate]);

//   const [editingTask, setEditingTask] = useState<any | null>(null);

//   async function handleCreate(payload: any) {
//     await create.mutateAsync(payload);
//     show('Task created', 'success');
//     (document.getElementById('create_task_modal') as HTMLDialogElement)?.close();
//   }

//   async function handleUpdate(payload: any) {
//     await update.mutateAsync({ id: editingTask._id, payload });
//     setEditingTask(null);
//     show('Task updated', 'success');
//     (document.getElementById('edit_task_modal') as HTMLDialogElement)?.close();
//   }

//   async function handleDelete(id: string) {
//     const ok = confirm('Delete task?');
//     if (!ok) return;
//     await remove.mutateAsync(id);
//     show('Task deleted', 'success');
//   }

//   async function handleToggleStatus(id: string) {
//     const t = data?.items.find((x) => x._id === id);
//     if (!t) return;
//     const next =
//       t.status === 'pending'
//         ? 'in-progress'
//         : t.status === 'in-progress'
//         ? 'completed'
//         : 'pending';
//     await setTaskStatus.mutateAsync({ id, status: next });
//     show('Status updated', 'success');
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Page header */}
//       <div className="flex items-center justify-between mb-6 gap-2">
//         <h1 className="text-3xl font-bold">My Tasks</h1>
//         <button
//           className="btn btn-primary rounded-lg transition hover:brightness-95"
//           onClick={() =>
//             (document.getElementById('create_task_modal') as HTMLDialogElement).showModal()
//           }
//         >
//           New Task
//         </button>
//       </div>

//       {/* Sticky Filters */}
//       <div className="sticky top-0 bg-base-100 z-10 p-4 mb-4 rounded-lg shadow-md flex flex-wrap gap-3">
//         <input
//           className="input input-bordered rounded-lg flex-1 min-w-[150px]"
//           placeholder="Search title"
//           value={title}
//           onChange={(e) => {
//             setTitle(e.target.value);
//             setPage(1);
//           }}
//         />
//         <select
//           className="select select-bordered rounded-lg flex-1 min-w-[150px]"
//           value={status}
//           onChange={(e) => {
//             setStatus(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="">All statuses</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//         <select
//           className="select select-bordered rounded-lg flex-1 min-w-[150px]"
//           value={priority}
//           onChange={(e) => {
//             setPriority(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="">All priorities</option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       {/* Modern Progress Bar with counts */}
//       {data && data.items.length > 0 && (() => {
//         const total = data.items.length;
//         const pending = data.items.filter((t) => t.status === 'pending').length;
//         const inProgress = data.items.filter((t) => t.status === 'in-progress').length;
//         const completed = data.items.filter((t) => t.status === 'completed').length;
//         const completedPercent = Math.round((completed / total) * 100);

//         return (
//           <div className="mb-6">
//             {/* Task counts */}
//             <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
//               <span className="font-semibold">Pending: {pending}</span>
//               <span className="font-semibold">In Progress: {inProgress}</span>
//               <span className="font-semibold">Completed: {completed}</span>
//             </div>

//             {/* Progress bar */}
//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//               <div
//                 className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
//                 style={{ width: `${completedPercent}%` }}
//               ></div>
//             </div>
//           </div>
//         );
//       })()}

//       {/* Task List */}
//       {isLoading && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="skeleton h-32 w-full rounded-xl" />
//           ))}
//         </div>
//       )}
//       {!isLoading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {error && (
//             <div className="alert alert-error col-span-full">
//               <span>{(error as any)?.response?.data?.message || 'Failed to load tasks'}</span>
//             </div>
//           )}
//           {data?.items.map((t) => (
//             <TaskCard
//               key={t._id}
//               task={t}
//               onEdit={(task) => {
//                 setEditingTask(task);
//                 (document.getElementById('edit_task_modal') as HTMLDialogElement).showModal();
//               }}
//               onDelete={handleDelete}
//               onToggleStatus={handleToggleStatus}
//             />
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {data && data.totalPages > 1 && (
//         <div className="join flex justify-center mt-6">
//           <button
//             className="btn join-item"
//             disabled={page <= 1}
//             onClick={() => setPage((p) => p - 1)}
//           >
//             Prev
//           </button>
//           <button className="btn join-item" disabled>
//             {page} / {data.totalPages}
//           </button>
//           <button
//             className="btn join-item"
//             disabled={page >= data.totalPages}
//             onClick={() => setPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Create Task Modal */}
//       <dialog id="create_task_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-3">New Task</h3>
//           <TaskForm onSubmit={handleCreate} submitLabel="Create" />
//           <div className="modal-action">
//             <form method="dialog">
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>

//       {/* Edit Task Modal */}
//       <dialog id="edit_task_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-3">Edit Task</h3>
//           {editingTask && (
//             <TaskForm initial={editingTask} onSubmit={handleUpdate} submitLabel="Update" />
//           )}
//           <div className="modal-action">
//             <form method="dialog">
//               <button className="btn" onClick={() => setEditingTask(null)}>
//                 Close
//               </button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }
// import { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '@/contexts/ToastContext';
// import { useTaskMutations, useTasks } from '@/features/tasks/hooks';
// import TaskCard from '@/features/tasks/components/TaskCard';
// import TaskForm from '@/features/tasks/components/TaskForm';

// export default function TasksListPage() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const [title, setTitle] = useState('');
//   const [status, setStatus] = useState<string>('');
//   const [priority, setPriority] = useState<string>('');
//   const params = useMemo(
//     () => ({
//       page,
//       limit: 6, // show more cards per page
//       title: title || undefined,
//       status: status || undefined,
//       priority: priority || undefined,
//     }),
//     [page, title, status, priority]
//   );

//   const { data, isLoading, error } = useTasks(params);
//   const { create, update, remove, setStatus: setTaskStatus } = useTaskMutations();
//   const { show } = useToast();

//   useEffect(() => {
//     const status = (error as any)?.response?.status;
//     if (status === 401) {
//       navigate('/login');
//     }
//   }, [error, navigate]);

//   const [editingTask, setEditingTask] = useState<any | null>(null);

//   async function handleCreate(payload: any) {
//     await create.mutateAsync(payload);
//     show('Task created', 'success');
//     (document.getElementById('create_task_modal') as HTMLDialogElement)?.close();
//   }

//   async function handleUpdate(payload: any) {
//     await update.mutateAsync({ id: editingTask._id, payload });
//     setEditingTask(null);
//     show('Task updated', 'success');
//     (document.getElementById('edit_task_modal') as HTMLDialogElement)?.close();
//   }

//   async function handleDelete(id: string) {
//     const ok = confirm('Delete task?');
//     if (!ok) return;
//     await remove.mutateAsync(id);
//     show('Task deleted', 'success');
//   }

//   async function handleToggleStatus(id: string) {
//     const t = data?.items.find((x) => x._id === id);
//     if (!t) return;
//     const next =
//       t.status === 'pending'
//         ? 'in-progress'
//         : t.status === 'in-progress'
//         ? 'completed'
//         : 'pending';
//     await setTaskStatus.mutateAsync({ id, status: next });
//     show('Status updated', 'success');
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Page header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
//         <h1 className="text-3xl font-bold">My Tasks</h1>
//         <button
//           className="btn btn-primary rounded-lg px-3 py-1 text-sm transition hover:brightness-95"
//           onClick={() =>
//             (document.getElementById('create_task_modal') as HTMLDialogElement).showModal()
//           }
//         >
//           New Task
//         </button>
//       </div>

//       {/* Compact Filters */}
//       <div className="sticky top-0 bg-base-100 z-10 p-2 mb-3 rounded-lg shadow-sm flex flex-wrap gap-2">
//         <input
//           className="input input-bordered input-sm rounded-md flex-1 min-w-[140px]"
//           placeholder="Search title"
//           value={title}
//           onChange={(e) => {
//             setTitle(e.target.value);
//             setPage(1);
//           }}
//         />
//         <select
//           className="select select-bordered select-sm rounded-md flex-1 min-w-[140px]"
//           value={status}
//           onChange={(e) => {
//             setStatus(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="">All statuses</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//         <select
//           className="select select-bordered select-sm rounded-md flex-1 min-w-[140px]"
//           value={priority}
//           onChange={(e) => {
//             setPriority(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="">All priorities</option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       {/* Smaller Progress Bar with counts */}
//       {data && data.items.length > 0 && (() => {
//         const total = data.items.length;
//         const pending = data.items.filter((t) => t.status === 'pending').length;
//         const inProgress = data.items.filter((t) => t.status === 'in-progress').length;
//         const completed = data.items.filter((t) => t.status === 'completed').length;
//         const completedPercent = Math.round((completed / total) * 100);

//         return (
//           <div className="mb-4">
//             <div className="flex justify-between mb-1 text-xs font-medium text-gray-600">
//               <span>Pending: {pending}</span>
//               <span>In Progress: {inProgress}</span>
//               <span>Completed: {completed}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//               <div
//                 className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
//                 style={{ width: `${completedPercent}%` }}
//               ></div>
//             </div>
//           </div>
//         );
//       })()}

//       {/* Task List */}
//       {isLoading && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="skeleton h-32 w-full rounded-xl" />
//           ))}
//         </div>
//       )}
//       {!isLoading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {error && (
//             <div className="alert alert-error col-span-full">
//               <span>{(error as any)?.response?.data?.message || 'Failed to load tasks'}</span>
//             </div>
//           )}
//           {data?.items.map((t) => (
//             <TaskCard
//               key={t._id}
//               task={t}
//               onEdit={(task) => {
//                 setEditingTask(task);
//                 (document.getElementById('edit_task_modal') as HTMLDialogElement).showModal();
//               }}
//               onDelete={handleDelete}
//               onToggleStatus={handleToggleStatus}
//             />
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {data && data.totalPages > 1 && (
//         <div className="join flex justify-center mt-6">
//           <button
//             className="btn join-item"
//             disabled={page <= 1}
//             onClick={() => setPage((p) => p - 1)}
//           >
//             Prev
//           </button>
//           <button className="btn join-item" disabled>
//             {page} / {data.totalPages}
//           </button>
//           <button
//             className="btn join-item"
//             disabled={page >= data.totalPages}
//             onClick={() => setPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Create Task Modal */}
//       <dialog id="create_task_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-3">New Task</h3>
//           <TaskForm onSubmit={handleCreate} submitLabel="Create" />
//           <div className="modal-action">
//             <form method="dialog">
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>

//       {/* Edit Task Modal */}
//       <dialog id="edit_task_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-3">Edit Task</h3>
//           {editingTask && (
//             <TaskForm initial={editingTask} onSubmit={handleUpdate} submitLabel="Update" />
//           )}
//           <div className="modal-action">
//             <form method="dialog">
//               <button className="btn" onClick={() => setEditingTask(null)}>
//                 Close
//               </button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { useTaskMutations, useTasks } from '@/features/tasks/hooks';
import TaskCard from '@/features/tasks/components/TaskCard';
import TaskForm from '@/features/tasks/components/TaskForm';
import type { Task } from '@/features/tasks/api';

export default function TasksListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  const params = useMemo(
    () => ({
      page,
      limit: 6,
      title: title || undefined,
      status: status || undefined,
      priority: priority || undefined,
    }),
    [page, title, status, priority]
  );

  const { data, isLoading, error } = useTasks(params);
  const { create, update, remove, setStatus: setTaskStatus } = useTaskMutations();
  const { show } = useToast();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const statusCode = (error as any)?.response?.status;
    if (statusCode === 401) navigate('/login');
  }, [error, navigate]);

  const handleCreate = async (payload: Partial<Task>) => {
    await create.mutateAsync(payload);
    show('Task created', 'success');
    (document.getElementById('create_task_modal') as HTMLDialogElement)?.close();
  };

  const handleUpdate = async (payload: Partial<Task>) => {
    if (!editingTask) return;
    await update.mutateAsync({ id: editingTask._id, payload });
    setEditingTask(null);
    show('Task updated', 'success');
    (document.getElementById('edit_task_modal') as HTMLDialogElement)?.close();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete task?')) return;
    await remove.mutateAsync(id);
    show('Task deleted', 'success');
  };

  const handleToggleStatus = async (id: string) => {
    const t = data?.items.find((x) => x._id === id);
    if (!t) return;
    const nextStatus =
      t.status === 'pending'
        ? 'in-progress'
        : t.status === 'in-progress'
        ? 'completed'
        : 'pending';
    await setTaskStatus.mutateAsync({ id, status: nextStatus });
    show('Status updated', 'success');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header + New Task */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <button
          className="btn btn-primary rounded-lg px-3 py-1 text-sm"
          onClick={() =>
            (document.getElementById('create_task_modal') as HTMLDialogElement).showModal()
          }
        >
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-base-100 z-10 p-2 mb-3 rounded-lg shadow-sm flex flex-wrap gap-2">
        <input
          className="input input-bordered input-sm rounded-md flex-1 min-w-[140px]"
          placeholder="Search title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="select select-bordered select-sm rounded-md flex-1 min-w-[140px]"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className="select select-bordered select-sm rounded-md flex-1 min-w-[140px]"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-32 w-full rounded-xl" />
          ))}
        {error && (
          <div className="alert alert-error col-span-full">
            {(error as any)?.response?.data?.message || 'Failed to load tasks'}
          </div>
        )}
        {data?.items.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={(t) => {
              setEditingTask(t);
              (document.getElementById('edit_task_modal') as HTMLDialogElement).showModal();
            }}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {/* Modals */}
      <dialog id="create_task_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">New Task</h3>
          <TaskForm onSubmit={handleCreate} submitLabel="Create" />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="edit_task_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Edit Task</h3>
          {editingTask && (
            <TaskForm initial={editingTask} onSubmit={handleUpdate} submitLabel="Update" />
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setEditingTask(null)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
