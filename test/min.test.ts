import { testScalar, testThrowingScalar } from "./test-shared";

describe("Enumerable.min", () => {

   testThrowingScalar(
       "throws for empty sequence",
       [],
       query => query.min());

   testScalar(
       "returns minimum",
       [10,2,5,8,16],
       query => query.min(),
       2);

});