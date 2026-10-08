import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ShoppingBag } from 'lucide-react';

interface NotFoundPageProps {
  customMessage?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ customMessage }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200 shadow-sm">
        <AlertCircle size={40} />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
          404 Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Page or Product Does Not Exist
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          {customMessage ||
            'The URL you requested may have been moved, removed, or is temporarily unavailable.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-colors"
        >
          <Home size={16} />
          <span>Return Home</span>
        </Link>
        <Link
          to="/catalogue"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-sm transition-colors"
        >
          <ShoppingBag size={16} />
          <span>Browse 60 Products</span>
        </Link>
      </div>
    </div>
  );
};
