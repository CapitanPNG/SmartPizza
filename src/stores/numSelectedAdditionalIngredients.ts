import { writable } from 'svelte/store';

let value:number = 0;

let numSelectedAdditionalIngredients = writable(value);

export { numSelectedAdditionalIngredients };