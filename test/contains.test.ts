import { asEnumerable } from "../src/enumerable";

describe(
    "Enumerable<T>.contains",
    () => {
        test("returns true when matched", () => {
            expect(asEnumerable([1,2,3,4,5]).contains(1)).toBeTruthy();
        });

        test("returns false when not matched", () => {
            expect(asEnumerable([1,2,3,4,5]).contains(0)).toBeFalsy();
        });

        test("uses non-strict equality", () => {
            expect(asEnumerable([1,2,3]).contains(1)).toBeTruthy();
        })
    }
)