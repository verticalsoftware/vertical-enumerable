import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.min", () => {

    test("returns minimum value", () => {
        const result = asEnumerable([25, 50, 5, 100, -25, 60]).min();
        expect(result).toBe(-25);
    })

    test("throws when empty", () => {
        expect(() => asEmpty().min()).toThrow();
    })

});

describe("Enumerable<T>.max", () => {

    test("returns maximum value", () => {
        const result = asEnumerable([25, 50, 5, 100, -25, 60]).max();
        expect(result).toBe(100);
    })

    test("throws when empty", () => {
        expect(() => asEmpty().min()).toThrow();
    })

});