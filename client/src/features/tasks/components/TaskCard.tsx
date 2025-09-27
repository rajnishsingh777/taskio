// import { Link } from 'react-router-dom';
// import type { Task } from '@/features/tasks/api';

// type Props = {
//   task: Task;
//   onEdit: (task: Task) => void;
//   onDelete: (id: string) => void;
//   onToggleStatus: (id: string) => void;
// };

// const priorityColor: Record<Task['priority'], string> = {
//   high: 'badge-error',
//   medium: 'badge-warning',
//   low: 'badge-success',
// };

// export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }: Props) {
//   const isOverdue = task.dueDate ? new Date(task.dueDate) < new Date() && task.status !== 'completed' : false;
//   return (
//     <div className={`card bg-base-100 shadow transition hover:shadow-lg hover:-translate-y-0.5 ${isOverdue ? 'border border-error' : 'border border-base-200'}`}>
//       <div className="card-body gap-3">
//         <div className="flex items-center justify-between">
//           <h3 className="card-title text-lg">
//             <Link className="link" to={`/tasks/${task._id}`}>{task.title}</Link>
//           </h3>
//           <div className="flex gap-2 items-center">
//             {isOverdue && <div className="badge badge-error">Overdue</div>}
//             <div className={`badge ${priorityColor[task.priority]}`}>{task.priority}</div>
//           </div>
//         </div>
//         {task.description && <p className="text-sm opacity-80 leading-relaxed">{task.description}</p>}
//         <div className="flex flex-wrap gap-2 items-center justify-between">
//           <div className="text-xs opacity-70">
//             <span className="mr-2">Status: {task.status}</span>
//             {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
//           </div>
//           <div className="card-actions">
//             <button className="btn btn-ghost btn-sm hover:bg-base-200" onClick={() => onEdit(task)}>Edit</button>
//             <button className="btn btn-ghost btn-sm hover:bg-base-200" onClick={() => onToggleStatus(task._id)}>
//               {task.status === 'completed' ? 'Mark Pending' : 'Toggle Status'}
//             </button>
//             <button className="btn btn-error btn-sm hover:brightness-95" onClick={() => onDelete(task._id)}>Delete</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { Link } from 'react-router-dom';
// import type { Task } from '@/features/tasks/api';

// type Props = {
//   task: Task;
//   onEdit: (task: Task) => void;
//   onDelete: (id: string) => void;
//   onToggleStatus: (id: string) => void;
// };

// const priorityColor: Record<Task['priority'], string> = {
//   high: 'badge-error',
//   medium: 'badge-warning',
//   low: 'badge-success',
// };

// export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }: Props) {
//   const isOverdue =
//     task.dueDate ? new Date(task.dueDate) < new Date() && task.status !== 'completed' : false;

//   return (
//     <div
//       className={`card bg-base-100 shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-y-1 `}
//     >
//       <div className="card-body gap-3 font-sans text-base-content">
//         {/* Title + Badges */}
//         <div className="flex items-start justify-between">
//           <h3 className="card-title text-lg font-semibold tracking-tight hover:text-primary transition-colors">
//             <Link to={`/tasks/${task._id}`}>{task.title}</Link>
//           </h3>
//           <div className="flex gap-2 items-center">
//             {isOverdue && <div className="badge badge-error badge-sm uppercase">Overdue</div>}
//             <div className={`badge ${priorityColor[task.priority]} badge-sm uppercase`}>
//               {task.priority}
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         {task.description && (
//           <p className="text-sm opacity-80 leading-relaxed">{task.description}</p>
//         )}

//         {/* Footer: status, due date, actions */}
//         <div className="flex flex-wrap gap-3 items-center justify-between mt-2 text-sm">
//           <div className="opacity-70 space-x-2">
//             <span className="italic">Status:</span>
//             <span className="capitalize font-medium">{task.status}</span>
//             {task.dueDate && (
//               <span className="ml-2">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
//             )}
//           </div>

//           <div className="card-actions flex gap-2">
//             <button
//               className="btn btn-ghost btn-xs hover:bg-base-200 transition-colors"
//               onClick={() => onEdit(task)}
//             >
//               ✏️ Edit
//             </button>
//             <button
//               className="btn btn-ghost btn-xs hover:bg-base-200 transition-colors"
//               onClick={() => onToggleStatus(task._id)}
//             >
//               {task.status === 'completed' ? '↩ Mark Pending' : '⟳ Toggle Status'}
//             </button>
//             <button
//               className="btn btn-error btn-xs hover:brightness-95 transition-colors"
//               onClick={() => onDelete(task._id)}
//             >
//               🗑 Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from 'react-router-dom';
import type { Task } from '@/features/tasks/api';

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

const priorityColor: Record<Task['priority'], string> = {
  high: 'bg-red-500 text-white',
  medium: 'bg-yellow-400 text-black',
  low: 'bg-green-500 text-white',
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
      {/* Header: Title + Priority */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold hover:text-primary transition-colors leading-snug">
          <Link to={`/tasks/${task._id}`}>{task.title}</Link>
        </h3>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{task.description}</p>
      )}

      {/* Footer: Status, Due Date, Actions */}
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 gap-2">
        <div className="space-x-2 mb-2 sm:mb-0">
          <span className="italic">Status:</span>
          <span className="capitalize font-medium">{task.status}</span>
          {task.dueDate && (
            <span className="ml-2">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          )}
        </div>

        <div className="flex gap-4">
          <button
            className="text-grey-700 hover:underline text-xs"
            onClick={() => onEdit(task)}
          >
            ✏️ Edit
          </button>
          <button
            className="text-gray-700 hover:underline text-xs"
            onClick={() => onToggleStatus(task._id)}
          >
            {task.status === 'completed' ? '↩ Pending' : '⟳ Toggle'}
          </button>
          <button
            className="text-red-500 hover:underline text-xs"
            onClick={() => onDelete(task._id)}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
