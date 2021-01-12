import { writable } from 'svelte/store';

let value:{[key:string] : boolean} = {
	"additionalIngredients": false,
	"cart"                 : false
};

let dialogsState = writable(value);

export { dialogsState };