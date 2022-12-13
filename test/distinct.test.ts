import { asEmpty, asEnumerable } from "../src/enumerable";

describe("Enumerable<T>.distinct", () => {

    test("emits empty set", () => {
        expect(asEmpty<number>().distinct().toArray().length).toBe(0);
    });

    test("emits original sequence", () => {
        expect(asEnumerable([1,2,3]).distinct().toArray()).toStrictEqual([1,2,3]);
    });

    test("emits distinct set", () => {
        expect(asEnumerable([1,2,2,3,4,4,4,4,5,6,6]).distinct().toArray()).toStrictEqual([1,2,3,4,5,6]);
    })

});

describe("Enumerable<T>.distinctBy", () => {

    test("emits distinct set using selector", () => {
        const query = asEnumerable([
            { k: "1", v: "one" },
            { k: "1", v: "also-one" },
            { k: "2", v: "two" },
            { k: "2", v: "also-two" },
            { k: "3", v: "three" },
            { k: "3", v: "3" },
            { k: "3", v: "also-three" },
            { k: "3", v: "also-3" },
        ])
            .distinctBy(kv => kv.k)
            .toArray()
            .map(kv => kv.v);

        expect(query).toStrictEqual(["one", "two", "three"]);
    })

})