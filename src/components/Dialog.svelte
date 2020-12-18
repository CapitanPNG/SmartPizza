<script>

import { createEventDispatcher } from 'svelte';

export let onClose = ()=>{};

const dispatch = createEventDispatcher();

let callbacks = {
    "click": function (e) {
        //console.debug(e);

        if(e.target === this) {
            onClose(e);
        }
    }
};

</script>

<div class="dialog" on:click={callbacks.click}>
    <div class="dialog-box">
        <div class="dialog-header">
            <slot name="header"></slot>
        </div>
        <div class="dialog-body">
            <slot name="body"></slot>
        </div>
    </div>
</div>

<style>

.dialog {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #00000099;
}

.dialog-box {
    
}

.dialog-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.dialog-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>