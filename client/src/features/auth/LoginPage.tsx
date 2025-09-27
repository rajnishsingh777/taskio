import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from './hooks';

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await mutateAsync({ email, password });
    navigate('/tasks');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div className="alert alert-error">
                <span>{(error as any)?.response?.data?.message || 'Login failed'}</span>
              </div>
            )}
            <button className="btn btn-primary w-full" disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-sm mt-2">
            No account? <Link className="link" to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}



