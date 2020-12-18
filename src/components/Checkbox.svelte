<script>

export let checked = false;
export let value   = "";

</script>

<label class="checkbox">
    <div class="checkbox-body">
        <slot name="body"></slot>
    </div>
    <input type="checkbox" bind:checked bind:value>
    <div class="checkbox-label">
        <div class="checkbox-emulator">
            <slot name="emulator">
                  ✓
            </slot>
         </div>
    </div>
</label>

<style>

.checkbox {

}

.checkbox-body {

}

input {
    display: none;
}

.checkbox-emulator {

}

input:checked + .checkbox-emulator {
    visibility: visible;
}

input:not(:checked) + .checkbox-emulator {
    visibility: hidden;
}

</style>