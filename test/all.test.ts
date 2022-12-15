import { Enumerable } from "../src/enumerable";

describe("Enumerable<T>.all", () => {

   test("all returns true when all conditions met", () => {
       const result = Enumerable.from([1,2,3,4,5]).all(n => n <= 5);
       expect(result).toBeTruthy();
   });

   test("all returns false when one condition not met", () => {
       const result = Enumerable.from([1,2,3,4,5]).all(n => n !== 3);
       expect(result).toBeFalsy();
   })

    test("all returns true for empty", () => {
        expect(Enumerable.empty().all(_ => true)).toBeTruthy();
    })

});