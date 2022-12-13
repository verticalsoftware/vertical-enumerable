import { asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.intersect", () => {
   test("returns set intersection", () => {
       const q = asEnumerable([1,2,3,4,5]).intersect(asEnumerable([2,3])).toArray();
       expect(q).toStrictEqual([2,3]);
   })

    test("emits correct indices", () => {
        const q = asEnumerable([1,2,3,4,5])
            .intersect(asEnumerable([2,3]))
            .select((value, index) => ({ value: value, index: index}))
            .toArray();
        expect(q).toStrictEqual([
            { value: 2, index: 0 },
            { value: 3, index: 1 }
        ]);
    })
});