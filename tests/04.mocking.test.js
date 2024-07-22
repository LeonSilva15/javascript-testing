import { vi, it, expect, describe, beforeEach } from 'vitest'
import {
    getPriceInCurrency,
    getShippingInfo,
    renderPage,
    submitOrder
} from '../src/04.mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';


vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');

vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');

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
