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
