<script>

import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';

import Button from './Button.svelte';

const dispatch = createEventDispatcher();

export let label    = "";
export let value    = 0;

export let step     = 1;

export let minValue = -Infinity;
export let maxValue = +Infinity;

$: value = parseInt(value);

$: step = parseInt(step);

$: minValue = parseInt(minValue);
$: maxValue = parseInt(maxValue);

let valueBefore = null;

let decrementValue = function () {
    valueBefore = value;

    value -= step;

    if(value < minValue) {
        value = minValue;
    }

    let data = {
        "value"      : value,
        "valueBefore": valueBefore
    };

    if(value !== valueBefore) {
        dispatch(
            "swg-change",
            data
        );
    }
}

let incrementValue = function () {
    valueBefore = value;

    value += step;

    if(value > maxValue) {
        value = maxValue;
    }

    let data = {
        "value"      : value,
        "valueBefore": valueBefore
    };

    if(value !== valueBefore) {
        dispatch(
            "swg-change",
            data
        );
    }
}

let callbacks = {
    "keydown": function (e) {
        //console.debug(e);

        switch(e.key) {
            case "ArrowDown":
            case "ArrowLeft":
                decrementValue();
            break;
            case "ArrowUp":
            case "ArrowRight":
                incrementValue();
            break;
            case "Backspace":
                if(value.toString().length === 1) {
                    e.preventDefault();

                    value = minValue;
                }
            break;
        }
    },
    "wheel": function (e) {
        if(this === document.activeElement) {
            e.preventDefault();

            //console.debug(e);

            if(e.deltaY < 0) {
                incrementValue();
            } else {
                decrementValue();
            }
        }
    }
};

let controller = null;

onMount(function(e) {
    
});

</script>

<div class="numeric-textfield" bind:this={controller}>
    <Button>
        <div class="btn btn-minus" on:click={decrementValue}>
            -
        </div>
    </Button>
    <div class="box">
        <div class="label">
            {label}
        </div>
        <input bind:value={value} type=text tabindex=0
            on:keydown={callbacks.keydown}
            on:wheel={callbacks.wheel}
        >
    </div>
    <Button>
        <div class="btn btn-plus" on:click={incrementValue}>
            +
        </div>
    </Button>
</div>

<style>

.numeric-textfield {
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.btn-minus {

}

.box {
    margin: 0 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #0085ff;
    border-radius: 5px;
}

.label {
    padding: 6px 18px;
}

input {
    width: 60px;
    padding: 6px 10px;
    border: none;
    border-left: 1px solid #0085ff;
    text-align: center;
    font-weight: 400;
    font-size: 14px;
}

.label,
input {
    color: #0085ff;
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
    background-color: #0085ff;
    border: 1px solid #0085ff;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    user-select: none;
}

</style>