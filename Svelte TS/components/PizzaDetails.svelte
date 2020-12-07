<script>

export let id;

</script>

<div class="pizza-details">
    {#if id !== null}
        <div class="pizza-image-box">
            <img src={window.PIZZAS[id].image} alt={"Pizza " + id}>
        </div>
        <div class="pizza-name">
            Pizza {id}
        </div>
        <div class="pizza-description">
            {window.PIZZAS[id].description}
        </div>
    {/if}
</div>

<style>

.pizza-details {
    width: 96%;
    height: 100%;
    padding: 30px;
}

.pizza-image-box {

}

.pizza-image-box > img {
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