import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { DemoOrder } from '../types/order';
import { getStoredOrders } from '../utils/storage';
import { formatINR } from '../utils/currency';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();

  // Try reading order from router state or localStorage
  const order: DemoOrder | undefined =
    location.state?.order ||
    (getStoredOrders() as DemoOrder[]).find((o) => o.orderId === orderId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Order Confirmation' }]} />

      {/* Hero Confirmation Card */}
      <div className="text-center bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
          <CheckCircle2 size={36} />
        </div>

        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          Demo Order Successfully Placed
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Thank You for Testing PrismCart!
        </h1>

        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Your simulated demo order has been logged into browser storage. No real money was charged.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm font-bold text-slate-800">
          <span>Order ID:</span>
          <span className="text-violet-700">{orderId || 'PRISM-DEMO'}</span>
        </div>
      </div>

      {order && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Order Summary for {order.customerName}
              </h2>
              <p className="text-xs text-slate-500">
                Destination: {order.customerCity}, {order.customerState}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              Status: {order.status}
            </span>
          </div>

          {/* Ordered items */}
          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <ImageWithFallback
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {item.productName}
                    </h4>
                    <span className="text-xs text-slate-500">
                      Qty: {item.quantity} × {formatINR(item.price)}
                    </span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {formatINR(item.lineTotal)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-slate-200 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900">{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Coupon Discount:</span>
                <span>-{formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping:</span>
              <span>{order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total Paid (Simulated):</span>
              <span className="text-xl font-black text-violet-700">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Return Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/catalogue"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-md transition-all"
        >
          <ShoppingBag size={18} />
          <span>Browse More Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>You can reset all demo data anytime from the header or footer menu.</span>
      </div>
    </div>
  );
};
