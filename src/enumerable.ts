import {
    ArrayEmitterSource,
    EmitterSource, EmitterSourceObserver,
    EmptyEmitterSource,
    FunctionEmitterSource,
    IterableEmitterSource
} from "./emitter";
import { CancelToken } from "./cancel-token";

function getValueOrThrowNoElements<T>(value: T | undefined): T {
    if (!value) throw new Error("sequence contains no elements");
    return value;
}

/**
 * Represents a conceptual sequence of values.
 */
export class Enumerable<T> extends EmitterSource<T> {

    private constructor(private readonly source: EmitterSource<T>){
        super();
    }

    *[Symbol.iterator](): IterableIterator<T> {
        const array = this.source.toArray();
        for (let c = 0; c < array.length; c++){
            yield array[c];
        }
    }

    /**
     * Applies an accumulator function over the underlying sequence of values and returns
     * an aggregated result.
     * @param seed The initial accumulation value.
     * @param accumulator A function that receives the current accumulation and a
     * value in the sequence, and returns a new accumulation to be used in the iteration of
     * the next value.
     * @param resultSelector A function that receives the final accumulation value and selects
     * the result to return.
     * @template A Accumulation value type
     * @template R Aggregation result type
     */
    aggregate<A>(seed: A, accumulator: (acc: A, next: T) => A): A;
    aggregate<A,R>(seed: A, accumulator: (acc: A, next: T) => A, resultSelector: (acc: A) => R): R;
    aggregate<A,R>(seed: A, accumulator: (acc: A, next: T) => A, resultSelector: (acc: A) => R = (a: A) => a as unknown as R) {
        for (let value of this){
            seed = accumulator(seed, value);
        }
        return resultSelector(seed);
    }

    /**
     * Returns whether all the values in the underlying sequence satisfy a condition.
     * @param predicate A function that receives each value and returns whether the
     * condition is satisfied.
     */
    all(predicate: (value: T) => boolean): boolean {
        for (let value of this){
            if (!predicate(value)) { return false; }
        }
        return true;
    }

    /**
     * Returns whether any value in the underlying sequence satisfied a condition. If
     * a predicate is not specified, this method returns true if at least one value would
     * be emitted.
     * @param predicate A function that receives each value and returns whether the
     * condition is satisfied. When this parameter is undefined, the behavior is
     * equivalent to specifying (value: T) => true.
     */
    any(predicate?: (value: T) => boolean): boolean {
        predicate = predicate ?? (_ => true);
        for (let value of this){
            if (predicate(value)) { return true; }
        }
        return false;
    }

    /**
     * Gets the number of values that would be emitted from the underlying sequence.
     * @param predicate A function that receives each value and returns whether the item
     * should be included in the count result. When this parameter is undefined, the behavior
     * is equivalent to specifying (value: T) => true.
     */
    count(predicate?: (value: T) => boolean): number {
        if (!predicate){
            return this.source.count();
        }
        let count = 0;
        for (let value of this){
            if (predicate(value)) { count++; }
        }
        return count;
    }

    /**
     * Emits values of the underlying source to the observer while the cancel token remains
     * unsignaled.
     * @param observer Function that receives each value.
     * @param cancelToken Token that can be observed for cancellation signals.
     */
    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        return this.source.emit(observer, cancelToken);
    }

    /**
     * Gets an instance that represents an empty sequence of values.
     */
    static empty<OUT>(): Enumerable<OUT> {
        return new Enumerable<OUT>(new EmptyEmitterSource());
    }

    /**
     * Creates an instance that represents the specified array or iterable source.
     * @param source Iterable to represent.
     */
    static from<T>(source: T[] | Iterable<T>): Enumerable<T> {
        const emitter = Array.isArray(source)
            ? new ArrayEmitterSource(source)
            : new IterableEmitterSource(source);
        return new Enumerable<T>(emitter);
    }

    /**
     * Returns the minimum value in the underlying sequence.
     * Throws Error if there are no values in the sequence.
     */
    min(): T {
        let m: T | undefined = undefined;
        for (let value of this){
            m = !m ? value : value < m ? value : m;
        }
        return getValueOrThrowNoElements(m);
    }

    /**
     * Returns the minimum value in the underlying sequence that contains the
     * minimum selected value.
     * @param selector A function that receives a value and returns a value to
     * compare.
     */
    minBy<R>(selector: (value: T) => R): T {
        let m: T | undefined = undefined, r: T | undefined = undefined;
        for (let value of this){

        }
    }

    /**
     * Returns a new enumerable that emits values selected by a function.
     * @param selector A function that receives a source value and returns the value to
     * project in the result.
     */
    select<R>(selector: (value: T) => R): Enumerable<R> {
        const my = this;
        const emitter = new FunctionEmitterSource<R>({
            emit(observer: EmitterSourceObserver<R>, cancelToken: CancelToken): number {
                let index = 0;
                my.emit((t,i) => {
                    observer(selector(t), index++);
                }, cancelToken);
                return index;
            }
        });
        return new Enumerable<R>(emitter);
    }

    /**
     * Returns the values of the underlying sequence as an array.
     */
    toArray(): T[] {
        return this.source.toArray();
    }

    /**
     * Returns a new enumerable that emits values that satisfy a predicate.
     * @param predicate A function that receives a source value and returns whether it should
     * be emitted in the result.
     */
    where(predicate: (value: T) => boolean): Enumerable<T> {
        const my = this;
        const emitter = new FunctionEmitterSource({
            emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
                let index = 0;
                my.emit(value => {
                    if (predicate(value)){
                        observer(value, index++);
                    }
                }, cancelToken);
                return index;
            }
        });
        return new Enumerable<T>(emitter);
    }
}