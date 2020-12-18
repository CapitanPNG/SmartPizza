<script>

import { createEventDispatcher } from 'svelte';
import { binding_callbacks } from 'svelte/internal';

const dispatch = createEventDispatcher();

export let label   = "";
export let checked = false;
export let value   = "";

let callbacks = {
    "change": function (e) {
        let data = {
            "value"  : value,
            "checked": checked
        };

        dispatch(
            "swg-change",
            data
        );
    }
};

</script>

<label class="checkbox">
    <div class="checkbox-body">
        <slot name="body"></slot>
    </div>
    <input type="checkbox" bind:checked bind:value
        on:change={callbacks.change}
    >
    <div class="checkbox-footer">
        <div class="checkbox-label">
            <slot name="label">
                {label}
            </slot>
        </div>
        <div class="checkbox-emulator-box">
            <div class="checkbox-emulator">
                <slot name="emulator">
                    ✓
                </slot>
            </div>
        </div>
    </div>
</label>

<style>

.checkbox {
    cursor: pointer;
}

.checkbox-body {

}

input {
    display: none;
}

.checkbox-footer {

}

.checkbox-emulator {

}

input:checked + .checkbox-footer .checkbox-emulator {
    visibility: visible;
}

input:not(:checked) + .checkbox-footer .checkbox-emulator {
    visibility: hidden;
}

</style>