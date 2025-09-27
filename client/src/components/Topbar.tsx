import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

export default function Topbar() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="flex-1 px-2">
        <Link to="/" className="btn btn-ghost text-xl">Taskio</Link>
      </div>
      <div className="flex-none gap-2 pr-2">
        <button className="btn btn-ghost btn-sm" aria-label="Toggle theme" onClick={toggle}>
          {theme === 'dark' ? (
            // Sun icon (outline)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            // Moon icon (outline)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span>{(user.name || user.email || 'U').slice(0,1).toUpperCase()}</span>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <Link className="btn btn-ghost btn-sm" to="/login">Login</Link>
            <Link className="btn btn-primary btn-sm" to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}



