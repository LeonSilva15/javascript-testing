import { describe, it, expect } from "vitest";
import {
    getCoupons
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
