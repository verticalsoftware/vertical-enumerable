import { Enumerable } from "./enumerable";
import { EmitterSource } from "./emitter";

/**
 * Defines the implementation of Enumerable
 */
export class EnumerableImpl<T> implements Enumerable<T> {

    /**
     * Creates a new instance of this type.
     * @param source Emitter source
     */
    constructor(private readonly source: EmitterSource<T>){
    }

    *[Symbol.iterator](): IterableIterator<T> {
        const array = this.source.toArray();
        for (let c = 0; c < array.length; c++){
            yield array[c];
        }
    }
}