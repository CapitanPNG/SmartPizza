<script>

import TextfieldNumber from 'TextfieldNumber.svelte';

</script>

<div class="pizza-item">
    <div class="pizza-image-box">
        <div class="pizza-image"></div>
        <div class="pizza-name"></div>
    </div>
    <div class="pizza-controls">
        <div class="pizza-price"></div>
        <div class="pizza-qty">
            <TextfieldNumber />
        </div>
        <div class="pizza-buttons">
            <div class="pizza-btn-add-ingredients" role=button tabindex=0>
                Add Ingredients
            </div>
            <div class="pizza-btn-checkout" role=button tabindex=0>
                Add to Cart
            </div>
        </div>
    </div>
</div>