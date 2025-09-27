import { Outlet } from 'react-router-dom';
import Topbar from '@/components/Topbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}



