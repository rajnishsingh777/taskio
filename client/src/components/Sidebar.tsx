import { Link, useLocation } from 'react-router-dom';

function NavItem({ to, label, icon }: { to: string; label: string; icon?: React.ReactNode }) {
  const { pathname } = useLocation();
  const active = pathname === to || (to !== '/' && pathname.startsWith(to));
  return (
    <Link to={to} className={`btn btn-ghost justify-start rounded-lg transition ${active ? 'bg-base-200' : 'hover:bg-base-200'}`}>
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex items-start p-3 border-r bg-base-100">
      <Link to="/" className="px-2 py-3 text-xl font-semibold">Taskio</Link>
    </aside>
  );
}


