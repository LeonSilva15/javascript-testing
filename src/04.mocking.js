import { getExchangeRate } from './libs/currency';
import { getShippingQuote } from './libs/shipping';
import { trackPageView } from './libs/analytics';
import { charge } from './libs/payment';
import { isValidEmail, sendEmail } from './libs/email';
import security from './libs/security';

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

/**
 * Submit an order
 * @param {Object} order
 * @param {string} creditCard
 * @returns whether the submission was successful or not
 */
export async function submitOrder(order, creditCard) {
    const paymentResult = await charge(creditCard, order.totalAmount);

    if (paymentResult.status === 'failed') { return { success: false, error: 'payment_error' }; }

    return { success: true };
}

/**
 * Sign up action
 * @param {string} email
 * @returns wether the email is valid and therefore the action successful or not
 */
export async function signUp(email) {
    if (!isValidEmail(email)) return false;

    await sendEmail(email, 'Welcome aboard!');

    return true;
}

/**
 * Login action
 * @param {string} email 
 */
export async function login(email) {
    const code = security.generateCode();

    await sendEmail(email, code.toString());
}

/**
 * Get whether the service is available depending on the time
 * @returns whether the service is available
 */
export function isOnline() {
    const availableHours = [8, 20];
    const [open, close] = availableHours;
    const currentHour = new Date().getHours();

    return currentHour >= open && currentHour < close;
}
