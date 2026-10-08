import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { OrderSummaryCard } from '../components/cart/OrderSummaryCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { addStoredOrder } from '../utils/storage';
import { DemoOrder } from '../types/order';
import { api } from '../services/api';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface FormErrors {
  [key: string]: string;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, summary, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect back to cart
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-slate-600">Please add items to your cart before proceeding to demo checkout.</p>
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-700 text-white font-bold text-sm"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = '10-digit Indian phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.address.trim()) {
      errs.address = 'Street address is required';
    }

    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errs.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      errs.pincode = '6-digit PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'PIN code must be exactly 6 digits';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct the validation errors in the form.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        couponCode: summary.appliedCoupon?.code,
        items: items.map((i) => ({
          productSlug: i.product.slug,
          quantity: i.quantity,
        })),
      };

      const res = await api.submitOrder(orderPayload);
      const orderId = res.orderNumber;

      const demoOrder: DemoOrder = {
        orderId,
        createdAt: res.createdAt,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          productImage: i.product.image,
          price: i.product.price,
          quantity: i.quantity,
          lineTotal: i.product.price * i.quantity,
        })),
        subtotal: summary.subtotal,
        shipping: summary.shipping,
        discount: summary.discount,
        total: summary.total,
        customerName: formData.fullName.trim(),
        customerCity: formData.city.trim(),
        customerState: formData.state.trim(),
        status: 'Confirmed',
      };

      addStoredOrder(demoOrder);
      clearCart();
      showToast(`Order #${orderId} confirmed successfully!`, 'success');
      navigate(`/order-confirmation/${orderId}`, { state: { order: demoOrder } });
    } catch {
      showToast('Failed to place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Shopping Cart', href: '/cart' },
          { label: 'Demo Checkout' },
        ]}
      />

      {/* Prominent Demo Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5">
        <ShieldCheck size={22} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong className="font-bold block text-amber-950">
            Simulated College Presentation Demonstration
          </strong>
          “Demo checkout — no payment is collected and no order is transmitted.” No card numbers or banking credentials will ever be requested. Full address details are not stored permanently.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
            Shipping & Customer Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1 sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aditi Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.fullName
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-violet-500/20 focus:border-violet-600'
                  }`}
                />
                {errors.fullName && (
                  <span className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.fullName}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                >
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aditi@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.email
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-violet-500/20 focus:border-violet-600'
                  }`}
                />
                {errors.email && (
                  <span className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Indian Phone Number */}
              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                >
                  Mobile Number (India) <span className="text-rose-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold select-none">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className={`w-full px-3.5 py-2.5 rounded-r-xl border text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                      errors.phone
                        ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                        : 'border-slate-300 focus:ring-violet-500/20 focus:border-violet-600'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <span className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1 sm:col-span-2">
                <label
                  htmlFor="address"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                >
                  Delivery Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Flat / House No., Apartment, Street"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.address
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-violet-500/20 focus:border-violet-600'
                  }`}
                />
                {errors.address && (
                  <span className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.address}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="space-y-1">
                <label
                  htmlFor="city"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                >
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Bengaluru"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.city
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-violet-500/20 focus:border-violet-600'
                  }`}
                />
                {errors.city && (
                  <span className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.city}
                  </span>
                )}
              </div>

              {/* State */}
              <div className="space-y-1">
                <label
                  htmlFor="state"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                >
                  State <span className="text-rose-500">*</span>
                </label>
                <input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Karnataka"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.state
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-violet-500/20 focus:border-violet-600'
                  }`}
                />
                {errors.state && (
                  <span className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.state}
                  </span>
                )}
              </div>

              {/* 6-Digit PIN Code */}
              <div className="space-y-1">
                <label
                  htmlFor="pincode"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                >
                  6-Digit PIN Code <span className="text-rose-500">*</span>
                </label>
                <input
                  id="pincode"
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="560001"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.pincode
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-violet-500/20 focus:border-violet-600'
                  }`}
                />
                {errors.pincode && (
                  <span className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.pincode}
                  </span>
                )}
              </div>
            </div>

            {/* Simulated Payment Mode Notice */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Simulated Payment Method
              </h3>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-4 border-violet-600 bg-white" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Cash on Delivery (Demo Simulation)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    No card or bank details required for this demonstration.
                  </span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/cart"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft size={16} />
                <span>Return to Cart</span>
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-700 hover:bg-violet-800 disabled:bg-slate-300 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} />
                <span>{isSubmitting ? 'Processing Order...' : 'Place Demo Order'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-4 sticky top-24">
          <OrderSummaryCard showCheckoutButton={false} />
        </div>
      </div>
    </div>
  );
};
