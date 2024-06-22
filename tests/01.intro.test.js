import { describe, test, it, expect } from "vitest";
import { calculateAverage, factorial, fizzBuzz, max } from "../src/01.intro";

describe(max, () => {
    it('should return the first argument if it is greater', () => {
        // AAA
        // Arrange - Any necessary data or configuration
        const num1 = 1;
        const num2 = 2;
        // Act - The actions we want to test
        const result = max(num1, num2);
        // Assert - The result we expect
        expect(result).toBe(2);
    });

    test('should return the second argument if it is greater', () => {
        expect(max(1, 2)).toBe(2);
    });
});
