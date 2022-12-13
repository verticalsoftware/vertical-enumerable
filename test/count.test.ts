import { asEnumerable } from "../src/enumerable";

describe(
    'count',
    () => {
        test('total count returned', () => {
            expect(asEnumerable([1,2,3]).count()).toBe(3);
        });

        test('predicate matched count returned', () => {
            expect(asEnumerable([1,2,3,4,5]).count(n => n > 3)).toBe(2);
        });

        test('predicate matched count returned 0 when not matched', () => {
            expect(asEnumerable([1,2,3,4,5]).count(n => n > 5)).toBe(0);
        })
    }
)