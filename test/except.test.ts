import { asEnumerable } from "../src/enumerable";

describe("Enumerable<T>", () => {
   test("returns set difference", () => {
      const q = asEnumerable([1,2,3,4,5,6,7,8]).except(asEnumerable([2,3,4,5])).toArray();
      expect(q).toStrictEqual([1,6,7,8]);
   });

   test("returns correct indices", () => {
      const q = asEnumerable([1,2,3,4,5,6,7,8])
          .except(asEnumerable([2,3,4,5]))
          .select((value, index) => ({
             value: value,
             index: index
          }))
          .toArray();

      expect(q).toStrictEqual([
         { value: 1, index: 0 },
         { value: 6, index: 1 },
         { value: 7, index: 2 },
         { value: 8, index: 3 },
      ]);
   })
});