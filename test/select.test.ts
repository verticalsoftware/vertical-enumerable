import { asEnumerable } from "../src/enumerable";
import { CancelTokenSource } from "../src/cancel-token";

describe(
    "Enumerable<T>.select", () => {

        test('selected values emitted', () => {
            const source = [
                {name: 'alice', age: 30},
                {name: 'bob', age: 40},
                {name: "carmen", age: 25}
            ];

            const query = asEnumerable(source)
                .select(p => p.age)
                .toArray();

            expect(query).toStrictEqual([30, 40, 25]);
        });

        test('select emits correct index', () => {
            const q = asEnumerable([1,2,3,4,5,6,7,8,9,10])
                .where(n => n%2 === 0)
                .select((value, index) => ({
                    value: value,
                    index: index
                }))
                .toArray();

            expect(q).toStrictEqual([
                { value: 2, index: 0 },
                { value: 4, index: 1 },
                { value: 6, index: 2 },
                { value: 8, index: 3 },
                { value: 10, index: 4 },
            ])
        })
    }
)