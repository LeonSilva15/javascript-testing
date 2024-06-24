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
});

