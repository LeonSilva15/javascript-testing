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

describe('fizzBuzz', () => {
    it('should return FizzBuzz if the number is divisible by 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    });

    it('should return Fizz if the number is only divisible by 3', () => {
        expect(fizzBuzz(6)).toBe('Fizz');
    });

    it('should return Buzz if the number is divisible by 5', () => {
        expect(fizzBuzz(50)).toBe('Buzz');
    });
});

describe('calculateAverage', () => {
    it('should return NaN if given an empty array', () => {
        expect(calculateAverage([])).toBeNaN();
    });

    it('should return the same number if there is only one element in the array', () => {
        expect(calculateAverage([2])).toBe(2);
    });

    it('should return the average of two elements in the array', () => {
        expect(calculateAverage([1, 2])).toBe(1.5);
    });

    it('should return the average of five elements in the array', () => {
        expect(calculateAverage([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });
});
