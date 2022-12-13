import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.elementAt", () => {

    test("index returned", () => {
        const result = asEnumerable([1,2,3,4,5]).elementAt(0);
        expect(result).toBe(1);
    })

    test("throws if index < 0", () => {
        expect(() => asEmpty().elementAt(-1)).toThrow();
    })

});

describe("Enumerable<T>.elementAtOrDefault", () => {

    test("index returned", () => {
        const result = asEnumerable([1,2,3,4,5]).elementAt(2);
        expect(result).toBe(3);
    })

    test("undefined returns", () => {
        const result = asEmpty().elementAtOrDefault(0);
        expect(result).toBeUndefined();
    })

    test("throws if index < 0", () => {
        expect(() => asEmpty().elementAtOrDefault(-1)).toThrow();
    })
})