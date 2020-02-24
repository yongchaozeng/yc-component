<template>
    <label class="pc-checkbox-container">
        <span v-show="value" class="pc-checkbox-inner"></span>
        <span v-show="!value" class="pc-checkbox-cancel"></span>
        <input type="checkbox" @change="changeValue" :value="value" class="pc-checkbox">
        <span class="text"><slot></slot></span>
    </label>
</template>

<script>
  export default {
    name: 'pc-checkbox',
    props: {
      value: {}
    },
    created() {

    },
    computed: {},
    methods: {
      changeValue() {
        this.$emit('input', !this.value)
      },
    }

  }
</script>

<style lang="less" scoped>
    .pc-checkbox-container {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        /*vertical-align: text-top;*/
        .text{
            margin-left: 11px;
            color: #333333;
            /*vertical-align: inherit;*/
        }
        .checkbox-button {
            position: relative;
            top: 0;
            left: 0;
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 2px;

        }

        .pc-checkbox-cancel {
            .checkbox-button;
            /*background-color: #999999;*/
            border: 1px solid #999999;

        }

        .pc-checkbox-inner {
            border: 1px solid #999;
            .checkbox-button;
            background-color: @white;

            &::after {
                position: absolute;
                top: 1px;
                left: 4px;
                display: inline-block;
                content: ' ';
                width: 5px;
                height: 8px;
                border-right: 2px solid #FF7723;
                border-bottom: 2px solid #FF7723;
                transform: rotate(45deg);
            }
        }

        .pc-checkbox {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            opacity: 0;
        }


    }
</style>
