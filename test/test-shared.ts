import { Enumerable } from "../src/enumerable";
import { CancelTokenSource } from "../src/cancel-token";

export function testEmpty<R>(config: (query: Enumerable<number>) => Enumerable<R>){

    const empty = config(Enumerable.empty<number>());
    test("empty yields no results", () => {
        expect(empty.toArray().length).toBe(0);
    });
}

export function testEmittedIndices<T>(config: (query: Enumerable<number>) => Enumerable<number>){

    const query = Enumerable.from([0,1,2,3,4,5,6,7,8,9,10]);
    const configured = config(query);
    test("enumerable emits expected indices", () => {
        let expected = 0;
        configured.emit((_, index) => expect(index).toBe(expected++),
            CancelTokenSource.NEVER);
    })
}

export function testExpected<T,R=T>(
    name: string,
    source: T[],
    config: (query: Enumerable<T>) => Enumerable<R>,
    expected: R[]){

    test(name, () => {
        const query = Enumerable.from(source);
        const configured = config(query);
        let index = 0;
        const count = configured.emit((v, i) => {
            expect(v).toBe(expected[index]);
            expect(i).toBe(index++);
        }, CancelTokenSource.NEVER);
        expect(count).toBe(expected.length);
    });
}

export function testScalar<T,R>(
    name: string,
    source: T[],
    config: (query: Enumerable<T>) => R,
    expected: R){

    test(name, () => {
       const query = Enumerable.from(source);
       const configured = config(query);
       expect(configured).toBe(expected);
    });
}

export function testThrowingScalar<T,R>(
    name: string,
    source: T[],
    config: (query: Enumerable<T>) => R){

    test(name, () => {
        const query = Enumerable.from(source);
        expect(() => config(query)).toThrow();
    });
}