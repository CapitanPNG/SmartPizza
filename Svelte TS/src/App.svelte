<script>

import { onMount } from 'svelte';

import SearchBar from '../components/SearchBar.svelte';

import PizzaItem from '../components/PizzaItem.svelte';
import PizzaDetails from '../components/PizzaDetails.svelte';

import { extendHTMLElement } from '../public/resources/scripts/HTMLElement-extensions';

window.pizzas = {
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

window.extraIngredients = [
	"Wurstel",
	"Patate",
	"Funghi",
	"Salsicce",
	"Acciughe",
	"Cipolle"
];

let searchResults = [];

let currentPizza = null;

extendHTMLElement();

onMount(function() {
	let textfieldSearch = document.getElementById("tf_search");

	textfieldSearch.focus();

	textfieldSearch.addEventListener(
		"keyup",
		function(e) {
			//console.debug(e.key);

			searchResults = [];

			for(let key in window.pizzas) {
				if(key.toLowerCase().indexOf(textfieldSearch.value.toLowerCase()) !== -1) {
					searchResults.push(key);
				}
			}

			console.debug("searchResults: ");
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

			console.debug(currentPizza);
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