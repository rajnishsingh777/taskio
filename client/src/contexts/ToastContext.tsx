import React, { createContext, useContext, useMemo, useState } from 'react';

type Toast = { id: string; message: string; type?: 'info' | 'success' | 'error' | 'warning' };

type ToastContextValue = {
  toasts: Toast[];
  show: (message: string, type?: Toast['type']) => void;
  remove: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo<ToastContextValue>(() => ({
    toasts,
    show: (message, type = 'info') => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    remove: (id) => setToasts((prev) => prev.filter((t) => t.id !== id)),
  }), [toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast toast-end">
        {toasts.map((t) => (
          <div key={t.id} className={`alert alert-${t.type || 'info'}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}



