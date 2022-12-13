import { asEnumerable } from "../src/enumerable";
import { CancelTokenSource } from "../src/cancel-token";

describe("Enumerable<T>.append", () => {

    test("append emits element", () => {
       const q = asEnumerable([1,2,3,4]).append(5);
       expect(q.toArray()).toStrictEqual([1,2,3,4,5]);
    });

    test("append returns correct index", () => {
        const q = asEnumerable([1,2,3,4]).append(5);
        let i = -1;
        q.emit((value, index) => {
            i = index;
        }, CancelTokenSource.NEVER);
        expect(i).toBe(4);
    })
});