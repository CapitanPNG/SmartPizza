<script>

import { onMount } from 'svelte';

import { shoppingCart } from '../stores/shoppingCart';

import Button from './Button.svelte';

export let checkoutDone;

let continueShopping = function () {
    $shoppingCart = [];

    checkoutDone = false;
};

let downloadDebug = function () {
    let content = JSON.stringify(
        $shoppingCart,
        null,
        4
    );

    let file = new Blob(
        [content],
        {
            "type": "text/plain"
        }
    );

    let a = document.createElement("a");
    
    a.href = URL.createObjectURL(file);
    a.download = "shoppingCart.txt";
    a.click();
}

onMount(function(e) {
    downloadDebug();
});

</script>

<div class="checkout-message">
    <div class="checkout-message-box">
        <div class="text">
            Operazione completata.
            <br>
            Grazie per aver ordinato con noi!
        </div>
        <Button>
            <div class="btn btn-color-full btn-continue-shopping" on:click={continueShopping}>
                Continua ad ordinare
            </div>
        </Button>
    </div>
</div>

<style>

.checkout-message {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: #ffffff;
}

.checkout-message-box {

}

.text {
    margin-bottom: 20px;
    color: #000000;
    text-align: center;
}

.btn {
    padding: 8px 30px;
    color: #ffffff;
    background-color: #4ca9ff;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
}

.btn-continue-shopping {

}

</style>