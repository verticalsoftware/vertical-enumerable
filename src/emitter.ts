import { CancelToken, CancelTokenSource } from "./cancel-token";

/**
 * Defines a function that observes values emitted by a source.
 */
export type EmitterSourceObserver<T> = (value: T, index: number) => void;

/**
 * Defines an object that emits values.
 */
export abstract class EmitterSource<T> implements Iterable<T> {

    /**
     * Emits values of the underlying source to the observer while the cancel token remains
     * unsignaled.
     * @param observer Function that receives each value.
     * @param cancelToken Token that can be observed for cancellation signals.
     */
    abstract emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number;

    /**
     * Emits values of the underlying source to an array.
     */
    toArray(): T[] {
        const array: T[]=[];
        this.emit(value => array.push(value), CancelTokenSource.NEVER);
        return array;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        const array = this.toArray();
        for(let c = 0; c < array.length; c++){
            yield array[c];
        }
    }

    /**
     * Creates an emitter source.
     * @param source Array or Iterable<OUT> instance.
     */
    public static create<OUT>(source: OUT[] | Iterable<OUT>): EmitterSource<OUT> {
        return Array.isArray(source)
            ? new ArrayEmitterSource(source)
            : new IterableEmitterSource(source);
    }
}

/**
 * Represents an EmitterSource<T> that uses an underlying array.
 */
export class ArrayEmitterSource<T> extends EmitterSource<T> {

    /**
     * Creates a new instance.
     * @param array The array that contains values to emit.
     */
    constructor(private readonly array: T[]) {
        super();
    }

    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        const array = this.array;
        let c = 0;
        for (; !cancelToken.signaled && c < array.length; c++){
            observer(array[c], c);
        }
        return c;
    }
}

/**
 * Defines an emitter that uses an iterable as a source.
 */
export class IterableEmitterSource<T> extends EmitterSource<T> {

    /**
     * Creates a new instance
     * @param iterable An iterable source
     */
    constructor(private readonly iterable: Iterable<T>){
        super();
    }

    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        let index = 0;
        for (let value of this.iterable){
            if (cancelToken.signaled)
                break;
            observer(value, index++);
        }
        return index;
    }
}