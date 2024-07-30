import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../src/05.types';

// Typescript help us remove the negative testing
describe('calculateDiscount', () => {
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
