import { asEnumerable } from "../src/enumerable";

describe(
    "Enumerable<T>.any", () => {
        test("false returned when empty", () => {
            expect(asEnumerable([]).any()).toBeFalsy();
        });

        test("false returned when no predicate match", () => {
            expect(asEnumerable([1,2,3]).any(n => n > 3)).toBeFalsy();
        });

        test("true returned when not-empty", () => {
            expect(asEnumerable([1]).any()).toBeTruthy();
        });

        test("true returned when not-empty and predicate matched", () => {
            expect(asEnumerable([1,2,3]).any(n => n === 2)).toBeTruthy();
        });
    }
);