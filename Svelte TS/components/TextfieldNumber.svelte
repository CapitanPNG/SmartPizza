<script>

export let label;
export let value;

export let minValue;
export let maxValue;

let decrementNumber = function () {
    value--;

    if(value < minValue) {
        value = minValue;
    }
}

let incrementNumber = function () {
    value++;

    if(value > maxValue) {
        value = maxValue;
    }
}

let keydownCallback = function (e) {
    //console.debug(e);

    switch(e.key) {
        case "ArrowDown":
        case "ArrowLeft":
            decrementNumber();
        break;
        case "ArrowUp":
        case "ArrowRight":
            incrementNumber();
        break;
    }
}

let wheelCallback = function (e) {
    if(this === document.activeElement) {
        e.preventDefault();

        console.debug(e);

        if(e.deltaY < 0) {
            incrementNumber();
        } else {
            decrementNumber();
        }
    }
}

</script>

<div class="textfield-number">
    <div class="btn btn-minus" role=button tabindex=0 on:click={decrementNumber}>-</div>
    <div class="box">
        <div class="box-label">
            {label}
        </div>
        <input type="text" class="box-value" tabindex=0 bind:value={value} on:keydown={keydownCallback} on:wheel={wheelCallback}>
    </div>
    <div class="btn btn-plus" role=button tabindex=0 on:click={incrementNumber}>+</div>
</div>

<style>

.textfield-number {
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.btn-minus {

}

.box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #0084ff;
    border-radius: 5px;
}

.box-label {
    padding: 6px 18px;
}

.box-value {
    width: 60px;
    padding: 6px 10px;
    border: none;
    border-left: 1px solid #0084ff;
    text-align: center;
}

.btn-plus {

}

.btn {
    width: 20px;
    height: 20px;
    padding: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: #0084ff;
    border: 1px solid #0084ff;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}

</style>