import { asEnumerable } from "./enumerable";

const items = [
    "apples", "bananas", "cherries", "dates", "eggs", "figs", "grapes", "mango", "nuts"
];

const query = asEnumerable(items);

console.log(typeof query);

console.log(query.toArray());