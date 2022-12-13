import { asEnumerable } from "../src/enumerable";

describe(
    "Enumerable<T>.take",
    () => {
        test("no items emitted", () => {
            expect(asEnumerable([1,2,3]).take(0).toArray()).toStrictEqual([]);
        });

        test("count items emitted", () =>{
            expect(asEnumerable([1,2,3,4,5]).take(3).toArray()).toStrictEqual([1,2,3]);
        });

        test("throws for negative input", () => {
            expect(() => asEnumerable([]).take(-1)).toThrow();
        })

        test("skip/take emits expected subset", () => {
            expect(asEnumerable([1,2,3,4,5])
                .skip(1)
                .take(2)
                .toArray()).toStrictEqual([2,3]);
        });
    }
);