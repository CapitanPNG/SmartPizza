import { writable } from 'svelte/store';

let value:number = 0;

let checkoutTotalPrice = writable(value);

export { checkoutTotalPrice };