import { asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.aggregation", () => {

    test("accumulated value returned", () => {
        const source = [10,10,10,10,10];
        const result = asEnumerable(source).aggregate((sum, next) => sum + next, 0);

        expect(result).toBe(50);
    })

    test("accumulated value returns from chain", () => {
       const source = [
           { name: "alice", age: 30 },
           { name: "bob", age: 50 },
           { name: "carmen", age: 25 },
           { name: "desiree", age: 20 },
           { name: "erica", age: 35 },
       ]

       const result = asEnumerable(source)
           .where(p => p.age >= 25)
           .select(p => p.age)
           .aggregate((sum, age) => sum + age, 0);

       expect(result).toBe(140);
    });
});