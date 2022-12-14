import { EnumerableImpl } from "./enumerable-impl";

export type EnumerableSource<T> = T[] | Iterable<T> | Enumerable<T>;

/**
 * Represents a conceptual sequence of values.
 */
export interface Enumerable<T> extends Iterable<T> {

}