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

/**
 * Validate if the age is allowed to drive in the country
 * @param {number} age 
 * @param {string} countryCode 
 * @returns {boolean} wheter the age is allowed to drive or not in the country
 */
export function canDrive(age, countryCode) {
    // Avoid defensive programming
    // Assuming this data has already been validated before, there's no need
    // Only validate this when receiving data for the first time
    // to validate it again
    // if(typeof age !== 'number') {
    //     return 'Error!'
    // }

    const legalDrivingAge = {
      US: 16,
      UK: 17,
    };

    if (!legalDrivingAge[countryCode]) {
      return 'Invalid country code';
    }

    return age >= legalDrivingAge[countryCode];
}

/**
 * Fetch the array of numbers
 * @returns {Promise<array<number>>} promise that resolves to an array of numbers
 */
export function fetchData() {
    // return [1,2,3];

    return new Promise((resolve) => {
        setTimeout(() => {
            const data = [1, 2, 3];
            resolve(data);
        });
    });
}

/**
 * Get a promise rejection
 * @returns {Promise.reject} rejected promise
 */
export function failFetchData() {
    return Promise.reject({reason: 'Operation failed'});
}

/**
 * Class to represent the Stack object with the FILO methods
 */
export class Stack {
    /**
     * Create a new stack with a empty items list
     */
    constructor() {
        /** @private */
        this.items = [];
    }

    /**
     * Add a new item to the items list
     * @param {any} item 
     */
    push(item) {
        this.items.push(item);
    }

    /**
     * Get (and remove) the last item of the stack
     * @returns {any} last item of the stack
     */
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
          return this.items.pop();
    }

    /**
     * Get (and preserve in the items) the last item of the stack
     * @returns {any} last item of the stack
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Validate if the stack is empty
     * @returns {boolean} whether the stack is empty or not
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Get the size of the items lsit
     * @returns {number} size of items list
     */
    size() {
        return this.items.length;
    }

    /**
     * Removes all the items in the items lsit
     */
    clear() {
        this.items = [];
    }
}
