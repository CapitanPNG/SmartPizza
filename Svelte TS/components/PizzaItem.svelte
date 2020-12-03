<script>

import TextfieldNumber from './TextfieldNumber.svelte';

export let id;

</script>

<div class="pizza-item" key={id}>
    <div class="pizza-image-box">
        <div class="pizza-image">
            <img src={window.pizzas[id].image} alt={id}>
        </div>
        <div class="pizza-name">
            {id}
        </div>
    </div>
    <div class="pizza-controls">
        <div class="pizza-price">
            {window.pizzas[id].price} €
        </div>
        <div class="pizza-qty">
            <TextfieldNumber label="Quantità" value=1 minValue=0 maxValue=9999/>
        </div>
        <div class="pizza-buttons">
            <div class="btn btn-add-ingredients" role=button tabindex=0>
                Aggiungi ingredienti
            </div>
            <div class="btn btn-checkout" role=button tabindex=0>
                Aggiungi al carrello
            </div>
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
    display: block;
    padding: 10px 16px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}

.btn-add-ingredients {
    color: #0084ff;
    border: 1px solid;
}

.btn-checkout {
    margin-top: 10px;
    color: #ffffff;
    background-color: #0084ff;
}

.pizza-item:hover .pizza-name {
    background-color: #0084ff99;
}

</style>