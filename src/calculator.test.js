const { add, subtract, multiply, divide, sqrt } = require('./filename');

describe('Math functions', () => {
    // add
    test('add happy path', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('add with negative numbers', () => {
        expect(add(-2, -3)).toBe(-5);
    });

    test('add with zero', () => {
        expect(add(0, 5)).toBe(5);
        expect(add(5, 0)).toBe(5);
    });

    test('add with floats', () => {
        expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('add with NaN results in NaN', () => {
        expect(add(NaN, 1)).toBeNaN();
    });

    test('add with Infinity', () => {
        expect(add(Infinity, 1)).toBe(Infinity);
        expect(add(-Infinity, 1)).toBe(-Infinity);
    });

    test('add with null throws TypeError', () => {
        // @ts-ignore
        expect(() => add(null, 1)).toThrow(TypeError);
    });

    test('add with undefined throws TypeError', () => {
        // @ts-ignore
        expect(() => add(undefined, 1)).toThrow(TypeError);
    });

    test('add with empty string throws TypeError', () => {
        // @ts-ignore
        expect(() => add('', 1)).toThrow(TypeError);
    });

    test('add with Symbol throws TypeError', () => {
        // @ts-ignore
        expect(() => add(Symbol('a'), 1)).toThrow(TypeError);
    });

    // subtract
    test('subtract happy path', () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test('subtract with negative numbers', () => {
        expect(subtract(-5, -3)).toBe(-2);
    });

    test('subtract with zero', () => {
        expect(subtract(0, 5)).toBe(-5);
        expect(subtract(5, 0)).toBe(5);
    });

    test('subtract with floats', () => {
        expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });

    test('subtract with NaN results in NaN', () => {
        expect(subtract(NaN, 1)).toBeNaN();
    });

    test('subtract with Infinity', () => {
        expect(subtract(Infinity, 1)).toBe(Infinity);
        expect(subtract(-Infinity, 1)).toBe(-Infinity);
    });

    test('subtract with null throws TypeError', () => {
        // @ts-ignore
        expect(() => subtract(null, 1)).toThrow(TypeError);
    });

    test('subtract with undefined throws TypeError', () => {
        // @ts-ignore
        expect(() => subtract(undefined, 1)).toThrow(TypeError);
    });

    test('subtract with empty string throws TypeError', () => {
        // @ts-ignore
        expect(() => subtract('', 1)).toThrow(TypeError);
    });

    test('subtract with Symbol throws TypeError', () => {
        // @ts-ignore
        expect(() => subtract(Symbol('a'), 1)).toThrow(TypeError);
    });

    // multiply
    test('multiply happy path', () => {
        expect(multiply(4, 3)).toBe(12);
    });

    test('multiply with negative numbers', () => {
        expect(multiply(-4, 3)).toBe(-12);
    });

    test('multiply with zero', () => {
        expect(multiply(0, 5)).toBe(0);
        expect(multiply(5, 0)).toBe(0);
    });

    test('multiply with floats', () => {
        expect(multiply(0.2, 0.5)).toBeCloseTo(0.1);
    });

    test('multiply with NaN results in NaN', () => {
        expect(multiply(NaN, 1)).toBeNaN();
    });

    test('multiply with Infinity', () => {
        expect(multiply(Infinity, 2)).toBe(Infinity);
        expect(multiply(-Infinity, 2)).toBe(-Infinity);
    });

    test('multiply with null throws TypeError', () => {
        // @ts-ignore
        expect(() => multiply(null, 1)).toThrow(TypeError);
    });

    test('multiply with undefined throws TypeError', () => {
        // @ts-ignore
        expect(() => multiply(undefined, 1)).toThrow(TypeError);
    });

    test('multiply with empty string throws TypeError', () => {
        // @ts-ignore
        expect(() => multiply('', 1)).toThrow(TypeError);
    });

    test('multiply with Symbol throws TypeError', () => {
        // @ts-ignore
        expect(() => multiply(Symbol('a'), 1)).toThrow(TypeError);
    });

    // divide
    test('divide happy path', () => {
        expect(divide(10, 2)).toBe(5);
    });

    test('divide with negative numbers', () => {
        expect(divide(-10, 2)).toBe(-5);
    });

    test('divide with zero numerator', () => {
        expect(divide(0, 5)).toBe(0);
    });

    test('divide by zero yields Infinity', () => {
        expect(divide(5, 0)).toBe(Infinity);
    });

    test('divide with floats', () => {
        expect(divide(0.3, 0.1)).toBeCloseTo(3);
    });

    test('divide with NaN results in NaN', () => {
        expect(divide(NaN, 1)).toBeNaN();
    });

    test('divide with Infinity', () => {
        expect(divide(Infinity, 2)).toBe(Infinity);
        expect(divide(2, Infinity)).toBe(0);
    });

    test('divide with null throws TypeError', () => {
        // @ts-ignore
        expect(() => divide(null, 1)).toThrow(TypeError);
    });

    test('divide with undefined throws TypeError', () => {
        // @ts-ignore
        expect(() => divide(undefined, 1)).toThrow(TypeError);
    });

    test('divide with empty string throws TypeError', () => {
        // @ts-ignore
        expect(() => divide('', 1)).toThrow(TypeError);
    });

    test('divide with Symbol throws TypeError', () => {
        // @ts-ignore
        expect(() => divide(Symbol('a'), 1)).toThrow(TypeError);
    });

    // sqrt (actually squares the number)
    test('sqrt happy path (square)', () => {
        expect(sqrt(5)).toBe(25);
    });

    test('sqrt with negative number (square)', () => {
        expect(sqrt(-3)).toBe(9);
    });

    test('sqrt with zero', () => {
        expect(sqrt(0)).toBe(0);
    });

    test('sqrt with floats', () => {
        expect(sqrt(0.5)).toBeCloseTo(0.25);
    });

    test('sqrt with NaN results in NaN', () => {
        expect(sqrt(NaN)).toBeNaN();
    });

    test('sqrt with Infinity results in Infinity', () => {
        expect(sqrt(Infinity)).toBe(Infinity);
    });

    test('sqrt with null throws TypeError', () => {
        // @ts-ignore
        expect(() => sqrt(null)).toThrow(TypeError);
    });

    test('sqrt with undefined throws TypeError', () => {
        // @ts-ignore
        expect(() => sqrt(undefined)).toThrow(TypeError);
    });

    test('sqrt with empty string throws TypeError', () => {
        // @ts-ignore
        expect(() => sqrt('')).toThrow(TypeError);
    });

    test('sqrt with Symbol throws TypeError', () => {
        // @ts-ignore
        expect(() => sqrt(Symbol('a'))).toThrow(TypeError);
    });
});