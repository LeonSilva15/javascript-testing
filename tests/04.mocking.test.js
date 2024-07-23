import { vi, it, expect, describe, beforeEach } from 'vitest'
import {
    getPriceInCurrency,
    getShippingInfo,
    renderPage,
    signUp,
    submitOrder
} from '../src/04.mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';


vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');

vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');

// Partial Mocking
// Only replace the sendEmail method
// The rest of the methods are required since they are utilities
vi.mock('../src/libs/email', async (getModules) => {
    const modules = await getModules();
    return {
        ...modules,
        sendEmail: vi.fn()
    }
});

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

// Mocking modules
describe(getPriceInCurrency, () => {
    it('should return price in target currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);

        const price = getPriceInCurrency(10, 'AUD');

        expect(price).toBe(15);
    });
});

describe(getShippingInfo, () => {
    it('should handle unavailable fetch endpoint', () => {
        vi.mocked(getShippingQuote).mockReturnValue(undefined);

        const result = getShippingInfo('Random destination');

        expect(result).toMatch(/unavailable/i);
    });

    it('should return the cost and days in the info after fetching the data', () => {
        vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 5 });

        const result = getShippingInfo('Random destination');

        expect(result).toMatch('$10');
        expect(result.toLowerCase()).toMatch('(5 days)');
    });
});

// Interaction Testing
describe(renderPage, () => {
    it('should return correct content', async () => {
        const result = await renderPage();

        expect(result.toLowerCase()).toMatch('content');
    });

    it('should call analytics', async () => {
        await renderPage();

        expect(trackPageView).toHaveBeenCalledWith('/home');
    })
});

describe(submitOrder, () => {
    const order = { totalAmount: 10 };
    const creditCard = { creditCardNumber: '12345678' };

    it('should handle charging in payment', async () => {
        vi.mocked(charge).mockResolvedValue({status: 'success'});

        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });

    it('should return success when payment is successful', async () => {
        vi.mocked(charge).mockResolvedValue({status: 'success'});

        const result = await submitOrder(order, creditCard);

        expect(result.success).toBe(true);
        // or
        expect(result).toEqual({success: true});
    });

    it('should handle the failed endpoint call', async () => {
        vi.mocked(charge).mockResolvedValue({status: 'failed'});

        const result = await submitOrder(order, creditCard);

        expect(result.success).toBe(false);
        // or
        expect(result).toHaveProperty('success', false);
        // or
        expect(result).toMatchObject({success: false});
        // or
        expect(result).toMatchObject({success: false, error: 'payment_error'});

        expect(result.error.toLowerCase()).toMatch('payment');
    });
});

// Partial Mocking
describe(signUp, () => {
    const email = 'name@domain.com';

    // The suite will accumulate the mock methods unless cleared
    // This is an option that can be set in the vitest.config.js
    // mockClear   - clears all the info about calls
    // mockReset   - same as mockClear but reimplements to an empty function
    // mockRestore - same as mockClear but reimplements to the original function implementation
    // beforeEach(() => {
    //     vi.mocked(sendEmail).mockClear();

        // If there are multiple mock implementations:
        // vi.clearAllMocks();
    // });

    it('should return false if the email is not valid', async () => {
        const result = await signUp('abc');

        expect(result).toBe(false);
    });

    it('should return true if the email is valid', async () => {
        const result = await signUp(email);

        expect(result).toBe(true);
    });

    it('should send welcome message when the email is valid', async () => {
        const result = await signUp(email);

        // Regular expression won't work here:
        // expect(sendEmail).toHaveBeenCalledWith(email, /welcome/i);
        expect(sendEmail).toHaveBeenCalled();

        // The suite will accumulate the mock methods unless cleared
        expect(sendEmail).toHaveBeenCalledOnce();

        // Access the information of the acion in the mock function
        const args = vi.mocked(sendEmail).mock.calls[0];
        console.log('sendEmail first call args:', args);

        // This is too attached to the implementation, this should be avoided
        // Mocking should be used only on external dependencies
        expect(args[0]).toBe(email);
        expect(args[1]).toMatch(/welcome/i);
        // or
        expect(args[1].toLowerCase().includes('welcome')).toBe(true);
    });
});
