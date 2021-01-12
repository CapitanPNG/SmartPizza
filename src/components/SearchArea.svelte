<script>

import { searchResults } from '../stores/searchResults';

import SearchBar from './SearchBar.svelte';
import SearchResults from './SearchResults.svelte';
import SearchResult from './SearchResult.svelte';

export let dialogsState;
export let currentPizza = null;
export let pizzaData;
export let shoppingCart;

</script>

<div class="search-area">
    <SearchBar />
    <SearchResults>
        {#each $searchResults as id}
            <SearchResult
                bind:dialogsState
                bind:currentPizza
                bind:pizzaData
                bind:shoppingCart
                {id}
            />
        {/each}
    </SearchResults>
</div>

<style>

.search-area {
    width: 33%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: inherit;
    border-right: 1px solid #0085ff;
}

</style>