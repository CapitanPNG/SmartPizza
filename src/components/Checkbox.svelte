<script>

export let checked = false;
export let value   = "";

</script>

<label class="checkbox">
    <div class="checkbox-body">
        <slot name="body"></slot>
    </div>
    <input type="checkbox" bind:checked bind:value>
    <div class="checkbox-footer">
        <div class="checkbox-label">
            <slot name="label"></slot>
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