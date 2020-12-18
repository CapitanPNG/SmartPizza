<script>

import { onMount } from 'svelte';

import AdditionalIngredientsDialog from './components/AdditionalIngredientsDialog.svelte';

import SearchArea from './components/SearchArea.svelte';

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
		"image": "https://www.ilfattoalimentare.it/wp-content/uploads/2017/04/Fotolia_75338534_Subscription_Monthly_M.jpg"
	},
	{
		"name":  "Patate",
		"image": "https://www.ricettedigusto.info/wp-content/uploads/2016/02/Patate-fritte-croccanti.jpg"
	},
	{
		"name":  "Funghi",
		"image": "https://www.ricettadicucina.com/upload/recipe/9/f/9/21bdcf108dd762f4287fb8008772fb0744a7fe65.jpg"
	},
	{
		"name":  "Salsicce",
		"image": "https://www.macelleriasalvi.it/wp-content/uploads/2020/03/salsicce-3-1.jpg"
	},
	{
		"name":  "Acciughe",
		"image": "https://www.baccalaria.it/wp-content/uploads/2016/02/colatura-di-alici.jpg"
	},
	{
		"name":  "Cipolle",
		"image": "https://file.cure-naturali.it/site/image/content/16531.jpg?format=jpg"
	}
];

window.MAX_SELECTED_ADDITIONAL_INGREDIENTS = 3;
window.ADDITIONAL_INGREDIENT_PRICE = 0.50;

let dialogsState = {
	"additionalIngredients": false
};

let searchResults = [];

let currentPizza = null;

let pizzaData = {};

let setDefaultsPizzaData = function () {
	for(let key in window.PIZZA) {
		pizzaData[key] = {
			"price": window.PIZZA[key].price,
			"quantity": 1,
			"additionalIngredients": []
		};
	}
};

let numSelectedAdditionalIngredients = 0;

window.shoppingCart = [];

let additionalPrice = 0;

let pizzaTotalPrice = 0;

let pizzaCalcPrice = function (pizzaId) {
	let price = window.PIZZAS[pizzaId].price;

	for(let key in window.selectedAdditionalIngredients[pizzaId]) {
		price += window.ADDITIONAL_INGREDIENT_PRICE;
	}

	price *= parseInt(document.querySelector(".pizza-item[key='" + pizzaId + "'] input").value);

	return price;
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
	<SearchArea bind:currentPizza bind:dialogsState bind:pizzaData />
	{#if dialogsState.additionalIngredients}
		<AdditionalIngredientsDialog
			onClose={()=>{dialogsState.additionalIngredients = false;}}
			{currentPizza}
			{numSelectedAdditionalIngredients}
		/>
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

.box-right {
	width: 67%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: start;
}

</style>