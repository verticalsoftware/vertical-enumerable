import { Enumerable } from "../src/enumerable";

describe("Enumerable<T>.toArray", () => {

    test("all values emitted (array)", () => {
        const array = Enumerable.from([1,2,3]).toArray();
        let expected = 1;
        for(let value of array){
            expect(value).toBe(expected++);
        }
    });

    test("all values emitted (iterable)", () => {
        const set = new Set<number>([1,2,3]);
        const array = Enumerable.from(set).toArray();
        let expected = 1;
        for(let value of array){
            expect(value).toBe(expected++);
        }
    })
})