import { describe, it, expect } from "vitest";

describe('test suite', () => {
    it('should compare objects', () => {
        const obj = { name: 'John', age: 25 };
        expect(obj).toEqual({ name: 'John', age: 25 });
        // When not having the same object (only less attributes)
        expect(obj).toMatchObject({ name: 'John' });
        // When checking only for an specific attribute to be present
        expect(obj).toHaveProperty('name');
        // When checking only for an specific attribute to be equal to a value
        expect(obj).toHaveProperty('name', 'John');
        // Validating the type of an attribute
        expect(typeof obj.name).toBe('string');
    });

    it('should handle Exceptions', () => {
        const throwError = () => {
            throw new Error('Something went wrong!');
        }

        // Expections require to be scoped in a function
        expect(throwError).toThrowError('Something went wrong!');
    });

    it('should avoid loose and tight assertions', () => {
        const str = 'The requested file was not found.';
        // Loose assertion - Too general
        expect(str).toBeDefined(); // Easily true
        // Tight assertion - Too specific
        expect(str).toBe('The requested file was not found.'); // Easily false
        // Better assertion
        expect(str).toMatch('not found');
        // Even better assertion
        expect(str).toMatch(/not found/i);
    });

    it('should prefer better assertions', () => {
        const myArr = [1, 2, 3];
        // Loose
        expect(myArr).toBeDefined();
        // Tight
        expect(myArr).toEqual([1, 2, 3]);
        // Better
        expect(myArr).toEqual(expect.arrayContaining([1, 2, 3]));
        // Sometimes we need loose or tight tests
        expect(myArr).toHaveLength(3);
        expect(myArr.length).toBeGreaterThan(0);
    });
});
