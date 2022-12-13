import { asEnumerable } from "../src/enumerable";

describe(
    'Enumerable<T>.skip',
    () => {
        test('expected no values skipped', () => {
            const q = asEnumerable([1,2,3,4,5]);
            expect(q.skip(0).toArray()).toStrictEqual([1,2,3,4,5]);
        });

        test('expected count values skipped', () => {
            const q = asEnumerable([1,2,3,4,5]);
            expect(q.skip(1).toArray()).toStrictEqual([2,3,4,5]);
        });
    }
);