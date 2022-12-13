import { CancelToken, CancelTokenSource } from "./cancel-token";

/**
 * Defines a callback function for emitter sources
 * @param T The type of value being received
 */
export type EmitterSourceObserver<T> = (value: T, index: number) => void;

/**
 * Represents the interface of an object that emits values of some underlying sequence
 * to an observer function.
 * @param T The type of value being emitted
 */
export interface EmitterSource<T> {
    /**
     * Emits each value in the underlying sequence until cancellation is requested. Returns
     * the number of items emitted.
     * @param {EmitterSourceObserver<T>} observer A function that receives each value and optionally
     * the current index.
     * @param {CancelToken} cancelToken A token that can be observed for cancellation requests.
     */
    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number;
}

/**
 * Implements an EmitterSource<T> using an array as the underlying sequence.
 */
export class ArrayEmitterSource<T> implements EmitterSource<T> {
    /**
     * Constructs a new instance
     * @param {T[]} source Source array
     */
    constructor(source: T[]){
        this._source = source;
    }

    private readonly _source: T[];

    /**
     * Emits each value in the underlying sequence until cancellation is requested.
     * @param {EmitterSourceObserver<T>} observer A function that receives each value and optionally
     * the current index.
     * @param {CancelToken} cancelToken A token that can be observed for cancellation requests.
     */
    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        let count = 0;
        for (let c = 0; !cancelToken.signaled && c < this._source.length; c++){
            observer(this._source[c], c);
            count++;
        }
        return count;
    }
}

/**
 * Implements an EmitterSource<T> using values yielded from an iterator.
 */
export class IterableIteratorEmitterSource<T> implements EmitterSource<T> {
    /**
     * Constructs a new instance
     * @param {IterableIterator<T>} iterator Source iterator
     */
    constructor(iterator: IterableIterator<T>) {
        this._source = iterator;
    }

    private readonly _source: IterableIterator<T>;

    /**
     * Emits each value in the underlying sequence until cancellation is requested.
     * @param {EmitterSourceObserver<T>} observer A function that receives each value and optionally
     * the current index.
     * @param {CancelToken} cancelToken A token that can be observed for cancellation requests.
     */
    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        let c = 0;
        for (let value of this._source){
            if (cancelToken.signaled)
                break;
            observer(value, c++);
        }
        return c;
    }
}

/**
 * Represents a controllable EmitterSource.
 */
export class StateWrappingEmitterSource<IN, STATE, OUT> implements EmitterSource<OUT> {
    constructor(
        private readonly _source: EmitterSource<IN>,
        private readonly _options: {
            state: STATE;
            reducer: (input: IN, state: STATE) => {
                cancelWhen?: boolean,
                emit: OUT | undefined,
                state: STATE
            }
        }
    )
    {}

    emit (observer: EmitterSourceObserver<OUT>, cancelToken: CancelToken): number {
        let state = this._options.state;
        let count = 0;
        const reducer = this._options.reducer;
        const linkedCancelSource = new CancelTokenSource(cancelToken);

        this._source.emit(value => {
            const reduced = reducer(value, state);
            if (reduced.emit){
                observer(reduced.emit, count);
                count++;
            }
            if (reduced.cancelWhen){
                linkedCancelSource.cancel();
            }
            state = reduced.state;
        }, linkedCancelSource);

        return count;
    }
}