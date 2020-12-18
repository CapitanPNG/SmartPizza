<script>
import { onMount } from "svelte";

export let actions = [];

export let object = "";

let controller = null;

let actionIndex = -1;

let callbacks = {
    "click": function (e) {
        //console.debug(e);

        let value = null;

        if(actions.length > 0) {
            actionIndex++;

            if(actionIndex > actions.length - 1) {
                actionIndex = 0;
            }

            value = actions[actionIndex];
        }
        
        let data = {
            "value": value
        };

        controller.triggerEvent(
            "swg-input",
            data
        );
    }
};

onMount(function(e) {
    controller.getData = function (key) {
        switch(key) {
            case "value":
                return (actions.length === 0 ? null : actions[actionIndex]);
            break;
            default:
                return null;
        }
    }

    controller.setData = function (
        key,
        value
    ) {
        switch(key) {
            case "value":
                actions = value;
            break;
            default:
                return false;
        }

        return true;
    }
});

</script>

<div class="swg swg-button" role=button tabindex=0 bind:this={controller} on:click={callbacks.click} {object}>
    <slot></slot>
</div>

<style>

.swg {

}

.swg-button {
    display: block;
    cursor: pointer;
}

</style>