<script>

import { onMount } from 'svelte';

import Dialog from './Dialog.svelte';

import AdditionalIngredientCheckbox from "./AdditionalIngredientCheckbox.svelte";
import Button from './Button.svelte';

export let onClose = ()=>{};

export let currentPizza;

export let additionalPrice;

/*onMount(function(e) {
    window.numSelectedAdditionalIngredients = 0;
    additionalPrice = 0;

    document.querySelectorAll(".custom-ingredients-dialog-box input").forEach(function(input) {
        if(window.selectedAdditionalIngredients[currentPizza]) {
            for(let i = 0; i < window.selectedAdditionalIngredients[currentPizza].length; i++) {
                if(input.value === window.selectedAdditionalIngredients[currentPizza][i]) {
                    input.checked = true;

                    window.numSelectedAdditionalIngredients++;
                }
            }

            additionalPrice = window.numSelectedAdditionalIngredients * window.ADDITIONAL_INGREDIENT_PRICE;
        }
    });
});*/

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
        <div class="options">
            {#each window.ADDITIONAL_INGREDIENTS as data}
                <AdditionalIngredientCheckbox {data} />
            {/each}
        </div>
        <div class="controls-box">
            <Button>
                <div class="btn btn-save">
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