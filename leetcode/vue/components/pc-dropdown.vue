<template>
    <div class="pc-dropdown-container">
        <div v-clickoutside="close" @click.stop="open">
            <slot></slot>
        </div>
        <transition name="fade">
            <div class="main" :style="{'transform':transform}" v-show="contentShow">
                <slot name="list"></slot>
            </div>
        </transition>
    </div>

</template>

<script>
  import Clickoutside from '@@/utils/clickoutside'

  export default {
    name: 'pc-dropdown',
    data() {
      return {
        contentShow: false,
        top: 0,
        left: 0,
        transform: 0,
      }
    },
    mounted() {

    },
    methods: {
      open() {
        this.contentShow = true
        this.$nextTick(() => {
          let width = document.querySelector('.main').clientWidth - document.querySelector('.pc-dropdown-container').clientWidth
          // width = width > 0 ? width : width * -1
          // console.log()
          this.transform = 'translateX(' + -1*width / 2 + 'px)'
        })
      },
      close() {
        this.contentShow = false
      },
    },
    directives: { Clickoutside },
  }
</script>

<style lang="less" >
    .pc-dropdown-container {
        /*position: relative;*/
        /*width: 100%;*/
        cursor: pointer;

        .open-button {

        }

        .main {
            position: absolute;
            min-width: 100px;
            padding: 10px 0;
            margin: 5px 0;
            font-size: 14px;
            color: #606266;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            background: @white;
            z-index: 10;



        }
        .list {
            display: inline-block;
            width: 100%;
            height: 36px;
            padding: 0 20px;
            text-align: center;
            line-height: 36px;
            cursor: pointer;
            &:hover{
                background: #21BA58;
                color: @white;
            }
        }
    }
</style>
