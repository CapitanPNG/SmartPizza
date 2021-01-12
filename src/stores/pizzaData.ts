import { writable } from 'svelte/store';

let value:Array<string> = [];

let pizzaData = writable(value);

export { pizzaData };