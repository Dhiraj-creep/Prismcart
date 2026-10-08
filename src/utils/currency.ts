/**
 * Currency utilities using Intl.NumberFormat for Indian Rupee (INR)
 * and integer paise arithmetic to avoid floating point precision issues.
 */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const inrFormatterWithDecimals = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatINR(amount: number, showDecimals = false): string {
  if (isNaN(amount)) return '₹0';
  return showDecimals ? inrFormatterWithDecimals.format(amount) : inrFormatter.format(amount);
}

/**
 * Calculates discount percentage rounded to nearest whole number
 */
export function calculateDiscountPercentage(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Monetary calculations using integer paise to avoid rounding errors
 */
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function toRupees(paise: number): number {
  return paise / 100;
}
