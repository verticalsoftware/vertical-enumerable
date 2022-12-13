import { asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.last",() => {

    test("throws when empty", () => {
       expect(() => asEnumerable([]).last()).toThrow();
    });

    test("throws when predicate not matched", () => {
        expect(() => asEnumerable([1,2,3]).last(n => n > 3)).toThrow();
    });

    test("returns last", () => {
        expect(asEnumerable([1,2,3]).last()).toBe(3);
    });

    test("returns last with predicate", () => {
        expect(asEnumerable([1,2,3,4,5]).last(n => n > 3)).toBe(5);
    });

});

describe("Enumerable<T>.lastOrDefault", () => {

    test("returns undefined when empty", () => {
        expect(asEnumerable([]).lastOrDefault()).toBeUndefined();
    });

    test("returns undefined when predicate not matched", () => {
        expect(asEnumerable([1,2,3]).lastOrDefault(n => n > 3)).toBeUndefined();
    })

    test("returns last", () => {
        expect(asEnumerable([1,2,3]).lastOrDefault()).toBe(3);
    });

    test("returns last with predicate", () => {
        expect(asEnumerable([1,2,3,4,5]).lastOrDefault(n => n > 3)).toBe(5);
    });
});