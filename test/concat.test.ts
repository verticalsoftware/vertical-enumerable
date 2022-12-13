import { asEnumerable } from "../src/enumerable";
import { CancelTokenSource } from "../src/cancel-token";

describe("Enumerable<T>.concat", () => {
    test("all values emitted", () => {
       const q = asEnumerable([1,2,3]).concat(asEnumerable([4,5,6])).toArray();
       expect(q).toStrictEqual([1,2,3,4,5,6]);
    });

    test("emits correct indices", () => {
        const q = asEnumerable([1,2,3])
            .concat(asEnumerable([4,5,6]));
        let expected = 0;

        q.emit((value, index) => {
            expect(index).toBe(expected);
            expected++;
        }, CancelTokenSource.NEVER);
    })
})