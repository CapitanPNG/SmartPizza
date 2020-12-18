<script>

let value = "";

export let searchResults = [];

let callbacks = {
    "keyup": function (e) {
        searchResults = [];

        for(let key in window.PIZZA) {
            if(key.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                searchResults.push(key);
            }
        }
    }
};

</script>

<div class="search-bar">
    <input type="text" placeholder="Cerca pizza" bind:value on:keyup={callbacks.keyup}>
</div>

<style>

.search-bar {
    width: 100%;
    padding: 0 10px;
    background-color: #0085ff;
}

input {
    width: 100%;
    margin: 10px 0;
    padding: 8px 10px;
    color: #ffffff;
    background-color: transparent;
    border: none;
    border-top: 1px solid transparent;
    border-bottom: 1px solid #ffffff;
    font-weight: 400;
    font-size: 16px;
}

::placeholder,
::-moz-placeholder,
::-webkit-input-placeholder {
    opacity: 1;
}

</style>