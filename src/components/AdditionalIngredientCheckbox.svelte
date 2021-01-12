<script>

import { onMount } from 'svelte';

import { currentPizza } from '../stores/currentPizza';
import { pizzaData } from '../stores/pizzaData';

import Checkbox from './Checkbox.svelte';

export let numSelectedAdditionalIngredients;
export let data;

let checked = false;
let value   = data.name;

Array.prototype.findValue = function (val) {
    for(let i = 0; i < this.length; i++) {
        if(this[i] === val) {
            return i;
        }
    }

    return null;
};

Array.prototype.removeValue = function (val) {
    let result = [];

    for(let i = 0; i < this.length; i++) {
        if(this[i] !== val) {
            result.push(this[i]);
        }
    }

    return result;
}

let callbacks = {
    "swg-change": function (e) {
        //console.debug(e.detail);

        /*let data = e.detail;

        if(data.checked) {
            numSelectedAdditionalIngredients++;
        } else {
            numSelectedAdditionalIngredients--;
        }

        if(numSelectedAdditionalIngredients > window.MAX_SELECTED_ADDITIONAL_INGREDIENTS) {
            checked = true;
            checked = false;

            numSelectedAdditionalIngredients--;
        } else {
            console.debug("Num-Selected-Additional-Ingredients: " + numSelectedAdditionalIngredients);
        }*/

        switch(checked) {
            case false:
                numSelectedAdditionalIngredients--;

                if(numSelectedAdditionalIngredients < 0) {
                    numSelectedAdditionalIngredients = 0;
                }

                $pizzaData[$currentPizza].tmp.additionalIngredients
                =
                $pizzaData[$currentPizza].tmp.additionalIngredients
                .removeValue(value);
            break;
            case true:
                numSelectedAdditionalIngredients++;

                if(
                    numSelectedAdditionalIngredients
                    >
                    window.MAX_SELECTED_ADDITIONAL_INGREDIENTS
                ) {
                    numSelectedAdditionalIngredients
                    =
                    window.MAX_SELECTED_ADDITIONAL_INGREDIENTS;

                    checked = false;
                }

                if(!checked) {
                    return;
                }

                if(
                    $pizzaData[$currentPizza].tmp.additionalIngredients
                    .findValue(value)
                    ===
                    null
                ) {
                    $pizzaData[$currentPizza].tmp.additionalIngredients
                    .push(value);
                }
            break;
        }
    }
};

onMount(function(e) {
    for(let i = 0; i < $pizzaData[$currentPizza].additionalIngredients.length; i++) {
        if($pizzaData[$currentPizza].additionalIngredients[i] === value) {
            checked = true;
        }
    }
});

</script>

<div class="additional-ingredient-checkbox">
    <Checkbox
        bind:checked
        {value}
        on:swg-input={callbacks["swg-input"]}
        on:swg-change={callbacks["swg-change"]}
    >
        <div slot="body" class="cb-body">
            <div class="image-box">
                <img src={data.image} alt={data.name}>
            </div>
        </div>
        <div slot="label" class="cb-label">
            {data.name}
        </div>
    </Checkbox>
</div>

<style>

.additional-ingredient-checkbox {
    width: 140px;
    height: 128px;
    margin: 10px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.additional-ingredient-checkbox :global(.checkbox) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #80c1ff;
    border-radius: 5px;
}

.additional-ingredient-checkbox :global(.checkbox-body) {
    width: 100%;
    height: 102px;
    display: block;
    /*display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;*/
    color: #ffffff;
    background-color: transparent;
    font-weight: 400;
    font-size: 12px;
}

.additional-ingredient-checkbox .cb-body {
    width: 100%;
    height: 100%;
    display: block;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.image-box {
    width: 100%;
    height: 100%;
    display: block;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.additional-ingredient-checkbox :global(.checkbox-footer) {
    width: 100%;
    height: 26px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
} 

.additional-ingredient-checkbox :global(.checkbox-label) {
    height: 100%;
    padding: 0 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    background-color: #0085ff;
    font-weight: 400;
    font-size: 12px;
    flex-grow: 1;
    border-bottom-left-radius: 5px;
}

.additional-ingredient-checkbox :global(.checkbox-emulator-box) {
    width: 26px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 800;
    font-size: 14px;
}

.text {
    /*padding: 4px 20px;*/
    /*height: 100%;
    background-color: #0085ff;
    border-bottom-left-radius: 5px;
    flex-grow: 1;*/
}

.text,
.checkbox {
    width: 26px;
    /*display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;*/
}

</style>