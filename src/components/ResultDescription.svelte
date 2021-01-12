<script>

import { currentPizza } from '../stores/currentPizza';

</script>

<div class="result-description pizza-details">
    {#if $currentPizza !== null}
        <div class="pizza-image-box">
            <img src={window.PIZZA[$currentPizza].image} alt={"Pizza " + $currentPizza}>
        </div>
        <div class="pizza-name">
            Pizza {$currentPizza}
        </div>
        <div class="pizza-description">
            {window.PIZZA[$currentPizza].description}
        </div>
    {/if}
</div>

<style>

.result-description {
    height: 100%;
    padding: 30px;
    flex-grow: 1;
}

.pizza-details {
   
}

.pizza-image-box {

}

img {
    width: 100%;
    height: 220px;
    display: block;
    border-radius: 5px;
    object-fit: cover;
}

.pizza-name {
    padding: 20px 0;
    font-weight: 600;
    font-size: 18px;
}

.pizza-description {

}

</style>