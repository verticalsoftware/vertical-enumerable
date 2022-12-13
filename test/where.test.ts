import { asEmpty, asEnumerable } from "../src/enumerable";
import { CancelTokenSource } from "../src/cancel-token";
import exp = require("constants");

describe("Enumerable<T>.where", () => {

    test("empty emitted", () => {
       expect(asEmpty().where(_ => false).toArray().length).toBe(0);
    });

    test("nothing matched", () => {
        expect(asEnumerable([1,2,3]).where(n => n > 3).toArray().length).toBe(0);
    })

    test("expected values emitted", () => {
        expect(asEnumerable([1,2,3,4,5])
            .where(n => n > 3)
            .toArray())
            .toStrictEqual([4,5]);
    })

    test("correct indices emitted", () => {
        const q = asEnumerable([1,2,3,4,5,6,7,8,9,10])
            .where(n => n % 2 === 0);
        const expected = [
            { value: 2, index: 0 },
            { value: 4, index: 1 },
            { value: 6, index: 2 },
            { value: 8, index: 3 },
            { value: 10, index: 4 }
        ].reverse();

        q.emit((value, index) => {
            const result = expected.pop();
            expect(value).toBe(result!.value);
            expect(index).toBe(result!.index);
        }, CancelTokenSource.NEVER);
    })
});