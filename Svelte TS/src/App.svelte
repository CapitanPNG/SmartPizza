<script>

import { onMount } from 'svelte';

import SWGDialog from '../components/SWGDialog.svelte';

import SearchBar from '../components/SearchBar.svelte';

import PizzaItem from '../components/PizzaItem.svelte';
import PizzaDetails from '../components/PizzaDetails.svelte';

import AdditionalIngredientsDialog from '../components/AdditionalIngredientsDialog.svelte';

import { extendHTMLElement } from '../public/resources/scripts/HTMLElement-extensions';

import { getSelectedCheckboxesValues } from '../public/resources/scripts/get-selected-checkboxes-values.js';

window.PIZZAS = {
	"Margherita": {
		image: "https://static.buttalapasta.it/r/845X0/www.buttalapasta.it/img/Pizza-Margherita-intera.jpg",
		price: 4.50,
		description: "Pizza description goes here ..."
	},
	"Margherita con bufala": {
		image: "https://www.petitchef.it/imgupl/recipe/pizza-margherita-con-mozzarella-di-bufala--md-457932p714660.jpg",
		price: 6.50,
		description: "Pizza description goes here ..."
	},
	"Marinara": {
		image: "https://wips.plug.it/cips/buonissimo.org/cms/2012/05/pizza-marinara-5.jpg",
		price: 4.00,
		description: "Pizza description goes here ..."
	},
	"Napoli": {
		image: "https://www.funetta.it/_______vecchiowp/wp-content/uploads/2019/08/pizza_capperi_acciughe.jpg",
		price: 6.00,
		description: "Pizza description goes here ..."
	},
	"4 stagioni": {
		image: "https://wips.plug.it/cips/buonissimo.org/cms/2012/05/pizza-alle-quattro-stagioni.jpg?w=712&a=c&h=406",
		price: 7.00,
		description: "Pizza description goes here ..."
	},
	"Capricciosa": {
		image: "https://wips.plug.it/cips/buonissimo.org/cms/2019/09/pizza-capricciosa.jpg",
		price: 7.00,
		description: "Pizza description goes here ..."
	},
	"4 formaggi": {
		image: "https://cdn.tasteatlas.com/images/dishrestaurants/8859616a33b242e7b6b254dde0bd6045.jpg?w=600&h=450",
		price: 7.00,
		description: "Pizza description goes here ..."
	},
	"Cotto e Porcini": {
		image: "https://i0.wp.com/www.piccolericette.net/piccolericette/wp-content/uploads/2019/10/4102_Pizza.jpg?resize=895%2C616&ssl=1",
		price: 7.50,
		description: "Pizza description goes here ..."
	},
	"Tonno e cipolla": {
		image: "https://www.bofrost.ch/writable/products/images-v2/15196.jpg",
		price: 5.00,
		description: "Pizza description goes here ..."
	},
	"Speck e Mascarpone": {
		image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/00/a4/f4/pizza-speck-e-mascarpone.jpg",
		price: 8.50,
		description: "Pizza description goes here ..."
	}
};

window.ADDITIONAL_INGREDIENTS = [
	{
		name:  "Wurstel",
		image: "https://www.ilfattoalimentare.it/wp-content/uploads/2017/04/Fotolia_75338534_Subscription_Monthly_M.jpg"
	},
	{
		name:  "Patate",
		image: "https://www.ricettedigusto.info/wp-content/uploads/2016/02/Patate-fritte-croccanti.jpg"
	},
	{
		name:  "Funghi",
		image: "https://www.ricettadicucina.com/upload/recipe/9/f/9/21bdcf108dd762f4287fb8008772fb0744a7fe65.jpg"
	},
	{
		name:  "Salsicce",
		image: "https://www.ilm.it/it/wp-content/uploads/sites/6/salsiccia.jpg"
	},
	{
		name:  "Acciughe",
		image: "https://www.baccalaria.it/wp-content/uploads/2016/02/colatura-di-alici.jpg"
	},
	{
		name:  "Cipolle",
		image: "https://file.cure-naturali.it/site/image/content/16531.jpg?format=jpg"
	}
];

window.MAX_SELECTED_ADDITIONAL_INGREDIENTS = 3;
window.ADDITIONAL_INGREDIENT_PRICE = 0.50;

window.numSelectedAdditionalIngredients = 0;
window.selectedAdditionalIngredients = {};

window.shoppingCart = [];

let searchResults = [];

let currentPizza = null;

let showAdditionalIngredientsDialog = false;

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

extendHTMLElement();

onMount(function() {
	let textfieldSearch = document.getElementById("tf_search");

	textfieldSearch.focus();

	textfieldSearch.addEventListener(
		"keyup",
		function(e) {
			//console.debug(e.key);

			searchResults = [];

			for(let key in window.PIZZAS) {
				if(key.toLowerCase().indexOf(textfieldSearch.value.toLowerCase()) !== -1) {
					searchResults.push(key);
				}
			}

			console.debug("\nSearch-Results: ");
			console.debug(searchResults);
			console.debug("\n");
		}
	);

	let boxSearchResults = document.getElementsByClassName("search-results").item(0);

	boxSearchResults.delegateFor(
		".pizza-image-box",
		"click",
		function(e) {
			//console.debug(e);

			currentPizza = e.realTarget.climbUntil("pizza-item").getAttribute("key");

			console.debug("\nCurrent-Pizza: " + currentPizza + "\n");
		}
	);

	boxSearchResults.delegateFor(
		"[object='pizza.add-ingredients']",
		"swg-input",
		function(e) {
			//console.debug(e);

			currentPizza = e.realTarget.climbUntil("pizza-item").getAttribute("key");

			console.debug("\nCurrent-Pizza: " + currentPizza + "\n");

			showAdditionalIngredientsDialog = true;
		}
	);

	boxSearchResults.delegateFor(
		"[object='pizza.add-to-cart']",
		"swg-input",
		function(e) {
			//console.debug(e);

			let pizzaItem = e.realTarget.climbUntil("pizza-item");

			currentPizza = pizzaItem.getAttribute("key");

			let pizzaQty = pizzaItem.querySelector(".pizza-qty .swg");

			let qty = pizzaQty.getData("value");

			let additionalIngredients = [];

			if(window.selectedAdditionalIngredients[currentPizza]) {
				for(let i = 0; i < window.selectedAdditionalIngredients[currentPizza].length; i++) {
					additionalIngredients.push(window.selectedAdditionalIngredients[currentPizza][i]);
				}
			}

			let product = {
				id:  currentPizza,
				qty: qty,
				additionalIngredients: additionalIngredients
			};

			window.shoppingCart.push(product);

			console.debug("\nShopping-Cart: ");
			console.debug(window.shoppingCart);

			pizzaQty.setData(
				"value",
				1
			);
			additionalPrice = 0;
			window.selectedAdditionalIngredients = {};
		}
	);

	boxSearchResults.delegateFor(
		"[object='pizza.qty']",
		"swg-change",
		function(e) {
			//console.debug(e);

			console.debug(e.data);
		}
	);

	document.body.delegateFor(
		".custom-ingredients-dialog",
		"click",
		function(e) {
			//console.debug(e);

			if(e.originalEvent.target.classList.contains("custom-ingredients-dialog")) {
				window.numSelectedAdditionalIngredients = 0;

				showCustomIngredientsDialog = false;

				pizzaTotalPrice = pizzaCalcPrice(currentPizza);

				let pizzaItem = document.querySelector(".pizza-item[key='" + currentPizza + "']");

				pizzaItem.querySelector(".pizza-price").innerHTML = pizzaTotalPrice + " €";
			}
		}
	);

	document.body.delegateFor(
		".additional-ingredient .controller",
		"change",
		function(e) {
			//console.debug(e);
			
			/*let numSelectedAdditionalIngredients = 0;

			Array.from(document.getElementsByClassName("additional-ingredient")).forEach(function(element) {
				//console.debug(element);

				if(element.getAttribute("checked") === "true") {
					numSelectedAdditionalIngredients++;
				}
			});*/

			if(e.realTarget.checked) {
				window.numSelectedAdditionalIngredients++;
			} else {
				window.numSelectedAdditionalIngredients--;
			}

			if(window.numSelectedAdditionalIngredients > window.MAX_SELECTED_ADDITIONAL_INGREDIENTS) {
				e.realTarget.checked = false;

				window.numSelectedAdditionalIngredients--;
			}

			console.debug("\nNum-Selected-Additional-Ingredients: " + window.numSelectedAdditionalIngredients);

			additionalPrice = window.ADDITIONAL_INGREDIENT_PRICE * window.numSelectedAdditionalIngredients;

			console.debug("\nAdditional-Price: " + additionalPrice);

			pizzaTotalPrice = window.PIZZAS[currentPizza].price;

			pizzaTotalPrice += (window.numSelectedAdditionalIngredients * window.ADDITIONAL_INGREDIENT_PRICE);

			let pizzaItem = document.querySelector(".pizza-item[key='" + currentPizza + "']");

			pizzaTotalPrice *= parseFloat(pizzaItem.querySelector("input").value);

			pizzaItem.querySelector(".pizza-price").innerHTML = pizzaTotalPrice + " €";
		}
	);

	document.body.delegateFor(
		"[object='pizza.additional-ingredients-save']",
		"swg-input",
		function(e) {
			//console.debug(e);

			let customIngredientsDialog = document.querySelector(".custom-ingredients-dialog");

			let elementCheckboxContainer = customIngredientsDialog.querySelector(".options");

			let selectedCheckboxesValues = getSelectedCheckboxesValues(elementCheckboxContainer);

			console.debug("\nSelected-Checkboxes-Values: ");
			console.debug(selectedCheckboxesValues);

			window.selectedAdditionalIngredients[currentPizza] = selectedCheckboxesValues;

			console.debug("\nSelected-Additional-Ingredients: ");
			console.debug(window.selectedAdditionalIngredients);

			customIngredientsDialog.click();
		}
	);

	document.body.delegateFor(
		"",
		"swg-dialog-before-closing",
		function(e) {
			//console.debug(e);
			
			//showAdditionalIngredientsDialog = false;
		}
	);

	window.addEventListener(
		"keyup",
		function(e) {
			//console.debug(e);

			if(e.key === "b") {// BUY
				let a = document.createElement("a");

				a.href = URL.createObjectURL(
					new Blob(
						[
							JSON.stringify(
								window.shoppingCart,
								null,
								4
							)
						],
						{
							type: "text/plain"
						}
					)
				);

				a.download = "shoppingCart.txt";

				document.body.appendChild(a);

				a.click();
				a.remove();
			}
		}
	);
});

</script>

<svelte:head>
	<title>SmartPizza</title>
	<meta charset="utf-8">

	<link rel="stylesheet" href="./resources/fonts/Montserrat/font.css">
</svelte:head>

<main>
	<div class="box-left">
		<SearchBar />
		<div class="search-results">
			{#each searchResults as result}
				<PizzaItem id={result} />
			{/each}
		</div>
	</div>
	<div class="box-right">
		<PizzaDetails id={currentPizza}/>
	</div>
	{#if showAdditionalIngredientsDialog}
		<!--<CustomIngredientsDialog {currentPizza} {additionalPrice} />-->

		<AdditionalIngredientsDialog />
	{/if}
</main>

<style>

:global(*) {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
	font-family: "Montserrat";
}

:global(body) {
	margin: 0;
	padding: 0;
	position: absolute;
	width: 100%;
	height: 100%;
}

:global(input) {
	margin: 0;
}

main {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
}
.box-left {
	width: 33%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: inherit;
	border-right: 1px solid #0084ff;
}

.box-right {
	width: 67%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: start;
}

.search-results {
	width: 100%;
	display: block;
	background-color: inherit;
	overflow-y: auto;
	flex-grow: 1;
}

</style>