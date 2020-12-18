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
    controller.getData = function (key) {
        let messagePrefix = "\n\nCannot get data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "label":
                return label;
            break;
            case "value":
                return value;
            break;
            case "step":
                return step;
            break;
            case "minValue":
                return minValue;
            break;
            case "maxValue":
                return maxValue;
            break;
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    }

    controller.setData = function (
        key,
        val
    ) {
        let messagePrefix = "\n\nCannot set data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "label":
                label = val;
            break;
            case "value":
                value = val;
            break;
            case "step":
                step = val;
            break;
            case "minValue":
                minValue = val;
            break;
            case "maxValue":
                maxValue = val;
            break;
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    }
});

</script>

<div class="numeric-textfield" bind:this={controller}>
    <Button on:click={decrementValue}>
        <div class="btn btn-minus">
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
    <Button on:click={incrementValue}>
        <div class="btn btn-plus">
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #0085ff;
    border-radius: 5px;
}

.box-label {
    padding: 6px 18px;
}

.box-value {
    width: 60px;
    padding: 6px 10px;
    border: none;
    border-left: 1px solid #0085ff;
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
    background-color: #0085ff;
    border: 1px solid #0085ff;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}

</style>