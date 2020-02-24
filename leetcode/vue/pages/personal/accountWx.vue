<template>
    <div class="bind-wx-container">
        <div class="bind-wx-head ">设置微信</div>
        <div class="wx-code-box" v-if="isBindWx === false">
            <div class="wx-code">
                <p class="cursor" @click="toWxOauth">点击进行绑定</p>
                <!--                <img src="../../assets/imgs/test/test0.png" alt="">-->
            </div>
        </div>
        <div class="change-wx" v-else-if="isBindWx">
            <p>已绑定到用户 ：{{wxInfo.nick_name}}</p>
            <img :src="wxInfo.head_portrait" alt="">
            <pc-button @click="unbound" class="unbundle-button">解绑</pc-button>
        </div>
    </div>
</template>

<script>
  import PcButton from '../../components/pc-button'
  import request from '../../axios/request'

  export default {
    name: 'accountWx',
    data() {
      return {
        isBindWx: null,
        wxInfo: null,
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 获取绑定信息
      async init() {
        let data = await request.wxInfo({ oauth_type: 1 })
        if (data && data.data && data.data.register_user_auth_info) {
          this.wxInfo = data.data.register_user_auth_info
          this.isBindWx = true
        } else {
          this.isBindWx = false
        }

      },
      // 解绑
      async unbound() {
        let data = await request.wxDelete({ oauth_type: 1 })
        this.init()
        this.$store.dispatch('getPersonalData')

      },
      // 绑定
      toWxOauth() {
        window.open(`${process.env.loginUrl}/oauth/login?type=wechat&service=${process.env.service}/loginClose`, '', 'width=600,height=600')
        this.$store.dispatch('getPersonalData')
      },
    },
    components: { PcButton }
  }
</script>

<style lang="less" scoped>
    .bind-wx-container {
        width: 100%;


        .bind-wx-head {
            height: 47px;
            margin-bottom: 10px;
            text-align: center;
            line-height: 47px;
            border-top: 4px solid @baseColor;
            font-size: 16px;
            font-weight: bold;
            background: @white;
        }

        .wx-code-box {
            background: @white;

            .wx-code {
                text-align: center;

                p {
                    margin: 30px 0;
                    font-size: 16px;
                    font-weight: 400;
                }

                img {
                    width: 173px;
                    height: 173px;
                }
            }

        }

        .change-wx {
            padding-top: 93px;
            margin: 0 auto;
            text-align: center;
            background: @white;

            .unbundle-button {
                width: 178px;
                color: @white;
                background: #21BA58;
                font-size: 18px;
                font-weight: 300;
            }

            p {
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }

            img {
                display: block;
                width: 79px;
                height: 79px;
                margin: 35px auto;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 3px 4px 0px rgba(229, 229, 229, 0.47);
                border-radius: 50%;
            }
        }


    }
</style>
