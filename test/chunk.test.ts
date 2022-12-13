import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.chunk", () => {

    test("throws when < 0", () => {
        expect(() => asEmpty().chunk(0)).toThrow();
    })

    test("returns right-sized arrays", () => {
        const result = asEnumerable([1,2,3,4,5,6]).chunk(2).toArray();
        result.forEach(array => {
            expect(array.length).toBe(2);
        })
    })

    test("returns expected arrays", () => {
        const result = asEnumerable([1,2,3,4,5,6]).chunk(2).toArray();
        expect(result).toStrictEqual([
            [1,2],
            [3,4],
            [5,6]
        ]);
    });

});