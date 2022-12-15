import { Enumerable } from "../src/enumerable";

describe("Enumerable.count", () => {

    test("returns 0 when empty", () => {
        expect(Enumerable.empty().count()).toBe(0);
    })

    test("returns exact count", () => {
        expect(Enumerable.from([1,2,3]).count()).toBe(3);
    })

    test("returns count that matches a predicate", () => {
       expect(Enumerable.from([1,2,3,4,5]).count(n => n >= 3))
           .toBe(3);
    });

})