import { Enumerable } from "../src/enumerable";

describe("Enumerable<T>.Iterable<T>", () => {
    test("values iterated", () => {
        const uut = Enumerable.from([1,2,3,4,5]);
        let expected = 1;
        for(let value of uut){
            expect(value).toBe(expected++);
        }
    })
})