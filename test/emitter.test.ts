import { ArrayEmitterSource, EmitterSource, IterableEmitterSource } from "../src/emitter";
import { CancelTokenSource } from "../src/cancel-token";

describe("ArrayEmitterSource<T>", () => {

    test("emits all values with index", () => {
        const uut = new ArrayEmitterSource([0,1,2,3,4,5]);
        let expected = 0;
        const count = uut.emit((value, index) => {
            expect(value).toBe(expected);
            expect(index).toBe(expected++);
        }, CancelTokenSource.NEVER);
        expect(count).toBe(6);
    });

    test("emits values until cancelled", () => {
        const uut = new ArrayEmitterSource([0,1,2,3,4,5]);
        const cancelToken = new CancelTokenSource();
        let expected = 0;
        const count = uut.emit((value, index) => {
            expect(value).toBe(expected);
            expect(index).toBe(expected++);
            if (index == 2){
                cancelToken.cancel();
            }
        }, cancelToken);
        expect(count).toBe(3);
    })
});

describe("IterableEmitterSource<T>", () => {

    test("emits all values with index", () => {
        const uut = new IterableEmitterSource([0,1,2,3,4,5]);
        let expected = 0;
        const count = uut.emit((value, index) => {
            expect(value).toBe(expected);
            expect(index).toBe(expected++);
        }, CancelTokenSource.NEVER);
        expect(count).toBe(6);
    });

    test("emits values until cancelled", () => {
        const uut = new IterableEmitterSource([0,1,2,3,4,5]);
        const cancelToken = new CancelTokenSource();
        let expected = 0;
        const count = uut.emit((value, index) => {
            expect(value).toBe(expected);
            expect(index).toBe(expected++);
            if (index == 2){
                cancelToken.cancel();
            }
        }, cancelToken);
        expect(count).toBe(3);
    })
});