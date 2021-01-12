import { writable } from 'svelte/store';

let value:Array<string> = [];

let searchResults = writable(value);

export { searchResults };