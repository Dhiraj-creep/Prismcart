import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-slate-500">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-violet-700 transition-colors"
          >
            <Home size={14} className="text-slate-400" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <ChevronRight size={14} className="text-slate-400 mx-1 shrink-0" />
              {isLast || !item.href ? (
                <span
                  className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-violet-700 transition-colors truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
