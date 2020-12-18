<script>

export let placeholder = "";
export let value       = "";

</script>

<div class="textfield">
    <input type="text" {placeholder} bind:value>
</div>

<style>

.textfield {
    width: 100%;
    margin-bottom: 4px;
}

input {
    width: 100%;
    padding: 10px 16px;
    color: #00000099;
    font-weight: 500;
    font-size: 14px;
    border-bottom: 1px solid #000000;
}

::placeholder,
::-moz-placeholder,
::-webkit-input-placeholder {
    font-weight: 500;
    opacity: 1;
}

</style>