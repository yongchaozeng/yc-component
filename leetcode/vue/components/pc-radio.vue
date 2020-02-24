<template>
    <div class="pc-radio-container">
        <i class="radio-icon" :class="{'active':value === label}"></i>
        <input type="radio" class="radio-input"  :checked="value"  :value="label" @click="changeRadio"/>
<!--        <input type="radio" class="radio-input"  v-model="value"  :value="label" @input="changeRadio"/>-->
        <span><slot></slot></span>

    </div>
</template>

<script>
  export default {
    name: 'pc-radio',
    props: {
      value: [String, Number],
      index: Number,
      name: String,
      placeholder: {
        type: String,
        default: ''
      },
      label: [String, Number]
    },
    data() {
      return {
        steps: []
      }
    },
    created() {

    },
    computed: {},
    methods: {
      changeRadio(e) {
        this.$emit('input', e.target.value)
      },

    },
    watch: {},

  }
</script>

<style lang="less" scoped>
    .pc-radio-container {
        position: relative;
        .radio-icon {
            position: absolute;
            top: 5px;
            left: 0;
            display: inline-block;
            width: 17px;
            height: 17px;
            border: 5px solid transparent;
            border-radius: 50%;
            background: #F9F9F9;
            transition: all .3s;
        }

        .active {
            border-color: #21BA58;
            background: @white;
        }

        .radio-input {
            width: 17px;
            height: 17px;
            opacity: 0;
            vertical-align: middle;
            cursor: pointer;
        }
    }
</style>
