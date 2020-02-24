<template>
    <div class="personal-center-container">
        <div class="personal-center-left">
            <div class="personal-center">
                <div class="user-image-box">
                    <img class="user-image"
                         :src="personalData.url?personalData.url:require('../assets/imgs/base-head-img.png')" alt="">
                </div>
                <div class="user-title">欢迎您，{{userName}}</div>
                <ul class="user-common-nav">
                    <nuxt-link to="/personal/accountPhone">
                        <li>
                            <img v-if="personalData.phone" src="../assets/imgs/personal-phone.png" alt="">
                            <img v-else src="../assets/imgs/personal-phone-h.png" alt="">
                            <p class="bound " v-if="personalData.phone">已绑定</p>
                            <p class="unbound "  v-else>未绑定</p>
                        </li>
                    </nuxt-link>
                    <nuxt-link to="/personal/accountMailbox">
                        <li>
                            <img v-if="personalData.mailbox" src="../assets/imgs/personal-note.png" alt="">
                            <img v-else src="../assets/imgs/personal-note-h.png" alt="">
                            <p class="bound " v-if="personalData.mailbox">已绑定</p>
                            <p class="unbound "  v-else>未绑定</p>
                        </li>
                    </nuxt-link>
                    <nuxt-link to="/personal/accountAntonym">
                        <li>
                            <img  v-if="personalData.id_card_no" src="../assets/imgs/personal-user.png" alt="">
                            <img v-else src="../assets/imgs/personal-user-h.png" alt="">
                            <p class="bound " v-if="personalData.id_card_no">已实名</p>
                            <p class="unbound "  v-else>未实名</p>
                        </li>
                    </nuxt-link>
                    <nuxt-link to="/personal/accountWx">
                        <li>
                            <img  v-if="personalData.we_chat_nickname" src="../assets/imgs/personal-wx.png" alt="">
                            <img v-else src="../assets/imgs/personal-wx-h.png" alt="">
                            <p class="bound " v-if="personalData.we_chat_nickname">已绑定</p>
                            <p class="unbound "  v-else>未绑定</p>
                        </li>
                    </nuxt-link>


                </ul>
            </div>
            <div class="personal-center-nav">
                <nuxt-link to="/personal/personalData">
                    <i class="icon"></i><span>个人资料</span>
                </nuxt-link>
                <nuxt-link to="/personal/myOrder">
                    <i class="icon"></i><span>我的订单</span>
                </nuxt-link>
                <nuxt-link to="/personal/classBooking">
                    <i class="icon"></i><span>预约班级</span>
                </nuxt-link>
                <nuxt-link to="/personal/classGrade">
                    <i class="icon"></i><span>报名班级</span>
                </nuxt-link>
                <nuxt-link to="/personal/collect">
                    <i class="icon"></i><span>我的收藏</span>
                </nuxt-link>
                <nuxt-link to="/personal/contacts">
                    <i class="icon"></i><span>常用联系人</span>
                </nuxt-link>
                <nuxt-link to="/personal/password">
                    <i class="icon"></i><span>修改登录密码</span>
                </nuxt-link>
<!--                <nuxt-link to="/personal/accountSecurity">-->
<!--                    <i class="icon"></i><span>账户安全</span>-->
<!--                </nuxt-link>-->
                <nuxt-link to="/personal/systemMessages">
                    <i class="icon"></i><span>系统消息</span>
                </nuxt-link>
            </div>
        </div>
        <div class="personal-center-right">
            <nuxt-child></nuxt-child>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'personal',
    layout: 'personal',
    data() {
      return {}
    },
    computed: {
      personalData() {
        return this.$store.state.personalData
      },
      userName() {
        return this.$store.getters.userName
      },
    }
  }
</script>

<style lang="less" scoped>

    .personal-center-container {
        width: 1200px;
        margin: 41px auto;
        .clear-both;

        .personal-center-left {
            float: left;
            width: 265px;
            height: 100%;
            margin-right: 10px;
            background: @white;

            .nuxt-link-exact-active {
                font-weight: 400;
                color: @baseColor;

            }


            .personal-center {
                padding-bottom: 22px;
                margin: 0 12px 0 11px;
                text-align: center;
                overflow: hidden;
                border-bottom: 1px solid @gray;

                .user-image-box {
                    width: 104px;
                    height: 104px;
                    margin: 26px auto 37px auto;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        box-shadow: 0px 3px 4px 0px rgba(229, 229, 229, 0.47);
                    }
                }

                .user-title {
                    height: 19px;
                    font-size: 18px;
                    font-family: PingFang SCR;
                    font-weight: 600;
                    color: rgba(51, 51, 51, 1);
                    line-height: 19px;
                }


                .user-common-nav {
                    margin-top: 38px;
                    padding: 0 5px;

                    a {
                        margin-right: 20px;
                    }

                    a:nth-last-of-type(1) {
                        margin-right: 0;
                    }

                    li {
                        display: inline-block;
                        width: 38px;
                        height: 37px;


                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                        .bound{
                            line-height: 12px;
                            font-size: 12px;
                            color: #21BA58;
                        }
                        .unbound{
                            line-height: 12px;
                            font-size: 12px;
                            color: #999999;
                        }
                    }

                }
            }

            .personal-center-nav {
                font-size: 16px;
                text-align: center;
                color: #333333;

                a {
                    display: block;
                    height: 49px;
                    line-height: 49px;
                    &:hover{
                        color: #00A14A;
                    }

                }

                a:nth-last-of-type(1) {
                    margin-bottom: 0;
                }

                .icon {
                    display: inline-block;
                    width: 16px;
                    height: 17px;
                    margin-right: 17px;
                    vertical-align: middle;
                    background-size: 100% 100%;
                }

                a:nth-of-type(1) {
                    .icon {
                        background-image: url("../assets/imgs/personal-user-text.png");
                    }
                }

                a:nth-of-type(2) {
                    .icon {
                        background-image: url("../assets/imgs/personal-document.png");
                    }
                }

                a:nth-of-type(3) {
                    .icon {
                        background-image: url("../assets/imgs/interview-icon.png");
                    }
                }

                a:nth-of-type(4) {
                    .icon {
                        background-image: url("../assets/imgs/personal-book.png");
                    }
                }

                a:nth-of-type(5) {
                    .icon {
                        background-image: url("../assets/imgs/personal-company.png");
                    }

                }

                a:nth-of-type(6) {

                    .icon {
                        background-image: url("../assets/imgs/personal-id.png");
                    }
                }

                a:nth-of-type(7) {

                    .icon {
                        background-image: url("../assets/imgs/personal-text.png");
                    }

                }


                a:nth-of-type(8) {

                    .icon {
                        background-image: url("../assets/imgs/personal-horn.png");
                    }
                }

                .nuxt-link-exact-active:nth-of-type(1) {
                    .icon {
                        background-image: url("../assets/imgs/personal-user-text-h.png");
                    }
                }

                .nuxt-link-exact-active:nth-of-type(2) {
                    .icon {
                        background-image: url("../assets/imgs/personal-document-h.png");
                    }
                }

                .nuxt-link-exact-active:nth-of-type(3) {
                    .icon {
                        background-image: url("../assets/imgs/interview-icon-hover.png");
                    }
                }

                .nuxt-link-exact-active:nth-of-type(4) {
                    .icon {
                        background-image: url("../assets/imgs/personal-book-h.png");
                    }
                }

                .nuxt-link-exact-active:nth-of-type(5) {
                    .icon {
                        background-image: url("../assets/imgs/personal-company-h.png");
                    }

                }

                .nuxt-link-exact-active:nth-of-type(6) {

                    .icon {
                        background-image: url("../assets/imgs/personal-id-h.png");
                    }
                }

                .nuxt-link-exact-active:nth-of-type(7) {

                    .icon {
                        background-image: url("../assets/imgs/personal-text-h.png");
                    }

                }


                .nuxt-link-exact-active:nth-of-type(8) {

                    .icon {
                        background-image: url("../assets/imgs/personal-horn-h.png");
                    }
                }

                span {
                    display: inline-block;
                    width: 110px;
                    line-height: 16px;
                    text-align: left;
                    vertical-align: middle;
                }
            }
        }

        .personal-center-right {
            float: right;
            width: 925px;
            min-height: 695px;
            background: @white;
        }
    }
</style>
