import { CancelToken, CancelTokenSource } from "./cancel-token";

/**
 * Defines a function that observes values emitted by a source.
 */
export type EmitterSourceObserver<T> = (value: T, index: number) => void;

/**
 * Defines an object that emits values from an underlying source.
 */
export interface EmitterFunction<T> {

    /**
     * Emits values of the underlying source to the observer while the cancel token remains
     * unsignaled.
     * @param observer Function that receives each value.
     * @param cancelToken Token that can be observed for cancellation signals.
     */
    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number;
}

/**
 * Defines an object that emits values.
 */
export abstract class EmitterSource<T> implements EmitterFunction<T>, Iterable<T> {

    /**
     * Emits values of the underlying source to the observer while the cancel token remains
     * unsignaled.
     * @param observer Function that receives each value.
     * @param cancelToken Token that can be observed for cancellation signals.
     */
    abstract emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number;

    /**
     * Returns the number of values that would be emittted from the source.
     */
    count(): number {
        let count = 0;
        this.emit(_ => ++count, CancelTokenSource.NEVER);
        return count;
    }

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

    override count(): number {
        return this.array.length;
    }

    override toArray(): T[] {
        return this.array;
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

    *[Symbol.iterator](): IterableIterator<T> {
        for (let value of this.iterable){
            yield value;
        }
    }
}

/**
 * Defines an emitter that never emits anything.
 */
export class EmptyEmitterSource<T> extends EmitterSource<T> {

    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        return 0;
    }

    count(): number {
        return 0;
    }

    toArray(): T[] {
        return [];
    }

    *[Symbol.iterator](): IterableIterator<T> {  }

}

/**
 * Represents an emitter source that uses an underlying function.
 */
export class FunctionEmitterSource<T> extends EmitterSource<T> {

    /**
     * Creates a new instance of this type.
     * @param fn Function used to emit the values.
     */
    constructor(private readonly fn: EmitterFunction<T>){
        super();
    }

    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        return this.fn.emit(observer, cancelToken);
    }
}
