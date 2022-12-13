import { asEnumerable } from "../src/enumerable";

describe(
    "Enumerable<T>.first",
    () => {
        test("Throws when empty", () => {
           expect(() => asEnumerable([]).first()).toThrow();
        });

        test("Throws when empty because not matched", () => {
            expect(() => asEnumerable([1,2,3]).first(n => n > 3)).toThrow();
        })

        test("Returns first with no predicate", () => {
            expect(asEnumerable([1,2,3]).first()).toBe(1);
        })

        test("Returns first that matches predicate", () => {
            expect(asEnumerable([1,2,3,4,5]).first(n => n > 3)).toBe(4);
        })
    }
)

describe(
    "Enumerable<T>.firstOrDefault",
    () => {
        test("Returns undefined when empty", () => {
            expect(asEnumerable([]).firstOrDefault()).toBeUndefined();
        });

        test("Returns undefined when empty because not matched", () => {
            expect(asEnumerable([1,2,3]).firstOrDefault(n => n > 3)).toBeUndefined();
        })

        test("Returns first with no predicate", () => {
            expect(asEnumerable([1,2,3]).firstOrDefault()).toBe(1);
        })

        test("Returns first that matches predicate", () => {
            expect(asEnumerable([1,2,3,4,5]).firstOrDefault(n => n > 3)).toBe(4);
        })
    }
)