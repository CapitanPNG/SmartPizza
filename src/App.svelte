<script>

import { onMount } from 'svelte';

import { pizzaData } from './stores/pizzaData';
import { dialogsState } from './stores/dialogsState';
import { shoppingCart } from './stores/shoppingCart';
import { checkoutDone } from './stores/checkoutDone';

import AdditionalIngredientsDialog from './components/AdditionalIngredientsDialog.svelte';
import CartDialog from './components/CartDialog.svelte';
import SearchArea from './components/SearchArea.svelte';
import ResultDescription from './components/ResultDescription.svelte';
import Button from './components/Button.svelte';
import CheckoutMessage from './components/CheckoutMessage.svelte';

window.PIZZA = {
	"Margherita": {
		"image": "https://static.buttalapasta.it/r/845X0/www.buttalapasta.it/img/Pizza-Margherita-intera.jpg",
		"price": "4.50",
		"description": "Pizza description goes here ..."
	},
	"Margherita con bufala": {
		"image": "https://www.petitchef.it/imgupl/recipe/pizza-margherita-con-mozzarella-di-bufala--md-457932p714660.jpg",
		"price": "6.50",
		"description": "Pizza description goes here ..."
	},
	"Marinara": {
		"image": "https://wips.plug.it/cips/buonissimo.org/cms/2012/05/pizza-marinara-5.jpg",
		"price": "4.00",
		"description": "Pizza description goes here ..."
	},
	"Napoli": {
		"image": "https://www.funetta.it/_______vecchiowp/wp-content/uploads/2019/08/pizza_capperi_acciughe.jpg",
		"price": "6.00",
		"description": "Pizza description goes here ..."
	},
	"4 stagioni": {
		"image": "https://wips.plug.it/cips/buonissimo.org/cms/2012/05/pizza-alle-quattro-stagioni.jpg?w=712&a=c&h=406",
		"price": "7.00",
		"description": "Pizza description goes here ..."
	},
	"Capricciosa": {
		"image": "https://wips.plug.it/cips/buonissimo.org/cms/2019/09/pizza-capricciosa.jpg",
		"price": "7.00",
		"description": "Pizza description goes here ..."
	},
	"4 formaggi": {
		"image": "https://cdn.tasteatlas.com/images/dishrestaurants/8859616a33b242e7b6b254dde0bd6045.jpg?w=600&h=450",
		"price": "7.00",
		"description": "Pizza description goes here ..."
	},
	"Cotto e Porcini": {
		"image": "https://i0.wp.com/www.piccolericette.net/piccolericette/wp-content/uploads/2019/10/4102_Pizza.jpg?resize=895%2C616&ssl=1",
		"price": "7.50",
		"description": "Pizza description goes here ..."
	},
	"Tonno e cipolla": {
		"image": "https://www.bofrost.ch/writable/products/images-v2/15196.jpg",
		"price": "5.00",
		"description": "Pizza description goes here ..."
	},
	"Speck e Mascarpone": {
		"image": "https://media-cdn.tripadvisor.com/media/photo-s/0b/00/a4/f4/pizza-speck-e-mascarpone.jpg",
		"price": "8.50",
		"description": "Pizza description goes here ..."
	}
};

window.ADDITIONAL_INGREDIENTS = [
	{
		"name":  "Wurstel",
		"image": "./resources/imgs/Wurstel.jpg"
	},
	{
		"name":  "Patate",
		"image": "./resources/imgs/Patate.jpg"
	},
	{
		"name":  "Funghi",
		"image": "./resources/imgs/Funghi.jpg"
	},
	{
		"name":  "Salsicce",
		"image": "./Resources/imgs/Salsicce.webp"
	},
	{
		"name":  "Acciughe",
		"image": "./Resources/imgs/Acciughe.jpg"
	},
	{
		"name":  "Cipolle",
		"image": "./Resources/imgs/Cipolle.jpg"
	}
];

window.MAX_SELECTED_ADDITIONAL_INGREDIENTS = 3;
window.ADDITIONAL_INGREDIENT_PRICE = "0.50";

window.currencyFormatter = new Intl.NumberFormat(
    "it-IT",
    {
        "style"   : "currency",
        "currency": "EUR"
    }
);

let setDefaultsPizzaData = function () {
	for(let key in window.PIZZA) {
		$pizzaData[key] = {
			"price": window.PIZZA[key].price,
			"quantity": 1,
			"additionalIngredients": [],
			"tmp": {
				"additionalIngredients": []
			}
		};
	}
};

onMount(function(e) {
	setDefaultsPizzaData();
});

</script>

<svelte:head>
	<title>SmartPizza</title>
	<meta charset="utf-8">

	<link rel="stylesheet" href="./resources/fonts/Montserrat/font.css">
</svelte:head>

<main>
	<SearchArea />

	<ResultDescription />

	{#if $shoppingCart.length > 0}
		<Button>
			<div class="btn btn-color-full btn-go-to-cart"
				on:click={()=>{$dialogsState.cart = true;}}
			>
				Procedi al carrello
			</div>
		</Button>
	{/if}

	{#if $dialogsState.additionalIngredients}
		<AdditionalIngredientsDialog
			onClose={()=>{$dialogsState.additionalIngredients = false;}}
		/>
	{/if}

	{#if $dialogsState.cart}
		<CartDialog
			onClose={()=>{$dialogsState.cart = false;}}
		/>
	{/if}

	{#if $checkoutDone}
		<CheckoutMessage />
	{/if}
</main>

<style>

main {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
}

.btn-go-to-cart {
	margin: 10px;
	padding: 10px 16px;
	position: absolute;
	right: 0;
	top: 0;
}

</style>