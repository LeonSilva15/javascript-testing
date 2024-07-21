import { vi, it, expect, describe, beforeEach } from 'vitest'

// A Mock Function is a function that imitates the behavior of a real function
// It's used to test in isolation
describe('Mock Functions', () => {
    // mockReturnValue
    it('should have mock functions', () => {
        const greet = vi.fn();
        greet.mockReturnValue('Hello from mock function greet!');
        console.log(greet());

        expect(greet).toHaveBeenCalled();
        // Make called once fail:
        // greet();
        expect(greet).toHaveBeenCalledOnce();
    });

    // mockResolvedValue
    it('should have mock promise functions', () => {
        const greet = vi.fn();
        greet.mockResolvedValue('Resolved mock promise!')
        greet().then(console.log);

        expect(greet).toHaveBeenCalled();
    });

    // mockImplementation
    it('should allow mock functions to be implemented', () => {
        const greet = vi.fn();
        greet.mockImplementation(name => `Hello ${name}!`);
        console.log(greet('John'));

        expect(greet).toHaveBeenCalledWith('John');
    });

    // Example:
    it('should mock the sendText function', () => {
        // Arrange
        const sendText = vi.fn();
        sendText.mockReturnValue('ok');

        // Act
        const result = sendText('message');

        // Assert
        expect(sendText).toHaveBeenCalledWith('message');
        expect(result).toBe('ok');
    })
});
