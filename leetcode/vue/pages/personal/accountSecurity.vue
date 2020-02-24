<template>
    <div class="account-security-container">
        <ul class="account-list-box">
            <nuxt-link   to="/personal/accountPhone">
                <li class="account-list">
                    <img class="img" src="../../assets/imgs/personal-phone.png" alt="">
                    <p>手机号</p>
                    <p>{{personalData.phone|lack}}</p>
                </li>
            </nuxt-link> <nuxt-link to="/personal/accountMailbox">
                <li class="account-list">
                    <img class="img" src="../../assets/imgs/personal-note.png" alt="">
                    <p>邮箱</p>
                    <p>{{personalData.mailbox|lack}}</p>
                </li>
            </nuxt-link> <nuxt-link to="/personal/accountAntonym">
                <li class="account-list">
                    <img class="img" src="../../assets/imgs/personal-user.png" alt="">
                    <p>认证</p>
                    <p>{{personalData.real_name|lack}}</p>
                </li>
            </nuxt-link> <nuxt-link to="/personal/accountWx">
                <li class="account-list">
                    <img class="img" src="../../assets/imgs/personal-wx.png" alt="">
                    <p>微信</p>
                    <p>{{personalData.we_chat_nickname|lack}}</p>
                </li>
            </nuxt-link>

        </ul>
    </div>
</template>

<script>
  import { lackFilter } from '../../utils/mixin'

    export default {
    /* 账户安全 */
    name: 'accountSecurity',
    mixins:[lackFilter],
    data() {
      return {
        accountList: [
          { name: '手机号', text: '', src: require('@/assets/imgs/logo.jpeg'), link: '' },
          { name: '邮箱', text: '', src: '', link: '' },
          { name: '姓名', text: '', src: '', link: '' },
          { name: '姓名', text: '', src: '', link: '' },
        ]
      }
    },
    computed: {
      personalData() {
        return this.$store.state.personalData
      },
    }
  }
</script>

<style lang="less" scoped>
    .account-security-container {
        width: 100%;
        height: 100%;
        background: @white;
        border-top: 4px solid @baseColor;
        .account-list-box {
            padding: 50px 120px 54px 120px;
            justify-content: space-between;
            a{
                display: inline-block;
                width: 24%;
                .account-list {

                    text-align: center;
                    line-height:30px;


                    .img {
                        width: 68px;
                        height: 68px;
                        border-radius: 50%;
                    }
                    p{
                        /*margin-top: 18px;*/
                        font-size:18px;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                    }
                }
                &:hover{
                    p{
                        color: @baseColor;
                    }
                }
            }

        }

    }
</style>
