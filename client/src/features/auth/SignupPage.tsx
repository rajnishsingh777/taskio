import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from './hooks';

export default function SignupPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useSignup();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await mutateAsync({ name, email, password });
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            {error && (
              <div className="alert alert-error">
                <span>{(error as any)?.response?.data?.message || 'Signup failed'}</span>
              </div>
            )}
            <button className="btn btn-primary w-full" disabled={isPending}>
              {isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="text-sm mt-2">
            Have an account? <Link className="link" to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}



