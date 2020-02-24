<template>
    <div class="header-box" :class="[{'search-head':urlType === 'searchHome'},
    {'details-head':urlType === 'details'},{'header-scroll':headerScroll}]">
        <div class="header">
            <div class="logo-box">
                <nuxt-link to="/" class="logo">
                    <img v-if="urlType === 'searchHome'" class="img" src="../assets/imgs/logo-white.png" alt="logo"/>
                    <img v-else class="img" src="../assets/imgs/logo.png" alt="logo"/>
                </nuxt-link>
            </div>
            <div class="user-info">
                <pc-input v-if="inputShow" class="search-input"  v-model="search" radius placeholder="请输入班级名称搜索">
                    <template slot="append">
                        <nuxt-link :to="`/searchHome?name=${search}`">
                            <img v-if="urlType === 'searchHome'" class="search-icon"
                                 src="../assets/imgs/search-icon.png" alt="">
                            <img v-else class="search-icon" src="../assets/imgs/search-white.png" alt="">
                        </nuxt-link>
                    </template>
                </pc-input>
                <template v-if="userId">
                    <div class="user-text">
                        <p class="user-name">{{userName}}</p>
                    </div>
                    <pc-dropdown style="float: right;">
                        <img class="user-img"
                             :src="personalData && personalData.url?personalData.url:require('@/assets/imgs/base-head-img.png')"
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
                <template v-else>
                    <div @click="toLogin" class="user-text">
                        <p class="user-name cursor">登录/注册</p>
                    </div>
                    <img class="user-img" @click="toLogin"  :src="require('@/assets/imgs/base-head-img.png')" alt="">
                </template>

            </div>
        </div>
    </div>
</template>

<script>
  import PcDropdown from './pc-dropdown'
  import PcInput from './pc-input'
  import cookie from 'js-cookie'
  import { mapState, mapMutations } from 'vuex'
  import request from '../axios/request'

  export default {
    name: 'pc-header',
    props: {
      personalData: {
        type: Object,
      },
      urlType: {
        type: String,
      }
    },
    data() {
      return {
        search: '',
        loginUrl: process.env.loginUrl,
        inputShow: true,
        headerScroll: false,
      }
    },
    created() {
      this.search = this.$route.query.name || ''
    },
    mounted() {
      this.setContactsShow()
      // this.scrollInit()
    },
    methods: {
      ...mapMutations(['setUser']),
      scrollInit() {
        window.onscroll = (e) => {
          if (document.documentElement.scrollTop >= 150) {
            this.headerScroll = true
          } else {
            this.headerScroll = false
          }
        }
      },
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
      toLogin() {
        this.$store.dispatch('toLogin')
      },
      setContactsShow() {
        let to = this.$route
        if (to.name === 'appointment' || to.name === 'collectMoney' || to.name === 'settlement' || to.name === 'paymentResult') {
          this.inputShow = false
        } else {
          this.inputShow = true
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
      userName() {
        return this.$store.getters.userName
      },
    },
    watch: {
      $route(to, from) {
        this.setContactsShow()
      }
    },
    components: { PcInput, PcDropdown },
  }
</script>

<style lang="less" scoped>
    .header-scroll {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 0 2px #ccc;
        z-index: 10;

    }



    .header-box {

        background: @white;
        color: @white;
        font-size: 14px;
        font-weight: 400;

        .header {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            .clear-both;


            .logo-box {
                float: left;
                margin-top: 25px;
                margin-bottom: 25px;

                .logo {
                    width: 190px;
                    height: 50px;

                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .nav-link {
                    font-size: 16px;
                    font-weight: 400;
                    color: @white;
                    cursor: pointer;
                }

                .nav-link:nth-of-type(1) {
                    margin-left: 169px;
                }

                .nav-link:nth-of-type(2) {
                    margin-left: 121px;
                }

                .nav-link:nth-of-type(3) {
                    margin-left: 98px;
                }

                .nav-link:nth-of-type(4) {
                    margin-left: 97px;
                }

                .nav-link:nth-of-type(5) {
                    margin-left: 97px;
                }
            }


            .user-info {
                margin-top: 25px;
                margin-bottom: 25px;
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
                    cursor: pointer;
                    background: #fff;
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
                        color: #333;


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

    .search-head {

        height: 450px;
        background: url("../assets/imgs/search-head.png") no-repeat;
        background-size: 100% 450px;

        .header {
            height: 93px;
        }


        .search-input {
            input {
                background: transparent;
                color: @white;
                border-color: @white;
            }

            .append {
                background: @white;
            }
        }

    }
</style>
<style lang="less">
    .home-page-container {
        .search-input {
            width: 369px;
            margin: 0 270px 0 100px;

            .append {
                background: #21BA58;
            }

        }

        .details-head {
            .search-input {
                /*margin: 0 246px 0 100px;*/
            }

        }

        .search-head {
            .user-name {
                color: @white !important;
            }

            .search-input {
                margin: 0 30px 0 100px;
                input {
                    background: transparent;
                    color: @white;
                    border-color: @white !important;
                    &:focus{
                        box-shadow:none;
                    }
                }

                .append {
                    background: @white;
                }
            }

        }
    }


</style>
