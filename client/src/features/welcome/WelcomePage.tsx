import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

export default function WelcomePage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Header */}
          <header className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-bold text-emerald-700">Taskio</h1>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost btn-sm"
                aria-label="Toggle theme"
                onClick={toggle}
              >
                {theme === 'dark' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </header>

          {/* Hero Section */}
          <main className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Organize your work and life, simply.
              </h2>
              <p className="text-lg opacity-80 mb-8">
                A clean, personal task manager with priorities, progress tracking, and a delightful
                UI.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg rounded-lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg rounded-lg">
                  I already have an account
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl overflow-hidden border border-base-300 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1550592704-6c76defa9985?q=80&w=1400&auto=format&fit=crop"
                  alt="Organize tasks beautifully"
                  className="w-full h-[360px] object-cover"
                />
              </div>
            </div>
          </main>

          {/* Why Choose Section */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Why choose Taskio?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                  <div className="text-3xl">⚡</div>
                  <h4 className="card-title">Fast & Simple</h4>
                  <p className="opacity-80">
                    Zero clutter. Add, update, and complete tasks in seconds with a smooth UI.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                  <div className="text-3xl">✅</div>
                  <h4 className="card-title">Stay on Track</h4>
                  <p className="opacity-80">
                    Priorities and progress tracking keep you focused on what matters.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                  <div className="text-3xl">🌙</div>
                  <h4 className="card-title">Light/Dark Theme</h4>
                  <p className="opacity-80">
                    Green-on-black dark mode for night owls, crisp light mode for daytime.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-base-300 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80">
          <p>© {new Date().getFullYear()} Taskio. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link to="/about" className="hover:opacity-100 transition-opacity">
              About
            </Link>
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy
            </Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">
              Contact
            </Link>
            <a
              href="https://github.com/your-repo/taskio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
