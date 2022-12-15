import { testEmittedIndices, testEmpty, testExpected } from "./test-shared";

describe("Enumerable.select", () => {

   testEmpty(query => query.select(n => n.toString()));

   testEmittedIndices(query => query.select(n => n));

   testExpected("emits selected values",
       [1,2,3,4,5],
       query => query.select(n => n.toString()),
       ["1","2","3","4","5"]);

});