<script>

import Dialog from './Dialog.svelte';
import Button from './Button.svelte';
import Textfield from './Textfield.svelte';
import CartItem from './CartItem.svelte';

export let onClose = ()=>{};
export let shoppingCart;

</script>

<div class="cart-dialog">
    <Dialog {onClose} >
        <div slot="header" class="dialog-header">
            <div class="cart-header">
                <div class="cart-title">
                    Carrello
                </div>
                <Button>
                    <div class="btn btn-cart-quit" on:click={onClose}>
                        X
                    </div>
                </Button>
            </div>
        </div>
        <div slot="body" class="dialog-body">
            <div class="cart-body">
                <div class="cart-form">
                    <Textfield placeholder="Nome" />
                    <Textfield placeholder="Cognome" />
                    <Textfield placeholder="Email" />

                    <select value="Metodo di pagamento">
                        <option>Visa</option>
                        <option>MasterCard</option>
                        <option>PayPal</option>
                    </select>
                </div>
                <div class="cart-list">
                    {#each shoppingCart as item}
                        <CartItem {item}/>
                    {/each}
                </div>
            </div>
            <div class="cart-footer">
                FOOTER
            </div>
        </div>
    </Dialog>
</div>

<style>

.cart-dialog {
    
}

.cart-dialog :global(.dialog-box) {
    width: 640px;
}

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

.cart-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.cart-title {
    font-weight: 500;
    font-size: 18px;
}

.dialog-body {
    width: 100%;
    padding: 0;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.cart-body {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
}

.cart-form {
    width: 60%;
    padding: 10px;
}

select {
    width: 100%;
}

.cart-list {
    border-left: 1px solid #0085ff;
    flex-grow: 1;
}

.cart-footer {

}

.btn {
    padding: 8px;
    color: #ffffff;
    background-color: #4ca9ff;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
}

</style>