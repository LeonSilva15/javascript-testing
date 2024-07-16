import { getExchangeRate } from './libs/currency';

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
