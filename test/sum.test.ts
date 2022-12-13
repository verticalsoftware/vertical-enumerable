import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.sum", () => {
   test("returns sum", () => {
       const q = asEnumerable([10,20,30,40,50]).sum();
       expect(q).toBe(10+20+30+40+50);
   });

    test("returns zero when empty", () => {
        expect(asEmpty<number>().sum()).toBe(0);
    });
});