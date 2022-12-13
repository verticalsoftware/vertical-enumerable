import {
    ArrayEmitterSource,
    StateWrappingEmitterSource,
    EmitterSource,
    EmitterSourceObserver,
    IterableIteratorEmitterSource
} from "./emitter";
import { CancelToken, CancelTokenSource } from "./cancel-token";

/**
 * Represents a conceptual sequence of T
 * @param T The type of values being represented
 */
export interface Enumerable<T> extends EmitterSource<T> {

    /**
     * Returns the result of an accumulator function applied over values emitted from
     * the underlying sequence.
     * @param {(acc: ACC, next: T) => ACC} accumulator An function that receives
     * the current accumulation and the next value in the sequence and returns a new
     * accumulated value.
     * @param {ACC} seed The initial value to provide to the accumulation function.
     * @returns {ACC} The last value returned by the accumulator function.
     */
    aggregate<ACC>(accumulator: (acc: ACC, next: T) => ACC, seed: ACC): ACC;

    /**
     * Returns whether all values emitted from the underlying sequence satisfy a condition.
     * @param {(value: T) => boolean} predicate The condition to test for each value.
     * @returns {boolean}
     */
    all(predicate: (value: T) => boolean): boolean;

    /**
     * Returns
     *  - If predicate is not given, whether at least one value would be emitted
     *  - If predicate is given, whether at least one value that satisfies the predicate would be
     *      emitted
     * @param {(value: T) => boolean} predicate Optional predicate
     * @returns {boolean}
     */
    any(predicate?: (value: T) => boolean): boolean;

    /**
     * Returns an enumerable that will emit the current underlying sequence and the additional
     * given value.
     * @param {T} value The value to append to the current instance.
     * @returns {Enumerable<T>}
     */
    append(value: T): Enumerable<T>;

    /**
     * Computes the average of a sequence of numbers.
     * @returns {number}
     */
    average(selector?: (value: T) => number): number;

    /**
     * Returns an enumerable that will emit the current underlying sequence followed by the
     * provided sequence.
     * @param {Enumerable<T>} values The sequence to append to the current instance.
     * @returns {Enumerable<T>}
     */
    concat(values: Enumerable<T>): Enumerable<T>;

    /**
     * Returns whether a value would be emitted that returns true using strict equality.
     * @param {T} value The value to test.
     * @returns {boolean}
     */
    contains(value: T): boolean;

    /**
     * Returns the number of items that would be emitted from the current underlying sequence.
     * @param {(value: T) => boolean} predicate Optional predicate that determines the values
     * included in the count.
     * @returns {number}
     */
    count(predicate?: (value: T) => boolean): number;

    /**
     * Returns an enumerable that will not emit any values if the underlying sequence is empty.
     * @returns {Enumerable<T>}
     */
    defaultIfEmpty(): Enumerable<T>;

    /**
     * Returns an enumerable that emits distinct values.
     * @param {(a: T, b: T) => boolean} comparer Optional function used to determine equality among
     * values.
     * @returns {Enumerable<T>}
     */
    distinct(comparer?: (a: T, b: T) => boolean): Enumerable<T>;

    /**
     * Returns an enumerable that emits values where uniqueness is determined by the value of a
     * key selector function.
     * @param {(value: T) => K} selector Function that selects the set value.
     * @param {(a: K, b: K) => boolean} comparer Optional function used to determine equality among the
     * keys.
     * @returns {Enumerable<T>}
     */
    distinctBy<K>(selector: (value: T) => K, comparer?: (a: K, b: K) => boolean): Enumerable<T>;

    /**
     * Returns an enumerable that will emit all values from the underlying sequence except values
     * that are present in the given sequence.
     * @param {Enumerable<T>} other The other sequence that contains the values to remove
     * @param {(value: T) => K} keySelector Optional function that selects a key to compare the
     * values with to determine uniqueness
     * @returns {Enumerable<T>}
     */
    except<K>(other: Enumerable<T>, keySelector?: (value: T) => K): Enumerable<T>;

    /**
     * Returns the first value emitted that satisfied a condition.
     * Throws an error if the sequence did not emit a matching value.
     * @param {(value: T) => boolean} predicate Optional predicate to which values are matched. If
     * not specified, the first value emitted is returned.
     * @returns {T}
     */
    first(predicate?: (value: T) => boolean): T;

    /**
     * Returns the first value emitted that satisfied a condition or 'undefined'.
     * @param {(value: T) => boolean} predicate Optional predicate to which values are matched. If
     * not specified, the first value emitted is returned.
     * @returns {T}
     */
    firstOrDefault(predicate?: (value: T) => boolean): T | undefined;

    /**
     * Emits each value in the sequence to a function.
     * @param {(value: T, index: number) => void} call
     */
    forEach(call: (value: T, index: number) => void): void;

    /**
     * Returns an enumerable that will emit all values from the underlying sequence for values
     * that are present in the given sequence.
     * @param {Enumerable<T>} other The other sequence that contains the values to remove
     * @param {(value: T) => K} keySelector Optional function that selects a key to compare the
     * values with to determine uniqueness
     * @returns {Enumerable<T>}
     */
    intersect<K>(other: Enumerable<T>, keySelector?: (value: T) => K): Enumerable<T>

    /**
     * Returns the last value emitted that satisfied a condition or throws an error indicating
     * the sequence is empty.
     * @param {(value: T) => boolean} predicate Optional predicate to which values are matched. If
     * not specified, the last value emitted is returned.
     * @returns {T}
     */
    last(predicate?: (value: T) => boolean): T;

    /**
     * Returns the last value emitted that satisfied a condition or 'undefined'.
     * @param {(value: T) => boolean} predicate Optional predicate to which values are matched. If
     * not specified, the last value emitted is returned.
     * @returns {T}
     */
    lastOrDefault(predicate?: (value: T) => boolean): T | undefined;

    /**
     * Returns an enumerable that will emit values of the underlying sequence that have been
     * transformed by a selector function.
     * @param {(value: T) => OUT} selector A function that returns the value to project
     * @returns {Enumerable<OUT>}
     */
    select<OUT>(selector: (value: T, index: number) => OUT): Enumerable<OUT>;

    /**
     * Returns an enumerable that will emit values after a number of values have been skipped.
     * @param {number} count The initial number of values to exclude from the sequence.
     * @returns {Enumerable<T>}
     */
    skip(count: number): Enumerable<T>;

    /**
     * Returns the sum of all emitted values.
     * @param {(value: T) => number} selector A function that returns the value to include in the sum.
     * @returns {number}
     */
    sum(selector?: (value: T) => number): number;

    /**
     * Returns an enumerable that will emit up to a specified number of values.
     * @param {number} count The max number of values to include from the sequence.
     * @returns {Enumerable<T>}
     */
    take(count: number): Enumerable<T>;

    /**
     * Projects each value to a Map using keys determined by a selector function.
     * Throws:
     *  If a key in the map would be duplicated
     * @param {(value: T) => K} keySelector Function used to compute a key for each emitted value.
     * @returns {Map<K, T>}
     */
    toMap<K>(keySelector: (value: T) => K): Map<K,T>;

    /**
     * Projects each value to a new array.
     * @returns {T[]}
     */
    toArray(): T[];

    /**
     * Projects each value to a ES6 Set.
     * @returns {Set<T>}
     */
    toSet(): Set<T>;

    /**
     * Returns an enumerable that emits a distinct set of values from the underlying sequence
     * and the provided sequence.
     * @param {Enumerable<T>} other Other sequence of values to union with this instance.
     * @param {(value: T) => K} keySelector Optional function that provides a key for each value that
     * determines uniqueness.
     * @returns {Enumerable<T>}
     */
    union<K>(other: Enumerable<T>, keySelector?: (value: T) => K): Enumerable<T>;

    /**
     * Returns an enumerable that emits underlying sequence values that satisfy a predicate.
     * @param {(value: T) => boolean} predicate A predicate that determines the values to emit.
     * @returns {Enumerable<T>}
     */
    where(predicate: (value: T) => boolean): Enumerable<T>;
}

/**
 * Implementation of Enumerable<T>
 */
class EnumerableImpl<T> implements Enumerable<T> {
    /**
     * Constructs a new instance
     * @param {EmitterSource<T>} source Underlying source emitter
     */
    constructor(source: EmitterSource<T>) {
        this._source = source;
    }

    private readonly _source: EmitterSource<T>;

    aggregate<ACC>(accumulator: (acc: ACC, next: T) => ACC, seed: ACC): ACC {
        this._source.emit(value => seed = accumulator(seed, value),
            CancelTokenSource.NEVER);
        return seed;
    }

    all(predicate: (value: T) => boolean): boolean {
        return this.statefulForEach(true, value => {
            const match = predicate(value);
            return { state: match, cancel: !match }
        })
    }

    any(predicate?: (value: T) => boolean): boolean {
        return this.statefulForEach(false, value => {
            const match = predicate?.(value) ?? true;
            return { state: match, cancel: match }
        });
    }

    append(value: T): Enumerable<T> {
        const capturedSource = this._source;
        return new EnumerableImpl({
            emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
                let index = capturedSource.emit(observer, cancelToken);
                if (!cancelToken.signaled){
                    observer(value, index);
                }
                return index + 1;
            }
        })
    }

    average(selector?: (value: T) => number): number {
        const resolvedSelector = selector ?? ((t: T) => Number(t));
        const stats = this.aggregate((acc, next) =>
            [acc[0] + 1, acc[1] + resolvedSelector(next)], [0,0]);
        const [count, sum] = stats;
        if (count === 0){
            throw new Error("sequence contains no elements");
        }
        return sum / count;
    }

    concat(values: Enumerable<T>): Enumerable<T> {
        const capturedSource = this._source;
        return new EnumerableImpl({
            emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
                let index = capturedSource.emit(observer, cancelToken);
                if (!cancelToken.signaled){
                    values.emit((value, i) => {
                        observer(value, index + i);
                    }, cancelToken);
                }
                return index + 1;
            }
        })
    }

    contains(value: any): boolean {
        return this.statefulForEach(false, other => {
            const match = value == other;
            return { state: match, cancel: match };
        })
    }

    count(predicate?: (value: T) => boolean): number {
        let count = 0;
        this._source.emit(value => {
            if (!predicate || predicate(value))
                count++;
        }, CancelTokenSource.NEVER);
        return count;
    }

    defaultIfEmpty(): Enumerable<T> {
        // Provided for "API compatibility". toArray() will always produce an empty instance
        return this;
    }

    distinct(comparer?: (a: T, b: T) => boolean): Enumerable<T> {
        return this.distinctBy(i => i, comparer);
    }

    distinctBy<K>(selector: (value: T) => K, comparer?: (a: K, b: K) => boolean): Enumerable<T> {
        return new EnumerableImpl<T>(new StateWrappingEmitterSource(
            this._source, {
                state: new Set<K>(),
                reducer: (input, state) => {
                    const key = selector(input);
                    const has = state.has(key);
                    return {
                        state: state.add(key),
                        emit: !has ? input : undefined
                    }
                }
            }
        ))
    }

    emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
        return this._source.emit(observer, cancelToken);
    }

    except<K>(other: Enumerable<T>, keySelector?: (value: T) => K): Enumerable<T> {
        const my = this;
        const resolvedKeySelector = keySelector ?? ((value: any) => <K>value);
        return new EnumerableImpl({
            emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
                const keys = other.select(t => resolvedKeySelector(t)).toSet();
                let index = 0;
                my.emit(value => {
                    if (keys.has(resolvedKeySelector(value)))
                        return;
                    observer(value, index++);
                }, CancelTokenSource.NEVER);
                return index;
            }
        })
    }

    first(predicate?: (value: T) => boolean): T {
        const result = this.firstOrDefault(predicate);
        if (!result){
            throw new Error("sequence contains no elements");
        }
        return result;
    }

    firstOrDefault(predicate?: (value: T) => boolean): T | undefined {
        return this.statefulForEach<T | undefined>(undefined, value => {
            const matched = predicate?.(value) ?? true;
            return { state: matched ? value : undefined, cancel: matched };
        });
    }

    forEach(call: (value: T, index: number) => void): void {
        this._source.emit((value, index) => call(value, index),
            CancelTokenSource.NEVER);
    }

    intersect<K>(other: Enumerable<T>, keySelector?: (value: T) => K): Enumerable<T> {
        const my = this;
        const resolvedKeySelector = keySelector ?? ((value: any) => <K>value);
        return new EnumerableImpl({
            emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
                const keys = other.select(t => resolvedKeySelector(t)).toSet();
                let index = 0;
                my.emit(value => {
                    if (!keys.has(resolvedKeySelector(value)))
                        return;
                    observer(value, index++);
                }, CancelTokenSource.NEVER);
                return index;
            }
        })
    }

    last(predicate?: (value: T) => boolean): T {
        const result = this.lastOrDefault(predicate);
        if (!result){
            throw new Error("sequence contains no elements");
        }
        return result;
    }

    lastOrDefault(predicate?: (value: T) => boolean): T | undefined {
        return this.statefulForEach<T | undefined>(undefined, value => {
            const matched = predicate?.(value) ?? true;
            return { state: matched ? value : undefined };
        })
    }

    skip(count: number): Enumerable<T> {
        if (count < 0) throw new Error("skip count cannot be less than zero");
        return new EnumerableImpl(new StateWrappingEmitterSource(this._source,{
            state: 0,
            reducer: (input, state) => ({
                emit: state >= count ? input : undefined,
                state: state + 1
            })
        }));
    }

    select<OUT>(selector: (value: T, index: number) => OUT): Enumerable<OUT> {
        const capturedSource = this._source;
        return new EnumerableImpl<OUT>({
            emit(observer: EmitterSourceObserver<OUT>, cancelToken: CancelToken): number {
                return capturedSource.emit((value, index) => observer(selector(value, index), index)
                    , cancelToken);
            }
        })
    }

    sum(selector?: (value: T) => number): number {
        const resolvedSelector = selector ?? ((t: T) => Number(t));
        return this.aggregate((acc, next) => acc + resolvedSelector(next), 0);
    }

    take(count: number): Enumerable<T> {
        if (count < 0) throw new Error("take count cannot be less than zero");
        return new EnumerableImpl(new StateWrappingEmitterSource(this._source, {
            state: 0,
            reducer: (input, state) => ({
                emit: state < count ? input : undefined,
                state: state + 1,
                cancelWhen: state >= count
            })
        }));
    }

    toArray(): T[] {
        const array: T[]=[];
        this.emit(value => array.push(value), CancelTokenSource.NEVER);
        return array;
    }

    toMap<K>(keySelector: (value: T) => K): Map<K, T> {
        const map = new Map<K, T>();
        this.emit(value => {
            const key = keySelector(value);
            if (map.has(key)){
                throw new Error(`Key '${key}' already added to the map`);
            }
            map.set(key, value);
        }, CancelTokenSource.NEVER);
        return map;
    }

    toSet(): Set<T> {
        const set = new Set<T>();
        this.emit(value => set.add(value), CancelTokenSource.NEVER);
        return set;
    }

    union<K>(other: Enumerable<T>, keySelector?: (value: T) => K): Enumerable<T> {
        const my = this;
        const resolvedKeySelector = keySelector ?? ((t: any) => <K>t);
        return new EnumerableImpl({
            emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
                const keys = new Set<K>();
                let index = 0;
                my.emit(value => {
                    const key = resolvedKeySelector(value);
                    if (!keys.has(key)){
                        observer(value, index++);
                        keys.add(key);
                    }
                }, cancelToken);
                other.emit(value => {
                    const key = resolvedKeySelector(value);
                    if (!keys.has(key)){
                        observer(value, index++);
                        keys.add(key);
                    }
                }, cancelToken);
                return index;
            }
        });
    }

    where(predicate: (value: T) => boolean): Enumerable<T> {
        const capturedSource = this._source;
        return new EnumerableImpl({
            emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
                let index = 0;
                capturedSource.emit((value, _) => {
                    if (predicate(value)){
                        observer(value, index++);
                    }
                }, cancelToken);
                return index;
            }
        })
    }

    private statefulForEach<STATE>(
        state: STATE,
        forEach: (value: T) => { state: STATE, cancel?: boolean }
    ){
        const source = this;
        const cancelToken = new CancelTokenSource();
        source.emit(value => {
            const iteration = forEach(value);
            state = iteration.state;
            if (iteration.cancel){
                cancelToken.cancel();
            }
        }, cancelToken);
        return state;
    }
}

/**
 * Creates an Enumerable<T> from a data source
 * @param {T[] | IterableIterator<T>} source Source data being an array or IterableIterator<T>
 * @returns {EnumerableImpl<T>}
 */
export function asEnumerable<T>(source: T[] | IterableIterator<T>): Enumerable<T> {
    return Array.isArray(source)
        ? new EnumerableImpl(new ArrayEmitterSource(source))
        : new EnumerableImpl(new IterableIteratorEmitterSource(source));
}

/**
 * Creates an Enumerable<T> that never emits values.
 * @returns {Enumerable<T>}
 */
export function asEmpty<T>(): Enumerable<T> {
    return new EnumerableImpl({
        emit(observer: EmitterSourceObserver<T>, cancelToken: CancelToken): number {
            return 0;
        }
    })
}