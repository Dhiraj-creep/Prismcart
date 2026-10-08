import React from 'react';
import { LucideIcon, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageOpen,
  title,
  description,
  actionText,
  actionHref,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs max-w-lg mx-auto my-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-6 max-w-sm">{description}</p>

      {actionText && actionHref && (
        <Link
          to={actionHref}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-violet-700 text-white hover:bg-violet-800 transition-all shadow-sm hover:shadow"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionHref && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-violet-700 text-white hover:bg-violet-800 transition-all shadow-sm hover:shadow cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
