import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.where", () => {

    test("empty emitted", () => {
       expect(asEmpty().where(_ => false).toArray().length).toBe(0);
    });

    test("nothing matched", () => {
        expect(asEnumerable([1,2,3]).where(n => n > 3).toArray().length).toBe(0);
    })

    test("expected values emitted", () => {
        expect(asEnumerable([1,2,3,4,5]).where(n => n > 3).toArray()).toStrictEqual([4,5]);
    })

    test("correct indices emitted", () => {
        const q = asEnumerable([1,2,3,4,5,6,7,8,9,10])
            .where(n => n % 2 === 0)
            .select((_, index) => index)
            .toArray();

        expect(q).toBe([0,1,2,3,4]);
    })
});