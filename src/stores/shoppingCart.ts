import { writable } from 'svelte/store';

let value:Array<any> = [];

let shoppingCart = writable(value);

export { shoppingCart };