import { writable } from 'svelte/store';

let value:string = null;

let currentPizza = writable(value);

export { currentPizza };