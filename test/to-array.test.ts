import { asEnumerable } from "../src/enumerable";

describe(
    'Enumerable<T>.toArray',
    () => {
        test('all elements projected', () => {
            const q = asEnumerable([1,2,3,4,5]);
            expect(q.toArray()).toStrictEqual([1,2,3,4,5]);
        });
    }
);