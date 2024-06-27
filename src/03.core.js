/**
 * Get coupons with code and discount percentage
 * @returns {array<{code:string, discount: number}>} array of coupons
 */
export function getCoupons() {
    return [
        { code: 'SAVE20NOW', discount: 0.2 },
        { code: 'DISCOUNT50OFF', discount: 0.5 }
    ];
}

/**
 * Get the discounted price after applying the code
 * @param {number} price 
 * @param {string} discountCode 
 * @returns {number | string} discounted price
 */
export function calculateDiscount(price, discountCode) {
    if(typeof price !== 'number' || price <= 0) {
      return 'Invalid price';
    }

    if(typeof discountCode !== 'string') {
      return 'Invalid discount code';
    }

    let discount = 0;
    if(discountCode === 'SAVE10') {
      discount = 0.1;
    } else if(discountCode === 'SAVE20') {
      discount = 0.2;
    }

    return price - price * discount;
}

export const MIN_USERNAME_LENGTH = 3;
export const MIN_AGE = 18;
export const MAX_AGE = 80;
/**
 * Validate the user data
 * @param {string} username 
 * @param {number} age 
 * @returns {boolean | string} whether the data is valid or not
 */
export function validateUserInput(username, age) {
    let errors = [];

    if (typeof username !== 'string' || username.length < MIN_USERNAME_LENGTH) {
        errors.push('Invalid username');
    }

    if (typeof age !== 'number' || age < MIN_AGE || age > MAX_AGE) {
        errors.push('Invalid age');
    }

    return errors.length === 0 ? 'Validation successful' : errors.join(', ');
}

/**
 * Validate if price is in range
 * @param {number} price to be validated
 * @param {number} min lower boundary
 * @param {number} max upper boundary
 * @returns {boolean} whether the price is within the range or not
 */
export function isPriceInRange(price, min, max) {
    return price >= min && price <= max;
}

/**
 * Validate the user name
 * @param {string} username 
 * @returns {boolean} whether the username is valid or not
 */
export function isValidUsername(username) {
    const minLength = 5;
    const maxLength = 15;
    if(typeof username !== 'string') {
        return false;
    }
  
    return username.length >= minLength && username.length <= maxLength;
}
