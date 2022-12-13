import { asEnumerable } from "../src/enumerable";
import exp = require("constants");

interface KV {
    key: number;
    value: string;
}

describe(
    'toMap',
    () => {
        test('all key/value pairs projected', () => {
            const source: KV[]=[
                { key: 1, value: "alice" },
                { key: 2, value: "bob" },
                { key: 3, value: "carmen" },
            ];
            const q = asEnumerable(source);
            const result = q.toMap(kv => kv.key);

            expect(result.size).toBe(3);
            expect(result.has(1)).toBeTruthy();
            expect(result.has(2)).toBeTruthy();
            expect(result.has(3)).toBeTruthy();
        });

        test("duplicate key throws", () => {
           const source: KV[]=[
               { key: 1, value: "alice" },
               { key: 1, value: "alice" }
           ];
           expect(() => asEnumerable(source).toMap(kv => kv.key)).toThrow();
        });
    }
)