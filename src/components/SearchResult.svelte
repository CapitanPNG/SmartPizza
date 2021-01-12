<script>

import { currentPizza } from '../stores/currentPizza';

import Button from './Button.svelte';
import NumericTextfield from './NumericTextfield.svelte';

export let dialogsState;
export let pizzaData;
export let id;
export let shoppingCart;

$: pizzaData[id].price =
    window.currencyFormatter.format(
        (
            pizzaData[id].quantity
            *
            (
                parseFloat(window.PIZZA[id].price)
                +
                (
                    pizzaData[id].additionalIngredients.length
                    *
                    window.ADDITIONAL_INGREDIENT_PRICE
                )
            )
        )
    )
;

let showPizzaDetails = function () {
    $currentPizza = id;
};

let openAdditionalIngredientsDialog = function () {
    $currentPizza = id;

    dialogsState.additionalIngredients = true;
}

let addToCart = function () {
    showPizzaDetails();

    let identifier = {
        "name" : id,
        "price": window.currencyFormatter.format(parseFloat(window.PIZZA[id].price))
    };

    let additionalIngredients = [];

    for(let i = 0; i < pizzaData[id].additionalIngredients.length; i++) {
        additionalIngredients.push({
            "name" : pizzaData[id].additionalIngredients[i],
            "price": window.currencyFormatter.format(parseFloat(window.ADDITIONAL_INGREDIENT_PRICE))
        });
    }

    let quantity = pizzaData[id].quantity;

    let item = {
        "id"                   : identifier,
        "additionalIngredients": additionalIngredients,
        "quantity"             : quantity,
        "totalPrice"           : pizzaData[id].price
    };

    shoppingCart.push(item);

    shoppingCart = shoppingCart;

    pizzaData[id].price =
        window.currencyFormatter.format(
            parseFloat(
                window.PIZZA[id].price
            )
        )
    ;

    pizzaData[id].quantity = 1;

    pizzaData[id].additionalIngredients = [];

    console.debug("Shopping-Cart: ");
    console.debug(shoppingCart);
};

</script>

<div class="search-result pizza-item">
    <div class="pizza-image-box" on:click={showPizzaDetails}>
        <div class="pizza-image">
            <img src={window.PIZZA[id].image} alt={"Pizza " + id}>
        </div>
        <div class="pizza-name">
            {id}
        </div>
    </div>
    <div class="pizza-controls">
        <div class="pizza-price">
            {pizzaData[id].price}
        </div>
        <div class="pizza-quantity">
            <NumericTextfield label="Quantità" minValue=1 bind:value={pizzaData[id].quantity} />
        </div>
        <div class="pizza-buttons">
            <Button>
                <div class="btn btn-color btn-add-ingredients"on:click={openAdditionalIngredientsDialog}>
                    Aggiungi ingredienti
                </div>
            </Button>
            <Button>
                <div class="btn btn-color-full btn-add-to-cart" on:click={addToCart}>
                    Aggiungi al carrello
                </div>
            </Button>
        </div>
    </div>
</div>

<style>

.pizza-item {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #0084ff;
}

.pizza-image-box {
    width: 200px;
    height: 220px;
    position: relative;
    border: 1px solid #0084ff;
    border-radius: 5px;
    cursor: pointer;
}

.pizza-image {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: inherit;
}

img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
}

.pizza-name {
    width: 100%;
    padding: 16px 10px;
    position: absolute;
    bottom: 0;
    color: #ffffff;
    background-color: #00000099;
    text-align: center;
}

.pizza-controls {
    margin-left: 8px;
    align-self: end;
    flex-grow: 1;
}

.pizza-price {
    padding: 8px;
    color: #0084ff;
    background-color: #e6f3ff;
    border-radius: 5px;
    text-align: center;
}

.pizza-quantity {

}

.pizza-buttons {

}

.btn {
    padding: 10px 16px;
    border-radius: 5px;
    text-align: center;
}

.btn-add-ingredients {

}

.btn-add-to-cart {
    margin-top: 10px;
}

.pizza-item:hover .pizza-name {
    background-color: #0085ff99;
}

</style>