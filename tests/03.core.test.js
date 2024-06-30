import { describe, it, expect } from "vitest";
import {
    getCoupons,
    calculateDiscount,
    validateUserInput,
    MIN_USERNAME_LENGTH,
    MIN_AGE,
    MAX_AGE,
    isPriceInRange
} from "../src/03.core";

describe('getCoupons', () => {
    it('should return an array', () => {
        const coupons = getCoupons();
        expect(coupons).toBeInstanceOf(Array);
        // or
        expect(Array.isArray(coupons)).toBe(true);
        // or
        expect(Array.isArray(coupons)).toBeTruthy();
    });

    it('should return an array with valid codes', () => {
        const coupons = getCoupons();
        expect(coupons.length).toBeGreaterThan(0);
        for(const coupon of coupons) {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon).toBeTruthy(); // Empty strings are not truthy
        }
    });

    it('should return an array with valid discounts', () => {
        const coupons = getCoupons();
        expect(coupons.length).toBeGreaterThan(0);
        for(const coupon of coupons) {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');

            // Only discount between 0 and 1
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThanOrEqual(1);
        }
    });
});

describe('calculateDiscount', () => {
    // Negative testing
    it('should handle non-numeric prices', () => {
        const errorMsg = calculateDiscount('One hundred', 'MyCode');
        expect(typeof errorMsg).toBe('string');
        expect(errorMsg).toMatch(/invalid/i);
    });

    // Negative testing
    it('should handle negative price', () => {
        const errorMsg = calculateDiscount(-50, 100);
        expect(errorMsg).toMatch(/invalid/i);
    });

    // Negative testing
    it('should handle numeric discounts', () => {
        const errorMsg = calculateDiscount(500, 100);
        expect(errorMsg).toMatch(/invalid/i);
    });

    // Possitive testing
    it('should handle numeric discounts', () => {
        const price = calculateDiscount(500, 'INVALID');
        expect(price).toBe(500);
    });

    // Possitive testing
    it('should discount the 10% if given a SAVE10', () => {
        const newPrice1 = calculateDiscount(500, 'SAVE10');
        expect(newPrice1).toBe(450);

        const newPrice2 = calculateDiscount(100, 'SAVE10');
        expect(newPrice2).toBe(90);

        const newPrice3 = calculateDiscount(10, 'SAVE10');
        expect(newPrice3).toBe(9);
    });

    // Possitive testing
    it('should discount the 20% if given a SAVE20', () => {
        const newPrice1 = calculateDiscount(500, 'SAVE20');
        expect(newPrice1).toBe(400);

        const newPrice2 = calculateDiscount(100, 'SAVE20');
        expect(newPrice2).toBe(80);

        const newPrice3 = calculateDiscount(10, 'SAVE20');
        expect(newPrice3).toBe(8);
    });
});

describe('validateUserInput', () => {
    it('should handle non-string username', () => {
        expect(validateUserInput(123, 20)).toMatch(/invalid username/i);
    });

    it('should handle too short username', () => {
        const name = 'a'.repeat(MIN_USERNAME_LENGTH - 1);
        expect(validateUserInput(name, 20)).toMatch(/invalid username/i);
    });

    it('should handle too non-numeric age', () => {
        expect(validateUserInput('John', '20')).toMatch(/invalid age/i);
    });

    it('should handle age under the min age', () => {
        const age = MIN_AGE - 1;
        expect(validateUserInput('John', age)).toMatch(/invalid age/i);
    });

    it('should handle age over the max age', () => {
        const age = MAX_AGE + 1;
        expect(validateUserInput('John', age)).toMatch(/invalid age/i);
    });

    it('should succeed if given valid name and age', () => {
        expect(validateUserInput('John', 20)).toMatch(/^|\bsuccess/i);
    });
});

// Testing boundaries
describe('isPriceInRange', () => {
    it('should return false when the price is out the range', () => {
        expect(isPriceInRange(-10, 0, 100)).toBe(false);
        expect(isPriceInRange(110, 0, 100)).toBe(false);
    });

    it('should return true when the price is equal to the boundaries', () => {
        expect(isPriceInRange(0, 0, 100)).toBe(true);
        expect(isPriceInRange(100, 0, 100)).toBe(true);
    });

    it('should return true when the price is within boundaries', () => {
        expect(isPriceInRange(50, 0, 100)).toBe(true);
    });
});
