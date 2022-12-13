import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.average", () => {
   test("average returns expected", () => {
       const q = asEnumerable([10, 10, 15, 15, 10]).average(i => i);
       expect(q).toBe(12);
   })

    test("average with empty sequence throws", () => {
        expect(() => asEmpty().average(_ => 0)).toThrow();
    })
});