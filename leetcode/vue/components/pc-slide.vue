<template>
    <div class="pc-slide-container">
        <span class="slide-left icon iconfont" @click="rightMove">&#xe661;</span>
        <div class="pc-slide-hidden">
            <div class="pc-slide-box" :style="{'left':`${left}px`}">
                <div class="pc-slide">
                    <slot></slot>
                </div>
            </div>
        </div>
        <span class="slide-right icon iconfont" @click="leftMove">&#xe660;</span>
    </div>

</template>

<script>
  const LI_WIDTH = 140
  export default {
    name: 'pc-slide',
    data() {
      return {
        container: null,
        slide: null,
        oldX: 0,
        oldY: 0,
        newX: 0,
        newY: 0,
        height: 0,
        oldLeft: 0,
        left: 0,
      }
    },
    mounted() {
    },
    methods: {

      leftMove(e) {

        if ((this.left * -1) <= (this.$slots.default[0].children.length - 6) * LI_WIDTH) {
          this.left -= LI_WIDTH
        }

      },
      rightMove(e) {

        if (this.left < 0) {
          this.left += LI_WIDTH
        }

      },
      init() {
        this.container = document.querySelector('.pc-slide-container')
        this.slide = document.querySelector('.pc-slide')
      },
      addEventMover(e) {
        e.stopPropagation()
        e.cancelBubble = true
        // console.log(e.screenX)
        this.oldX = e.screenX
        this.oldY = e.screenY
        this.container.onmousemove = (e) => {
          // console.log(e.screenX)
          this.newX = e.screenX
          this.newY = e.screenY
          let left = this.newX - this.oldX

          // this.container.style.left = ``
          // setInterval(() => {
          // console.log(left)

          this.slide.style.left = `${this.oldLeft + left}px`
          // }, 20)

        }
        this.container.onmouseup = (e) => {

          this.deleteEvent(e)
        }
      },
      deleteEvent(e) {
        console.log(666, e)
        // this.newX = e.screenX
        // this.newY= e.screenY
        console.log(77, this.newX - this.oldX)
        this.oldLeft = this.oldLeft + this.newX - this.oldX
        this.container.onmousemove = null
      },
    },
  }
</script>

<style lang="less" scoped>
    .pc-slide-container {
        /*position: relative;*/
        width: 800px;
        height: 50px;

        .clear-both;

        .slide-left, .slide-right {
            display: block;
            float: left;
            width: 38px;
            height: 100%;
            line-height: 47px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;

            &:hover {
                color: #00A14A;
            }
        }


        .pc-slide-hidden {
            float: left;
            width: 720px;
            height: 100%;
            overflow: hidden;

            .pc-slide-box {
                position: relative;
                width: 100%;
                transition: all .3s;

                .pc-slide {
                    position: absolute;
                    /*top: 0;*/
                    left: 0;
                }
            }

        }
    }
</style>
