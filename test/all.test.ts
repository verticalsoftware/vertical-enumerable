import { asEnumerable } from "../src/enumerable";

describe(
    "Enumerable<T>.all",
    () => {
        test("returns true when empty", () => {
            expect(asEnumerable([]).all(_ => true)).toBeTruthy();
        });

        test("returns true when all match", () => {
            expect(asEnumerable([2,4,6]).all(value => value % 2 === 0)).toBeTruthy();
        });

        test("returns false when one fails", () => {
            expect(asEnumerable([1,2,3]).all(value => value !== 2)).toBeFalsy();
        });

        test("returns false when all fail", () => {
            expect(asEnumerable([1,2,3]).all(value => value > 3)).toBeFalsy();
        });
    }
)