<template>
<ul class="tool-box com-sidebar">
      <li
        class="first-tool"
        @mouseenter.stop.self="changeStairs('wx',true)"
        @mouseleave.stop.self="changeStairs('wx',false)"
      >
        <img class="icon" src="../assets/imgs/home-share.png" alt />
        <p class="title">微信小程序</p>
        <transition name="fade">
          <div v-if="toolShow.wx" class="code-img-box">
            <img class="code-img" src="../assets/imgs/code.png" alt />
            <p class="code-text">打开微信扫一扫</p>
          </div>
        </transition>
      </li>
      <li
        class="tool"
        @mouseenter.stop.self="changeStairs('wxAccount',true)"
        @mouseleave.stop.self="changeStairs('wxAccount',false)"
      >
        <img class="icon" src="../assets/imgs/home-wx.png" alt />
        <p class="title">微信公众号</p>
        <transition name="fade">
          <div class="code-img-box" v-if="toolShow.wxAccount">
            <img class="code-img" src="../assets/imgs/code.png" alt />
            <p class="code-text">打开微信扫一扫</p>
          </div>
        </transition>
      </li>
      <li
        class="tool"
        @click="openWb"
        @mouseenter.stop.self="changeStairs('wb',true)"
        @mouseleave.stop.self="changeStairs('wb',false)"
      >
        <img class="icon" src="../assets/imgs/home-wb.png" alt />
        <p class="title">微博</p>
        <transition name="fade">
          <div v-if="toolShow.wb" class="code-img-box">
            <img class="code-img" src="../assets/imgs/code.png" alt />
            <p class="code-text">打开微博扫一扫</p>
          </div>
        </transition>
      </li>
      <li
        class="tool"
        @mouseenter.stop.self="changeStairs('phone',true)"
        @mouseleave.stop.self="changeStairs('phone',false)"
      >
        <img class="icon" src="../assets/imgs/home-service.png" alt />
        <p class="title">电话咨询</p>
        <transition name="fade">
          <div v-if="toolShow.phone" class="code-img-box phone-box">
            <p class="code-text">咨询电话：010-66513100</p>
          </div>
        </transition>
      </li>
      <li class="last-tool" @click="backToTop">
        <img class="icon" src="../assets/imgs/go-top.png" alt />
        <p class="title">返回顶部</p>
      </li>
    </ul>
</template>
<script>
export default {
    name:'pc-tool',
    data(){
        return {
           toolShow: {
        wx: false,
        wxAccount: false,
        wb: false,
        phone: false
      }
        }
    },
    methods:{
          //  跳转到对应dom位置
    changeStairs(name, show) {
      this.toolShow[name] = show;
    },
      // 返回顶部
    backToTop() {
      let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
      let timeId = setInterval(() => {
        if (scrollTop <= 0) {
          window.scroll(0, 0);
          clearInterval(timeId);
        }
        window.scroll(0, (scrollTop -= 60));
      }, 10);
    },
    openWb() {
      window.open(`https://weibo.com/gycncc?is_hot=1`, "", "");
    },
    }
};
</script>

<style lang="less" scoped >
  .tool-box {
    .tool {
      /*height: 75px;*/
      padding: 18px 10px 0 10px;
      text-align: center;
      background: @white;
      cursor: pointer;

      .icon {
        width: 34px;
        height: 34px;
        margin-bottom: 2px;
        transition: all 1s;

        &:hover {
          transform: rotate(360deg);
        }
      }

      .title {
        line-height: 12px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }

      .code-img-box {
        /*display: none;*/
        position: absolute;
        top: 0;
        right: 90px;
        width: 160px;
        height: 160px;
        padding: 7px 19px 6px 19px;
        background: @white;
        box-shadow: -2px 0 9px 1px rgba(51, 51, 51, 0.1);
        /*opacity: 0;*/
        /*transition: all 5s;*/

        .code-img {
          width: 122px;
          height: 122px;
        }

        .code-text {
          color: #666;
          font-size: 12px;
        }

        &:after {
          position: absolute;
          top: 50px;
          right: -15px;
          display: block;
          content: "";
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid @white;
        }
      }

      .phone-box {
        top: 240px !important;
        width: 220px;
        height: 50px;
        line-height: 40px;
        border-radius: 4px;

        &::after {
          top: 19px !important;
        }
      }
    }

    .tool:nth-of-type(2) {
      .code-img-box {
        top: 60px;
      }
    }

    .tool:nth-of-type(3) {
      .code-img-box {
        top: 135px;
      }
    }

    .first-tool {
      position: relative;
      .tool;
      padding: 30px 10px 0 10px;
      border-radius: 30px 30px 0 0;
      transition: 2s all;
    }

    .tool:nth-of-type(4) {
      .code-img-box {
        top: 205px;
      }
    }

    .last-tool {
      .tool;
      height: 105px;
      padding: 23px 10px 30px 10px;
      border-radius: 0 0 30px 30px;
    }
  }
</style>
