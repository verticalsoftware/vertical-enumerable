import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.empty", () => {

    test("returns true when empty", () => {
        expect(asEmpty().empty()).toBeTruthy();
    })

    test("returns false when not empty", () => {
        expect(asEnumerable([0]).empty()).toBeFalsy();
    })
})