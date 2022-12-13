import { ArrayEmitterSource } from "../src/emitter";
import { CancelTokenSource } from "../src/cancel-token";

describe("ArraySourceEmitter<T>", () => {

    test("emits in sequence", () => {
       const emitter = new ArrayEmitterSource([1,2,3,4,5,6,7,8,9,10]);
       let expected = 1;
       emitter.emit(value => {
           expect(value).toBe(expected);
           expected++;
       }, CancelTokenSource.NEVER);
    });

});