import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface ToastContextType {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: 'success' | 'error' | 'warning' | 'info', message: string, duration = 4000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((msg: string, dur?: number) => addToast('success', msg, dur), [addToast]);
  const error = useCallback((msg: string, dur?: number) => addToast('error', msg, dur || 5000), [addToast]);
  const warning = useCallback((msg: string, dur?: number) => addToast('warning', msg, dur), [addToast]);
  const info = useCallback((msg: string, dur?: number) => addToast('info', msg, dur), [addToast]);

  // Listen to custom window events from Axios interceptors
  useEffect(() => {
    const handleCustomToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: 'success' | 'error' | 'warning' | 'info'; message: string }>;
      if (customEvent.detail) {
        addToast(customEvent.detail.type || 'info', customEvent.detail.message);
      }
    };

    window.addEventListener('app:toast', handleCustomToast);
    return () => {
      window.removeEventListener('app:toast', handleCustomToast);
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, warning, info, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => {
          let borderStyle = 'border-yellow-500/50 bg-black/90 text-white';
          let icon = <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />;

          if (t.type === 'success') {
            borderStyle = 'border-emerald-500/60 bg-black/90 text-emerald-100';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />;
          } else if (t.type === 'error') {
            borderStyle = 'border-red-500/80 bg-black/95 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
            icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />;
          } else if (t.type === 'warning') {
            borderStyle = 'border-amber-500/60 bg-black/90 text-amber-100';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />;
          }

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${borderStyle}`}
            >
              {icon}
              <div className="flex-1 text-sm font-medium leading-relaxed">{t.message}</div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-neutral-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
