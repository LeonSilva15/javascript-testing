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
