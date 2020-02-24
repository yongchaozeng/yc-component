<template>
    <div class="page login-page-container">
        <div class="sticky-footer">
            <div class="header-box">
                <div class="header">
                    <div class="logo-box">
                        <div class="nav-left">
                            <nuxt-link to="/" class="logo">
                                <img class="img" src="../assets/imgs/logo-white.png" alt="logo"/>
                            </nuxt-link>
                        </div>
                        <div class="nav-right">
                            <nuxt-link to="/">
                                <p class="nav-link">课程首页</p>
                            </nuxt-link>
                            <nuxt-link to="/">
                                <p class="nav-link">微信</p>
                            </nuxt-link>
                            <nuxt-link to="/">
                                <p class="nav-link">微博</p>
                            </nuxt-link>
                            <nuxt-link to="/">
                                <p class="nav-link">电话</p>
                            </nuxt-link>
                        </div>

                    </div>
                    <div class="user-info">
                        <template v-if="userId">
                            <div class="user-text">
                                <p class="user-name">
                                    {{personalData.real_name?personalData.real_name:personalData.phone}}</p>
                            </div>
                            <pc-dropdown style="float: right;">
                                <img class="user-img"
                                     :src="personalData.url?personalData.url:require('@/assets/imgs/base-head-img.png')"
                                     alt="">
                                <template slot="list">
                                    <div>
                                        <nuxt-link to="/personal/personalData" class="list">个人中心</nuxt-link>
                                    </div>
                                    <div>
                                        <nuxt-link to="/personal/systemMessages" class="list">消息通知</nuxt-link>
                                    </div>
                                    <div>
                                        <div @click="logout" class="list">注销</div>
                                    </div>
                                </template>
                            </pc-dropdown>
                        </template>
                    </div>
                </div>
            </div>
            <nuxt class="main-container"/>
            <!--            <contacts-list></contacts-list>-->
        </div>
        <pc-footer></pc-footer>
    </div>
</template>
<script>

  import { mapMutations } from 'vuex'
  import cookie from 'js-cookie'
  import request from '../axios/request'
  import PcDropdown from '../components/pc-dropdown'
  import PcFooter from '../components/pc-footer'
  import ContactsList from '../components/contacts-list'

  export default {
    components: { ContactsList, PcFooter, PcDropdown },
    data() {
      return {
        footerNav: [
          '报名系统',
          '票务系统',
          '关于我们',
          '联系我们',
          '用户协议',
          '隐私政策',
          '法律声明'
        ],
        href: '',
      }
    },
    mounted() {
      this.href = window.location.href
    },
    methods: {
      ...mapMutations(['setUser']),
      async logout() {
        let data = await request.logOut({ access_token: this.accessToken, client_id: this.userId })
        if (data) {
          this.$msg(data.msg)
          cookie.remove('client_id')
          cookie.remove('access_token')
          this.setUser({ access_token: '', client_id: '' })
          this.$router.push({ path: '/' })
          sessionStorage.clear()
          localStorage.clear()
        }
      },
    },
    computed: {

      userId() {
        return this.$store.state.userId
      },
      accessToken() {
        return this.$store.state.accessToken
      },
      personalData() {
        return this.$store.state.personalData
      },
    }
  }
</script>
<style lang="less" scoped>
    .login-page-container {
        .header-box {
            height: 93px;
            background: #21BA58;
            color: @white;

            .header {
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                .clear-both;

                .logo-box {
                    float: left;
                    margin-top: 24px;
                    .clear-both;

                    .nav-left {
                        float: left;

                        .logo {
                            width: 190px;
                            height: 50px;

                            .img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }

                    .nav-right {
                        float: right;

                        a {
                            display: inline-block;
                            line-height: 49px;

                            .nav-link {
                                font-size: 16px;
                                font-weight: 400;
                                color: @white;
                                cursor: pointer;
                            }


                        }

                        a:nth-of-type(1) {
                            margin-left: 285px;
                        }

                        a:nth-of-type(2) {
                            margin-left: 90px;
                        }

                        a:nth-of-type(3) {
                            margin-left: 98px;
                        }

                        a:nth-of-type(4) {
                            margin-left: 97px;
                        }

                        a:nth-of-type(5) {
                            margin-left: 97px;
                        }

                    }


                }


                .user-info {
                    margin-top: 29px;
                    float: right;
                    .clear-both;

                    .input-box {
                        float: left;
                        width: 370px;

                        input {
                            border-color: #05CE61 !important;
                        }

                        .prefix {
                            color: #CCCCCC;
                            line-height: 40px;
                        }

                        .append {
                            border-color: #05CE61 !important;
                            background: #05CE61;
                            color: @white;
                        }
                    }

                    .user-img {
                        display: block;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 1px solid #e4e4e4;
                        background: #fff;
                        cursor: pointer;
                    }

                    .user-text {
                        float: left;
                        margin-right: 13px;

                        .user-name {
                            /*height: 15px;*/
                            /*margin-bottom: 3px;*/
                            line-height: 40px;
                            font-size: 14px;
                            font-weight: 400;
                            color: @white;


                        }


                    }

                    .append {
                        .search-icon {
                            width: 17px;
                            height: 17px;
                            vertical-align: middle;
                        }

                        a {
                            display: block;
                        }
                    }
                }

            }


        }

    }


</style>
