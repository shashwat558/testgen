import { add, subtract, multiply, divide } from './calculator.js';

describe('add', () => {
  // basic addition works
  test('adds two positive integers', () => {
    expect(add(1, 2)).toBe(3);
  });

  // adding zero should return the other operand unchanged
  test('adds zero', () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
  });

  // negative numbers should be handled correctly
  test('adds negative numbers', () => {
    expect(add(-3, -7)).toBe(-10);
    expect(add(-4, 5)).toBe(1);
  });

  // floating point addition can have rounding errors, use toBeCloseTo
  test('adds floating point numbers with precision', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  // null is coerced to 0 in JavaScript arithmetic
  test('adds null (coerced to 0)', () => {
    expect(add(null as any, 4)).toBe(4);
  });

  // undefined results in NaN
  test('adds undefined (produces NaN)', () => {
    expect(add(undefined as any, 4)).toBeNaN();
  });

  // empty string is coerced to 0 for addition, but results in string concatenation if either operand is a string
  test('adds empty string (coerces to number when other operand is number)', () => {
    expect(add('' as any, 3)).toBe('3');
  });
});

describe('subtract', () => {
  // basic subtraction works
  test('subtracts two positive integers', () => {
    expect(subtract(5, 2)).toBe(3);
  });

  // subtracting zero should return the original number
  test('subtracts zero', () => {
    expect(subtract(7, 0)).toBe(7);
  });

  // handling negative numbers
  test('subtracts negative numbers', () => {
    expect(subtract(-5, -2)).toBe(-3);
    expect(subtract(5, -2)).toBe(7);
  });

  // floating point subtraction precision
  test('subtracts floating point numbers with precision', () => {
    expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
  });

  // null coerces to 0
  test('subtracts null (coerced to 0)', () => {
    expect(subtract(null as any, 5)).toBe(-5);
  });

  // undefined results in NaN
  test('subtracts undefined (produces NaN)', () => {
    expect(subtract(undefined as any, 5)).toBeNaN();
  });

  // empty string coerces to number 0, but results in string if concatenated
  test('subtracts empty string (coerces to number)', () => {
    expect(subtract('' as any, 2)).toBe(-2);
  });
});

describe('multiply', () => {
  // basic multiplication works
  test('multiplies two positive integers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  // multiplying by zero yields zero
  test('multiplies by zero', () => {
    expect(multiply(0, 10)).toBe(0);
    expect(multiply(10, 0)).toBe(0);
  });

  // negative numbers produce correct sign
  test('multiplies negative numbers', () => {
    expect(multiply(-3, 5)).toBe(-15);
    expect(multiply(-2, -4)).toBe(8);
  });

  // floating point multiplication precision
  test('multiplies floating point numbers with precision', () => {
    expect(multiply(0.2, 0.1)).toBeCloseTo(0.02);
  });

  // null coerces to 0, result should be 0
  test('multiplies null (coerced to 0)', () => {
    expect(multiply(null as any, 7)).toBe(0);
  });

  // undefined yields NaN
  test('multiplies undefined (produces NaN)', () => {
    expect(multiply(undefined as any, 7)).toBeNaN();
  });

  // multiplying by Infinity
  test('multiplies by Infinity', () => {
    expect(multiply(Infinity, 2)).toBe(Infinity);
    expect(multiply(-Infinity, 2)).toBe(-Infinity);
  });
});

describe('divide', () => {
  // basic division works
  test('divides two positive integers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  // division by zero returns Infinity (or -Infinity) according to sign
  test('divides by zero yields Infinity', () => {
    expect(divide(5, 0)).toBe(Infinity);
    expect(divide(-5, 0)).toBe(-Infinity);
  });

  // zero divided by zero yields NaN
  test('zero divided by zero yields NaN', () => {
    expect(divide(0, 0)).toBeNaN();
  });

  // negative numbers division
  test('divides negative numbers correctly', () => {
    expect(divide(-9, 3)).toBe(-3);
    expect(divide(9, -3)).toBe(-3);
    expect(divide(-9, -3)).toBe(3);
  });

  // floating point division precision
  test('divides floating point numbers with precision', () => {
    expect(divide(0.3, 0.1)).toBeCloseTo(3);
  });

  // null coerces to 0, division by null yields Infinity
  test('divides by null (coerced to 0) results in Infinity', () => {
    expect(divide(5, null as any)).toBe(Infinity);
  });

  // undefined yields NaN
  test('divides undefined (produces NaN)', () => {
    expect(divide(undefined as any, 2)).toBeNaN();
  });

  // division by Infinity should result in 0
  test('divides by Infinity yields 0', () => {
    expect(divide(5, Infinity)).toBe(0);
    expect(divide(-5, Infinity)).toBe(-0);
  });

  // ensure divide does not throw for any input
  test('does not throw for any combination of inputs', () => {
    expect(() => divide(1, 0)).not.toThrow();
    expect(() => divide(undefined as any, 1)).not.toThrow();
    expect(() => divide(null as any, null as any)).not.toThrow();
  });
});