<template>
    <div class="bind-mail-container">

        <div v-if="firstTime" class="com-form-head">
            绑定邮箱
        </div>
        <div v-else-if="firstTime === false" class="mail-head">
            <div class="title" :class="{'active':!mailShow}">① 验证旧邮箱</div>
            <div class="title" :class="{'active':mailShow}">② 绑定新邮箱</div>
        </div>
        <div class="mail-main">

            <template v-if="mailShow">
                <div class="form-box" style="justify-content: space-between; padding: 0 125px;">
                    <p>请输入邮箱账号</p>
                    <pc-input v-model="newMail" style="width: 470px;" height="47"></pc-input>
                </div>
                <div class="form-box">
                    <p>请输入邮箱验证码</p>
                    <pc-input v-model="newMailCode" height="47"></pc-input>
                    <pc-button class="sendNoteCode" @click="getNewMailCode('new')">{{mailCodeText}}</pc-button>
                </div>
                <pc-button v-if="firstTime" class="sub-button" @click="firstBindMail">确定</pc-button>
                <pc-button v-else class="sub-button" @click="changeMailBox">确定</pc-button>
            </template>

            <template v-else-if="mailShow === false">
                <div class="form-box" style="justify-content: space-between;">
                    <p>旧邮箱账号</p>
                    <p style="flex: 1;text-align: left;">{{oldMail}}</p>
                </div>

                <div class="form-box">
                    <p>请输入邮件验证码</p>
                    <pc-input v-model="oldMailCode" height="47"></pc-input>
                    <pc-button class="sendNoteCode" @click="getChangeMailCode">{{changeMailCodeText}}</pc-button>

                </div>
                <pc-button class="sub-button" @click="verifyMail">确定</pc-button>
            </template>
        </div>
    </div>
</template>

<script>
  import PcInput from '../../components/pc-input'
  import PcButton from '../../components/pc-button'
  import request from '../../axios/request'
  import { log } from 'util'
  import {mixSetTime} from '../../utils/mixin'

  const mailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
  const GET_CODE_TEXT = '发送验证码'
  export default {
    name: 'accountPhone',
    data() {
      return {
        firstTime: null, // 之前没有邮箱 首次绑定
        oldMail: '',
        oldMailCode: '',
        noteCode: '',
        imgCodeUrl: null,
        mailShow: null,
        newMail: '',
        newImgCode: '',
        newMailCode: '',
        mailCodeText:GET_CODE_TEXT,
        changeMailCodeText:GET_CODE_TEXT,
      }
    },
    mixins:[mixSetTime],
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.sendMail()
        // this.getImgCode()
      },
      async sendMail() {
        let data = await request.sendMailbox()
        if (data && data.data) {
          this.oldMail = data.data.mailbox
          if (!data.data.mailbox) {
            this.firstTime = true
            this.mailShow = true
          } else {
            this.mailShow = false
            this.firstTime = false
          }
        }
      },
      async getImgCode() {
        let data = await request.phoneImgCode(new Date().getTime())

        if(data && data.data&&data.data.base64_str){
          this.imgCodeUrl = data.data.base64_str
        }

      },

      // 绑定获取邮箱验证码
      async getNewMailCode() {
        if (!this.newMail) {
          this.$msg('邮箱不能为空', { type: 'error' })
          return
        }
        if (!mailReg.test(this.newMail)) {
          this.$msg('邮箱格式不正确', { type: 'error' })
          return
        }
        if(this.mailCodeText === '发送验证码'){
          let data = await request.binMailboxCode({ mailbox: this.newMail })
          if (data && data.msg) {
            this.mixSetCodeTime('mailCodeText')
            this.$msg(data.msg, { type: 'succeed' })
          }
        }

      },
      // 更新邮箱验证码
      async getChangeMailCode() {

        if(this.changeMailCodeText === '发送验证码'){
          let data = await request.changeMailboxCode({ mailbox: this.oldMailCode })
          if (data && data.msg) {
            this.mixSetCodeTime('changeMailCodeText')
            this.$msg(data.msg, { type: 'succeed' })
            this.newMailCode = ''
          }
        }

      },

      // 绑定手机
      async firstBindMail() {

        if (!this.newMail) {
          this.$msg('邮箱不能为空', { type: 'error' })
          return
        }
        if (!mailReg.test(this.newMail)) {
          this.$msg('邮箱格式不正确', { type: 'error' })
          return
        }
        if (!this.newMailCode) {
          this.$msg('验证码不能为空', { type: 'error' })
          return
        }
        let data = await request.binMailbox({ mail_ver_code: this.newMailCode, mailbox: this.newMail })
        if (data && data.msg) {
          this.newMailCode = ''
          this.$msg(data.msg, { type: 'succeed' })
          this.$store.dispatch('getPersonalData')
          this.init()
        }
      },
      // 更换邮箱
      async changeMailBox() {
        if (!this.newMailCode) {
          this.$msg('验证码不能为空', { type: 'error' })
          return
        }
        if (!this.newMail) {
          this.$msg('邮箱不能为空', { type: 'error' })
          return
        }
        if (!mailReg.test(this.newMail)) {
          this.$msg('邮箱格式不正确', { type: 'error' })
          return
        }
        let data = await request.changeMailbox({ mail_ver_code: this.newMailCode, mailbox: this.newMail })
        if (data && data.msg) {
          this.$msg(data.msg, { type: 'succeed' })
          this.$store.dispatch('getPersonalData')
          this.init()
        }
      },

      // 验证
      async verifyMail() {
        if (!this.oldMailCode) {
          this.$msg('验证码不能为空', { type: 'error' })
          return
        }
        let data = await request.verifyOldMailbox({ mail_ver_code: this.oldMailCode })
        if (data) {
          this.$msg(data.msg, { type: 'succeed' })
          this.mailShow = true
          this.oldMailCode = ''

        }
      },
    },
    components: { PcButton, PcInput }
  }
</script>

<style lang="less" scoped>
    .bind-mail-container {
        width: 100%;

        .mail-head {
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

        .mail-main {
            width: 100%;
            padding: 75px 0;
            background: @white;
            text-align: right;

            .form-box {
                display: flex;
                padding: 0 130px;
                margin-bottom: 30px;
                justify-content: space-between;
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
                    margin-right: 46px;
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
                margin-right: 130px;
                border-radius: 0 !important;
                color: @white;
                background: @baseColor;
            }
        }
    }


</style>
