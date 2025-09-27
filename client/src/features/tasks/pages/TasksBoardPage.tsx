import PriorityColumns from '@/features/tasks/components/PriorityColumns';

export default function TasksBoardPage() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Priority Board</h1>
      </div>
      <PriorityColumns />
    </div>
  );
}



