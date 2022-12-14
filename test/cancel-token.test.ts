import { CancelTokenSource } from "../src/cancel-token";

describe("CancelTokenSource", () => {
   test("signaled set", () => {
       const uut = new CancelTokenSource();
       expect(uut.signaled).toBeFalsy();
       uut.cancel();
       expect(uut.signaled).toBeTruthy();
   });
    test("signaled set with linked token", () => {
        const firstCancel = new CancelTokenSource();
        const uut = new CancelTokenSource(firstCancel);
        expect(uut.signaled).toBeFalsy();
        firstCancel.cancel();
        expect(uut.signaled).toBeTruthy();
    });
    test("signaled set on prime token", () => {
        const firstCancel = new CancelTokenSource();
        const uut = new CancelTokenSource(firstCancel);
        expect(uut.signaled).toBeFalsy();
        uut.cancel();
        expect(uut.signaled).toBeTruthy();
    })
});