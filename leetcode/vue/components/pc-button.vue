<template>
    <button class="pc-button" :class="{'login-color':type === 'login'}"
            :style="{height:height+'px',borderRadius:radius?((height/2)+'px'):'0px'}" @click="handelClick">
        <span><slot></slot></span>
    </button>
</template>

<script>
  export default {
    name: 'pc-button',
    props: {
      height: {
        type: String,
        default: '50'
      },
      type: {
        type: String,
        default: 'default'
      },
      radius: {
        type: Boolean,
        default: false
      }
    },
    created() {

    },
    computed: {
      color() {
        return '#FF7723'
      }
    },
    methods: {
      handelClick(e) {
        this.$emit('click', e)
      },
    }

  }
</script>

<style lang="less" scoped>
    .login-color {
        color: @white;
        background: #FF7723;
    }

    .pc-button {
        width: 100%;
        display: inline-block;
        padding: 8px 10px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        /*line-height:30px;*/
        /*color: @baseColor;*/
        /*background: @white;*/
        /*border-radius: 0;*/
        border: 1px solid transparent;
        outline: 0;
        /*border: 1px solid @baseColor;*/
        cursor: pointer;
        transition: all .3s;
        &:hover{
          opacity: .9;
            /*transform:  translateX(2px) translateY(2px);*/
        }
        /*&:active{*/
        /*  color: @white;*/
        /*  background: @baseColor;*/
        /*}*/
    }
</style>
