<template>
    <div class="bind-phone-container">

        <div v-if="firstTime === true" class="com-form-head">
            绑定手机号
        </div>
        <div v-else-if="firstTime === false" class="phone-head">
            <div class="title" :class="{'active':!phoneShow}">① 验证旧手机</div>
            <div class="title" :class="{'active':phoneShow}">② 绑定新手机</div>
        </div>
        <div class="phone-main">
            <template v-if="phoneShow === true">
                <div class="form-box" style="justify-content: space-between; padding: 0 125px;">
                    <p>请输入手机号码</p>
                    <pc-input v-model="newPhone" style="width: 470px;" height="47"></pc-input>
                </div>
                <div class="form-box">
                    <p>请输入右侧验证码</p>
                    <pc-input v-model="newImgCode" height="47"></pc-input>
                    <img class="code-img" v-if="imgCodeUrl" @click="getImgCode" :src="imgCodeUrl" alt="">
                </div>
                <div class="form-box">
                    <p>请输入短信验证码</p>
                    <pc-input v-model="newNoteCode" height="47"></pc-input>
                    <pc-button class="sendNoteCode" @click="getNewNoteCode('new')">{{changePhoneText}}</pc-button>

                </div>
                <pc-button v-if="firstTime" class="sub-button" @click="bindPhone">确定</pc-button>
                <pc-button v-else class="sub-button" @click="bindNewPhone">确定</pc-button>
            </template>

            <template v-else-if="phoneShow === false">
                <div class="form-box" style="justify-content: space-between; padding: 0 125px;">
                    <p>旧手机号</p>
                    <p style="flex: 1;text-align: left;">{{oldPhone}}</p>
                </div>
                <div class="form-box">
                    <p>请输入图片验证码</p>
                    <pc-input v-model="imgCode" height="47"></pc-input>
                    <img class="code-img" v-if="imgCodeUrl" @click="getImgCode" :src="imgCodeUrl" alt="">
                </div>
                <div class="form-box">
                    <p>请输入短信验证码</p>
                    <pc-input v-model="noteCode" height="47"></pc-input>
                    <pc-button class="sendNoteCode" @click="getNoteCode">{{oldPhoneText}}</pc-button>

                </div>
                <pc-button class="sub-button" @click="verifyPhone">确定</pc-button>
            </template>
        </div>
    </div>
</template>

<script>
  import PcInput from '../../components/pc-input'
  import PcButton from '../../components/pc-button'
  import request from '../../axios/request'
  import { mixSetTime } from '../../utils/mixin'
  import {verifyFirstPhone,verifyPhone,verifyImgCode,verifyNoteCode} from '../../utils/formValidation'

  const GET_CODE_TEXT = '发送验证码'
  export default {
    name: 'accountPhone',
    data() {
      return {
        timeIdList: [],
        firstTime: null, // 之前没有手机号 首次绑定
        oldPhone: '',
        imgCode: '',
        noteCode: '',
        imgCodeUrl: null,
        phoneShow: null,
        newPhone: '',
        newImgCode: '',
        newNoteCode: '',
        changePhoneText: GET_CODE_TEXT,
        oldPhoneText: GET_CODE_TEXT,
      }
    },
    mixins: [mixSetTime],
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.sendPhone()
        this.getImgCode()
      },
      async sendPhone() {
        let { data } = await request.sendPhoneNumber()
        if (data && data.old_phone_num) {
          this.oldPhone = data.old_phone_num
          this.phoneShow = false
          this.firstTime = false
        } else {
          this.phoneShow = true
          this.firstTime = true
        }
      },
      async getImgCode() {
        let data = await request.phoneImgCode(new Date().getTime())

        if(data && data.data&&data.data.base64_str){
          this.imgCodeUrl = data.data.base64_str
        }
      },

      // 绑定新手机验证
      async getNewNoteCode() {
        if(verifyPhone.call(this)){
          return
        }

        if (this.changePhoneText === GET_CODE_TEXT) {
          let data = await request.phoneNoteCode({ image_ver_code: this.newImgCode, phone_num: this.newPhone })
          if (data && data.msg) {
            this.$msg(data.msg, { type: 'succeed' })
            this.mixSetCodeTime('changePhoneText')
          } else {
            this.getImgCode()
          }
        }

      },

      // 首次绑定手机
      async bindPhone() {
        if(verifyFirstPhone.call(this)){
          return
        }

        let data = await request.bindPhone({ sms_ver_code: this.newNoteCode, phone_num: this.newPhone })
        if (data && data.msg) {
          this.$msg(data.msg, { type: 'succeed' })
          this.phoneShow = false
        }
        this.clear()
        this.init()
      },

      // 绑定新手机
      async bindNewPhone() {
        if(verifyFirstPhone.call(this)){
          return
        }

        let data = await request.bindNewPhone({ sms_ver_code: this.newNoteCode, phone_num: this.newPhone })
        if (data && data.msg) {
          this.$msg(data.msg, { type: 'succeed' })
          this.phoneShow = false

        }
        this.clear()
        this.init()
      },

      // 获取旧手机短信验证码
      async getNoteCode() {
        if (verifyImgCode.call(this)) {
          return
        }
        if (this.oldPhoneText === GET_CODE_TEXT) {
          let data = await request.verifyOldSms({ image_ver_code: this.imgCode, })
          if (data && data.msg) {
            this.$msg(data.msg, { type: 'succeed' })
            this.mixSetCodeTime('oldPhoneText')
          } else {
            this.getImgCode()
          }
        }

      },
      // 验证
      async verifyPhone() {
        if (verifyNoteCode.call(this)) {
          return
        }

        // this.phoneShow = true
        let data = await request.verifyOldPhone({ sms_ver_code: this.noteCode })
        if (data) {
          this.getImgCode()
          this.$msg(data.msg, { type: 'succeed' })
          this.phoneShow = true
        }
        this.clear()
      },
      clear() {
        this.newPhone = ''
        this.newNoteCode = ''
        this.newImgCode = ''
        this.imgCode = ''
        this.noteCode = ''
      },
    },
    components: { PcButton, PcInput }
  }
</script>

<style lang="less" scoped>
    .bind-phone-container {
        width: 100%;

        .phone-head {
            display: flex;
            height: 51px;
            padding: 0 208px;
            margin-bottom: 10px;
            justify-content: space-between;
            align-items: center;
            border-top: 4px solid @baseColor;
            background: @white;

            .title {
                font-size: 16px;
                font-weight: bold;
                color: #333;
            }

            .active {
                color: rgba(0, 161, 74, 1);
            }
        }

        .phone-main {
            width: 100%;
            padding: 75px 0;
            background: @white;

            .form-box {
                display: flex;
                margin-bottom: 30px;

                justify-content: center;
                align-items: center;

                .input-box {
                    width: 318px;
                }

                .sendNoteCode {
                    width: 138px;
                    height: 47px;
                    margin-left: 10px;
                    color: @white;
                    background: @baseColor;
                }

                p {
                    width: 167px;
                    margin-right: 23px;
                    text-align: right;
                    font-size: 18px;
                    font-weight: 300;
                    color: rgba(51, 51, 51, 1);
                }

                .code-img {
                    width: 138px;
                    height: 48px;
                    margin-left: 11px;
                    border: 1px solid @gray;
                }
            }

            .sub-button {
                width: 466px;
                margin-left: 324px;
                border-radius: 0 !important;
                color: @white;
                background: @baseColor;
            }
        }
    }


</style>
