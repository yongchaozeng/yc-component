<template>
    <div class="personal-password-container">
        <div class="password-head">
            <div class="title" :class="{'active':!passwordShow}">① 验证旧登录密码</div>
            <div class="title" :class="{'active':passwordShow}">② 设置新登录密码</div>
        </div>
        <div class="password-main">
            <template v-if="!passwordShow">
                <div class="form-box">
                    <p>请输入旧登录密码</p>
                    <pc-input type="password" v-model="oldPassword" height="50" style="width: 466px;"></pc-input>
                </div>
                <div class="form-box">
                    <p>请输入右侧图片验证码</p>
                    <pc-input v-model="captcha" height="50" style="width: 315px;"></pc-input>
                    <div class="code-img-box">
                        <img class="cursor code-img" @click="changeCode" v-if="codeSrc" :src="`${codeSrc}`" alt="code">
                    </div>
                </div>
                <pc-button class="sub-button" @click="submitVerify">下一步</pc-button>
            </template>

            <template v-else>
                <div class="form-box">
                    <p>请输入新登录密码</p>
                    <pc-input type="password" v-model="newPassword" height="50" style="width: 466px;"></pc-input>
                </div>
                <div class="form-box">
                    <p>请确认新登录密码</p>
                    <pc-input type="password" v-model="confirmPassword" height="50" style="width: 466px;"></pc-input>
                </div>
                <pc-button class="sub-button" @click="submitChange">确定</pc-button>
            </template>
        </div>
    </div>
</template>

<script>
  import PcInput from '../../components/pc-input'
  import request from '../../axios/request'
  import PcButton from '../../components/pc-button'
  import { verifyPassword ,changePassword} from '../../utils/formValidation'


  export default {
    /* 修改密码 */
    name: 'personalData',
    data() {
      return {
        passwordShow: false,
        newPassword: '', // 新密码
        confirmPassword: '', // 确认密码
        codeSrc: null,
        captcha: '', // 验证码
        oldPassword: '', // 旧密码
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        this.changeCode()
      },
      async changeCode() {
        let data = await request.passwordCode()
        if (data && data.data && data.data.base64_str) {
          this.codeSrc = data.data.base64_str
        }

      },
      async submitVerify() {
        if (verifyPassword.call(this)) {
          return
        }
        let data = await request.changePassword({ old_password: this.oldPassword, captcha: this.captcha }).catch(() => {
          this.clear()
        })
        if (data) {
          this.clear()
          this.passwordShow = true
        } else {
          this.changeCode()
        }
      },
      async submitChange() {
        if(changePassword.call(this)){
          return
        }

        let data = await request.putChangePassword({
          new_password: this.newPassword,
          confirm_new_password: this.confirmPassword
        })
        if (data) {
          this.$msg(data.msg, { type: 'succeed' })
          this.passwordShow = false

        }
      },
      clear() {
        this.oldPassword = ''
        this.confirmPassword = ''
        this.captcha = ''
        this.newPassword = ''
        this.changeCode()
      },
    },
    components: { PcButton, PcInput }
  }
</script>

<style lang="less" scoped>
    .personal-password-container {
        width: 100%;

        .password-head {
            height: 51px;
            padding: 0 208px;
            margin-bottom: 10px;
            line-height: 51px;
            border-top: 4px solid @baseColor;
            background: @white;
            .clear-both;

            .title {
                float: left;
                font-size: 16px;
                font-weight: bold;
                color: #333;
            }

            .title:nth-last-of-type(1) {
                float: right;
            }

            .active {
                color: rgba(0, 161, 74, 1);
            }
        }

        .password-main {
            width: 100%;
            padding: 75px 0 0 100px;
            background: @white;

            .form-box {
                margin-bottom: 30px;
                .clear-both;


                p {
                    float: left;
                    text-align: right;
                    width: 167px;
                    margin-right: 61px;
                    color: rgba(51, 51, 51, 1);
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 62px
                }

                .input-box {
                    float: left;
                }

                .code-img-box {
                    float: left;
                    width: 138px;
                    height: 48px;
                    margin-left: 11px;
                    border: 1px solid @gray;

                    .code-img {
                        width: 100%;
                        height: 100%;

                    }
                }

            }

            .sub-button {
                width: 466px;
                margin-left: 228px;
                border-radius: 0 !important;
                color: @white;
                background: @baseColor;
            }
        }
    }
</style>
