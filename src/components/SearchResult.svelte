<script>

import Button from './Button.svelte';
import NumericTextfield from './NumericTextfield.svelte';

export let id = null;

</script>

<div class="search-result pizza-item" key={id}>
    <div class="pizza-image-box">
        <div class="pizza-image">
            <img src={window.PIZZA[id].image} alt={"Pizza " + id}>
        </div>
        <div class="pizza-name">
            {id}
        </div>
    </div>
    <div class="pizza-controls">
        <div class="pizza-price">
            {window.PIZZA[id].temp.price} €
        </div>
        <div class="pizza-qty">
            <NumericTextfield label="Quantità" minValue=1 value=1 />
        </div>
        <div class="pizza-buttons">
            <Button>
                <div class="btn btn-add-ingredients">
                    Aggiungi ingredienti
                </div>
            </Button>
            <Button>
                <div class="btn btn-add-to-cart">
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
    width: 50%;
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

.pizza-image > img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
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
    width: 50%;
    margin-left: 8px;
    align-self: end;
}

.pizza-price {
    padding: 8px;
    color: #0084ff;
    background-color: #e6f3ff;
    border-radius: 5px;
    text-align: center;
}

.pizza-qty {

}

.pizza-buttons {

}

.btn {
    padding: 10px 16px;
    border-radius: 5px;
    text-align: center;
}

.btn-add-ingredients {
    color: #0084ff;
    border: 1px solid;
}

.btn-add-to-cart {
    margin-top: 10px;
    color: #ffffff;
    background-color: #0084ff;
}

.pizza-item:hover .pizza-name {
    background-color: #0084ff99;
}

</style>