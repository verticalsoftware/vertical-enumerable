import { Enumerable } from "../src/enumerable";

describe("Enumerable<T>,any", () => {
    test("returns false with empty input", () => {
        expect(Enumerable.empty().any()).toBeFalsy();
    })

    test("returns true when predicate omitted", () => {
        expect(Enumerable.from([1]).any()).toBeTruthy();
    })

    test("returns true when predicate satisfied", () => {
        expect(Enumerable.from([1,2,3]).any(n => n > 1)).toBeTruthy();
    })
})