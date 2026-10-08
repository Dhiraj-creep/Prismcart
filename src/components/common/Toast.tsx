import React from 'react';
import { useToast, ToastMessage } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />,
    error: <AlertCircle size={18} className="text-rose-500 shrink-0" />,
    warning: <AlertTriangle size={18} className="text-amber-500 shrink-0" />,
    info: <Info size={18} className="text-blue-500 shrink-0" />,
  };

  const borderStyles = {
    success: 'border-emerald-200 bg-white shadow-emerald-900/5',
    error: 'border-rose-200 bg-white shadow-rose-900/5',
    warning: 'border-amber-200 bg-white shadow-amber-900/5',
    info: 'border-blue-200 bg-white shadow-blue-900/5',
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 max-w-md w-full ${borderStyles[toast.type]}`}
    >
      {icons[toast.type]}
      <p className="text-sm font-medium text-slate-800 flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Close notification"
        className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 rounded-md"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100%-2.5rem)] pointer-events-none"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={removeToast} />
        </div>
      ))}
    </div>
  );
};
