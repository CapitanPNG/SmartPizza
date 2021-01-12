<script>

import { shoppingCart } from '../stores/shoppingCart';

import NumericTextfield from './NumericTextfield.svelte';

export let item;
export let index;
export let checkoutTotalPrice;

let getCheckoutTotalPrice = function () {
    let result = 0;

    for(let i = 0; i < $shoppingCart.length; i++) {
        let value = $shoppingCart[i];

        let price = value.totalPrice.substring(
            0,
            4
        );
        
        price = price.replace(
            /\,/,
            "."
        );

        price = parseFloat(price);

        result += price;
    }

    return window.currencyFormatter.format(result);
};

$: $shoppingCart[index].totalPrice =
    window.currencyFormatter.format(
        $shoppingCart[index].quantity
        *
        (
            parseFloat(window.PIZZA[$shoppingCart[index].id.name].price)
            +
            (
                $shoppingCart[index].additionalIngredients.length
                *
                window.ADDITIONAL_INGREDIENT_PRICE
            )
        )
    )
;

$: checkoutTotalPrice = getCheckoutTotalPrice();

let callbacks = {
    "change": function (e) {
        $shoppingCart[index].quantity = e.detail.value;
        
        item.quantity = $shoppingCart[index].quantity;

        item = item;

        window.setTimeout(
            function() {
                checkoutTotalPrice = getCheckoutTotalPrice();
            },
            500
        );
    }
};

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
        <NumericTextfield
            bind:value={item.quantity}

            label="Quantità"
            minValue=1

            on:swg-change={callbacks.change}
        />
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