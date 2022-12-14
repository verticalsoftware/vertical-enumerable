import { ArrayEmitterSource } from "./emitter";

const e = new ArrayEmitterSource([1,2,3,4,5]);
for(let v of e){
    console.log(v);
}