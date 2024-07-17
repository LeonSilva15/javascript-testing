import { getExchangeRate } from './libs/currency';
import { getShippingQuote } from './libs/shipping';
import { trackPageView } from './libs/analytics';

/**
 * Get the new price in the specified currency
 * @param {number} price 
 * @param {string} currency 
 * @returns new price in the especified curreny
 */
export function getPriceInCurrency(price, currency) {
    const rate = getExchangeRate('USD', currency);
    return price * rate;
}

/**
 * Get the shipping info
 * @param {string} destination 
 * @returns shipping info
 */
export function getShippingInfo(destination) {
    const quote = getShippingQuote(destination);
    if (!quote) return 'Shipping Unavailable';
    return `Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)`;
}

/**
 * Get the home page content
 * @returns home page content
 */
export async function renderPage() {
    trackPageView('/home');

    return '<div>content</div>';
}
