<template>
  <div :class="keyboardClass" />
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "../styles/_simplekeyboard.scss";

export default {
    name: "SimpleKeyboard",
    
    props: {
        keyboardClass: {
            default: "simple-keyboard",
            type: String,
        },
        input: {
            default: "",
            type: String
        },
    },
  
    data: () => ({
        keyboard: null,
    }),
    watch: {
        input(input) {
            this.keyboard.setInput(input);
        }
    },
    mounted() {
        this.keyboard = new Keyboard(this.keyboardClass, {
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
            theme: "hg-theme-default hg-layout-default",
            excludeFromLayout: {
                default: ["`", "-", "=", "{tab}", "[", "]", "]", "\\", ";", "'", "{enter}", ",", ".", "/", "@", ".com"],
                shift: ["`", "-", "=", "{tab}", "[", "]", "]", "\\", ";", "'", "{enter}", ",", ".", "/", "@", ".com"]
            },
        });
    },
    
    methods: {
        onChange(input) {
            this.$emit("onChange", input);
        },
        onKeyPress(button) {
            this.$emit("onKeyPress", button);

            /**
       * If you want to handle the shift and caps lock buttons
       */
            if (button === "{shift}" || button === "{lock}") this.handleShift();
        },
        handleShift() {
            let currentLayout = this.keyboard.options.layoutName;
            let shiftToggle = currentLayout === "default" ? "shift" : "default";

            this.keyboard.setOptions({
                layoutName: shiftToggle
            });
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
