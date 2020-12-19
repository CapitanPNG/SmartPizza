<script>

import NumericTextfield from './NumericTextfield.svelte';

export let item;

</script>

<div class="cart-item">
    <div class="pizza-name">
        {item.id.name} ( {item.id.price} )
    </div>
    <div class="pizza-additional-ingredients">
        {#each item.additionalIngredients as additionalIngredient}
            <div class="pizza-additional-ingredient-box">
                <div class="pizza-additional-ingredient">
                    {additionalIngredient.name} ( + {additionalIngredient.price} )
                </div>
            </div>
        {/each}
    </div>
    <div class="pizza-quantity">
        <NumericTextfield label="Quantità" minValue=1 value={item.quantity} />
    </div>
    <div class="pizza-total-price-box">
        per un costo di 
        <span class="pizza-total-price">
            {item.totalPrice}
        </span>
    </div>
</div>

<style>

.cart-item {
    margin: 0 10px;
    padding: 10px;
    border-bottom: 1px solid #757575;
}

.pizza-name {
    color: #757575;
    font-weight: 500;
    font-size: 14px;
}

.pizza-additional-ingredients {
    margin: 4px;
}

.pizza-additional-ingredient-box {
    border-left: 1px solid #757575;
    border-bottom: 1px solid #757575;
}

.pizza-additional-ingredient {
    display: block;
    padding: 0 6px;
    padding-right: 0;
    color: #757575;
    background-color: #ffffff;
    position: relative;
    left: 10px;
    top: 8px;
    font-weight: 500;
    font-size: 14px;
}

.pizza-quantity {

}

.pizza-total-price-box {
    color: #757575;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
}

.pizza-total-price {
    color: #0085ff;
}

</style>