import { Link, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '@/features/auth/LoginPage';
import SignupPage from '@/features/auth/SignupPage';
import TasksListPage from '@/features/tasks/pages/TasksListPage';
import TaskDetailPage from '@/features/tasks/pages/TaskDetailPage';
import TasksBoardPage from '@/features/tasks/pages/TasksBoardPage';
import Layout from '@/components/Layout';
import WelcomePage from '@/features/welcome/WelcomePage';

function Home() {
  return (
    <div className="min-h-screen p-6">
      <div className="navbar bg-base-100 rounded-box shadow">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">Taskio</Link>
        </div>
        <div className="flex-none gap-2">
          <Link className="btn" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p>Frontend scaffold is ready. Implement auth and tasks next.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route element={<Layout />}>
        <Route path="/tasks" element={<TasksListPage />} />
        <Route path="/tasks/board" element={<TasksBoardPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


