import { asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.order", () => {

   test("emits in order by function", () => {
      const query = asEnumerable([9,2,5,8,1])
          .order((a,b) => a < b ? -1 : a === b ? 0 : 1)
          .toArray();

      expect(query).toStrictEqual([1,2,5,8,9]);
   });

});

describe("Enumerable<T>.orderBy", () => {

   test("emits in order", () => {
      const query = asEnumerable([9,2,5,8,1])
          .orderBy(v => v)
          .toArray();

      expect(query).toStrictEqual([1,2,5,8,9]);
   });

});

describe("Enumerable<T>.orderByDescending", () => {

   test("emits in order", () => {
      const query = asEnumerable([9,2,5,8,1])
          .orderByDescending(v => v)
          .toArray();

      expect(query).toStrictEqual([9,8,5,2,1]);
   });

});