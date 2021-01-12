import { writable } from 'svelte/store';

let value:boolean = false;

let checkoutDone = writable(value);

export { checkoutDone };