<script>

import SearchBar from './SearchBar.svelte';
import SearchResults from './SearchResults.svelte';
import SearchResult from './SearchResult.svelte';

let searchResults = [];

</script>

<div class="search-area">
    <SearchBar bind:searchResults />
    <SearchResults>
        {#each searchResults as id}
            <SearchResult {id} />
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
    
    width: 40%;
}

</style>