import { Enumerable } from "../src/enumerable";

describe("Enumerable.aggregate", () => {

    test("expected value returned (no selector)", () => {
        const uut = Enumerable.from([1,2,3,4,5]);
        const result = uut.aggregate(0, (acc, i) => acc+i);
        expect(result).toBe(15);
    })

    test("expected value returned (w/selector)", () => {
        const uut = Enumerable.from([1,2,3,4,5]);
        const result = uut.aggregate(0, (acc, i) => acc + i,
            i => i.toString());
        expect(result).toBe("15");
    })

    test("expected value returned (w/transform)", () => {
        const uut = Enumerable.from([
            { name: "alice", age: 20 },
            { name: "bob", age: 30 },
            { name: "carmen", age: 40 },
            { name: "desiree", age: 25 },
        ]);
        const result = uut.aggregate(
            0,
            (acc, p) => acc + p.age);

        expect(result).toBe(115);
    });

})