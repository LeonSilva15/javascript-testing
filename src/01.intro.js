/**
 * Get the greater number
 * @param {number} num1 first number
 * @param {number} num2 second number
 * @returns the greater of the two paramaters
 */
export function max(num1, num2) {
    return num1 > num2 ? num1 : num2;
}

/**
 * Get Fizz if divisible by 3, Buzz if divisible by 5 and FizzBuzz if divisible by both
 * @param {number} num number to be verified
 * @returns string result
 */
export function fizzBuzz(num) {
    if (num % 3 === 0 && num % 5 === 0) {
        return 'FizzBuzz';
    }
    if (num % 3 === 0) {
        return 'Fizz';
    }
    if (num % 5 === 0) {
        return 'Buzz';
    }
    return num.toString();
}

/**
 * Get the average of the numbers in the array
 * @param {Array<number>} numsArr 
 * @returns average of the numbers in the array
 */
export function calculateAverage(numsArr) {
    if(numsArr.length === 0) {
        return NaN;
    }

    return numsArr.reduce((num1, num2) => {
        return num1 + num2;
    }, 0) / numsArr.length;
}
