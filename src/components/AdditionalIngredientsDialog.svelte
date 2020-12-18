<script>

import { onMount } from 'svelte';

import Dialog from './Dialog.svelte';

import AdditionalIngredientCheckbox from "./AdditionalIngredientCheckbox.svelte";
import Button from './Button.svelte';
import { element } from 'svelte/internal';

export let onClose = ()=>{};

export let dialogsState;
export let currentPizza;
export let pizzaData;
export let numSelectedAdditionalIngredients;

let additionalPrice = 0;

let options = null;

$: additionalPrice = numSelectedAdditionalIngredients * window.ADDITIONAL_INGREDIENT_PRICE;

let saveAdditionalIngredients = function () {
    pizzaData[currentPizza].additionalIngredients = [];

    options.querySelectorAll("input").forEach(function(element) {
        if(element.checked) {
            pizzaData[currentPizza].additionalIngredients.push(element.value);
        }
    });

    dialogsState.additionalIngredients = false;

    console.debug("Additional-Ingredients-Saved: ");
    console.debug(pizzaData[currentPizza].additionalIngredients);
};

onMount(function(e) {
    numSelectedAdditionalIngredients = 0;

    options.querySelectorAll("input").forEach(function(element) {
        for(let i = 0; i < pizzaData[currentPizza].additionalIngredients.length; i++) {
            let value = pizzaData[currentPizza].additionalIngredients[i];

            if(element.value === value) {
                element.checked = element.value === value;

                numSelectedAdditionalIngredients++;
            }
        }
    });
});

</script>

<Dialog {onClose} >
    <div slot="header" class="dialog-header">
        <div class="pizza-name">
            Pizza {currentPizza}
        </div>
        <div class="additional-price">
            Costo aggiuntivo unitario di {additionalPrice} €
        </div>
    </div>
    <div slot="body" class="dialog-body">
        <div class="hint">
            Seleziona fino a {window.MAX_SELECTED_ADDITIONAL_INGREDIENTS} ingredienti da aggiungere alla tua pizza
        </div>
        <div class="options" bind:this={options}>
            {#each window.ADDITIONAL_INGREDIENTS as data}
                <AdditionalIngredientCheckbox
                bind:numSelectedAdditionalIngredients
                {data}
                />
            {/each}
        </div>
        <div class="controls-box">
            <Button>
                <div class="btn btn-save" on:click={saveAdditionalIngredients}>
                    Salva
                </div>
            </Button>
        </div>
    </div>
</Dialog>

<style>

.dialog-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    color: #ffffff;
    background-color: #0084ff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.pizza-name {
    font-weight: 500;
    font-size: 16px;
}

.additional-price {
    width: 248px;
    padding: 10px 20px;
    margin-left: 30px;
    font-weight: 500;
    font-size: 12px;
    background-color: #4ca9ff;
    border: 1px solid #60B3FF;
    border-radius: 5px;
}

.dialog-body {
    width: 100%;
    padding: 6px;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.hint {
    width: 100%;
    padding: 16px 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
}

.options {
    width: 480px;
    display: block;
    margin: 20px 10px;
}

.controls-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
}

.btn {
    padding: 8px 30px;
    color: #ffffff;
    background-color: #4ca9ff;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
}

</style>