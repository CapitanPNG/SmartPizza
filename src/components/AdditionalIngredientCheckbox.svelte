<script>
    
import { onMount } from 'svelte';

import Checkbox from './Checkbox.svelte';

export let data;

let checked = false;
let value   = data.name;

</script>

<div class="additional-ingredient-checkbox">
    <Checkbox {checked} {value}>
        <div slot="body">
            <div class="image-box">
                <img src={data.image} alt={data.name}>
            </div>
        </div>
        <div slot="label">
            <div class="text">
                {data.name}
            </div>
        </div>
    </Checkbox>
</div>

<!--<label class="additional-ingredient">
    <div class="image-box">
        <img src={additionalIngredient.image} alt={additionalIngredient.name}>
    </div>
    <div class="label">
        <div class="text">
            {additionalIngredient.name}
        </div>
        <div class="checkbox">
            <input type="checkbox" class="controller" bind:this={controller} value={additionalIngredient.name}>
            <div class="checkbox-symbol">
                ✓
            </div>
        </div>
    </div>
</label>-->

<style>

.additional-ingredient-checkbox {
    width: 140px;
    margin: 10px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.additional-ingredient-checkbox :global(.checkbox) {
    height: 100%;
    background-color: #80c1ff;
    border-bottom-right-radius: 5px;
}

.image-box {
    width: 100%;
    height: 100%;
    display: block;
}

img {
    width: 100%;
    height: 90px;
    display: table;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    object-fit: cover;
}

.additional-ingredient-checkbox :global(.checkbox-body) {
    width: 100%;
    height: 26px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    background-color: transparent;
    font-weight: 400;
    font-size: 12px;
}

.additional-ingredient-checkbox :global(.checkbox-label) {
    width: 100%;
    height: 26px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    background-color: transparent;
    font-weight: 400;
    font-size: 12px;
}

.text {
    /*padding: 4px 20px;*/
    height: 100%;
    background-color: #0084ff;
    border-bottom-left-radius: 5px;
    flex-grow: 1;
}

.checkbox-symbol {

}

.controller {
    display: none;
}

.controller:checked + .checkbox-symbol {
    visibility: visible;
}

.controller:not(:checked) + .checkbox-symbol {
    visibility: hidden;
}

.text,
.checkbox {
    width: 26px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

</style>