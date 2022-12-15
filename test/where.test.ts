import { testEmittedIndices, testEmpty, testExpected } from "./test-shared";

describe("Enumerable.where", () => {

    testEmpty(empty => empty.where(t => true));

    testEmittedIndices(query => query.where(n => n < 5));

    testExpected(
        "all values emitted",
        [1,2,3,4,5],
        query => query.where(n => true),
        [1,2,3,4,5]
    );

    testExpected(
        "selected values emitted",
        [1,2,3,4,5],
        query => query.where(n => n >= 3),
        [3,4,5]
    );
})