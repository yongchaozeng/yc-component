<template>
    <div class="page home-page-container">
        <div class="sticky-footer">
            <pc-header urlType="" :personalData="personalData"></pc-header>
            <div v-if="navShow" class="nav-list-box">
                <div class="w1200">
                    <div class="menu-list">
                        <p class="title">
                            <nuxt-link to="/">
                                全部班级分类
                            </nuxt-link>
                        </p>
                        <div class="top-menu-box" @mouseout.stop.self="clearSpecialtyList">
                            <div class="top-menu-list-box">
                                <div class="top-menu" @mouseover="getSpecialtyList(item,index)"
                                     v-for="(item,index) in classCategory" :key="index">
                                    <nuxt-link :to="`/searchHome?center=${item.id}`" class="left-title">
                                        {{item.name}}
                                    </nuxt-link>
                                    <div class="children-list-box" >
                                        <nuxt-link :title="children.name" :to="`/searchHome?center=${item.id}&specialty=${children.id}`"
                                                   class="children-list" v-if="idx === 0 || idx === 1"
                                                   v-for="(children,idx) in item.children" :key="idx">
                                            {{children.name}}
                                        </nuxt-link>
                                    </div>
                                </div>
                            </div>
                            <ul class="specialty-box" @mouseout.stop @mouseovers.stop v-if="specialtyList">
                                <nuxt-link :title="item.name" :to="`/searchHome?specialty=${item.id}&center=${centerId}`"
                                           class="specialty-list"
                                           v-for="(item,idx) in specialtyList" :key="idx">
                                    {{item.name}}
                                </nuxt-link>
                            </ul>

                        </div>
                    </div>
                    <ul class="nav-list">
                        <li v-for="(item,index) in navList" :key="index" class="cursor">
                            <nuxt-link :to="item.link">
                                {{item.name}}
                                <i class="home-nav-hover"></i>
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
            <nuxt class="main-container"/>
            <contacts-list></contacts-list>
        </div>
        <pc-footer></pc-footer>

    </div>
</template>
<script>
  import PcInput from '../components/pc-input'
  import PcDropdown from '../components/pc-dropdown'
  import PcFooter from '../components/pc-footer'
  import request from '../axios/request'
  import PcHeader from '../components/pc-header'
  import cookie from 'js-cookie'
  import ContactsList from '../components/contacts-list'

  export default {
    components: { ContactsList, PcHeader, PcFooter, PcDropdown, PcInput },
    data() {
      return {
        specialtyList: null,
        navShow: true,
        search: '',
        urlType: '',
        centerId: '',
        footerNav: [
          '报名系统',
          '票务系统',
          '关于我们',
          '联系我们',
          '用户协议',
          '隐私政策',
          '法律声明'
        ],
        navList: [
          { name: '报名须知', link: '/apply' },
          { name: '支付须知', link: '/payment' },
          { name: '家长问答', link: '/patriarchFAQ' },
          { name: '招生咨询', link: '/enrollment' },
          { name: '意见反馈', link: '/feedback' },
        ],
      }
    },
    created() {
      if (this.$route.name === 'searchHome' || this.$route.name === 'details') {
        this.navShow = false
      }
      this.urlType = this.$route.name
    },
    mounted() {

    },
    computed: {

      personalData() {
        return this.$store.state.personalData
      },
      classCategory() {
        return this.$store.state.classCategory
      },
    },
    methods: {
      getSpecialtyList(item) {
        this.specialtyList = item.children

        this.$nextTick(()=>{
          let specialtyDom = document.querySelector('.specialty-box')
          let topMenuDom = document.querySelector('.top-menu-list-box')
          this.centerId = item.id
          if (specialtyDom) {
            specialtyDom.style.height = `${topMenuDom.offsetHeight}px`

          }
        })

      },
      clearSpecialtyList() {
        this.specialtyList = null
      },

      userList() {
      },
      open() {
      }
    },
  }
</script>
<style lang="less" scoped>
    .home-page-container {
        .nav-list-box {
            position: relative;
            height: 47px;
            padding: 10px 0 23px 0;
            line-height: 16px;
            font-size: 14px;
            font-weight: bold;
            background: @white;

            .w1200 {
                width: 1200px;
                margin: 0 auto;
            }

            .menu-list {
                position: absolute;
                width: 108px;
                margin-left: 14px;
                color: @white;
                background: @white;
                z-index: 2;

                .title {
                    height: 16px;
                    text-align: center;
                    line-height: 16px;
                    font-size: 14px;
                    font-weight: 600;
                    background: @white;

                    a {
                        display: block;
                        height: 40px;
                        color: rgba(153, 153, 153, 1);
                    }

                    .nuxt-link-exact-active {
                        height: 40px;
                        font-size: 16px;
                        font-weight: 600;
                        color: rgba(33, 186, 88, 1);
                        background: url("../assets/imgs/home-nav-hover.png") no-repeat;
                        background-size: 54px 14px;
                        background-position: 50% 10px;
                    }

                }

                .top-menu-box {
                    position: absolute;
                    top: 32px;
                    left: 0;
                    width: 300px;
                    display: none;
                    background: @white;
                    box-shadow: -2px 0 9px 1px rgba(51, 51, 51, 0.1);
                    //.clear-both;

                    .top-menu-list-box {
                        padding: 15px 0 15px 13px;
                        border-right: 1px solid #f3f3f3;
                        /*float: left;*/

                        .top-menu {
                            /*height: 30px;*/
                            height: 13px;
                            /*padding: 10px 0 10px 17px;*/
                            margin-bottom: 27px;
                            margin-right: -1px;
                            line-height: 13px;
                            color: #333;
                            font-size: 13px;
                            font-weight: 300;
                            border-right: 1px solid transparent;

                            .clear-both;
                            .left-title {
                                float: left;
                                width: 90px;
                                cursor: pointer;
                            }

                            .children-list-box {
                                float: left;
                                width: 195px;
                                padding-left: 10px;
                                padding-right: 10px;
                                .clear-both;

                                .children-list {
                                    float: left;
                                    max-width: 85px;
                                    color: #999;
                                    cursor: pointer;
                                    .com-ellipsis;
                                }
                                .children-list:nth-of-type(2){
                                    float: right;
                                }
                            }


                            &:hover {
                                border-right-color: #21BA58;
                                .children-list {
                                    color: #21BA58;
                                }

                                .left-title {
                                    color: #21BA58;
                                }
                            }
                        }
                        .top-menu:nth-last-of-type(1){
                            margin-bottom: 0;
                        }

                    }


                    .specialty-box {
                        /*float: right;*/
                        position: absolute;
                        top: 0;
                        left: 300px;
                        width: 550px;
                        /*height: 400px;*/
                        padding: 15px 15px 10px 45px;
                        background: @white;
                        box-shadow: 6px 0 5px 1px rgba(51, 51, 51, 0.1);

                        .specialty-list {
                            display: inline-block;
                            margin: 0 40px 30px 0;
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(153, 153, 153, 1);
                            cursor: pointer;

                            &:hover {
                                color: #21BA58;
                            }
                        }
                    }

                }

                &:hover {

                    .top-menu-box {
                        display: block;
                    }
                    .title{
                        a{
                            color: rgba(33, 186, 88, 1);
                        }
                    }

                }

            }

            .nav-list {

                height: 100%;
                margin-left: 156px;
                text-align: center;
                line-height: 16px;
                .clear-both;

                li{
                    float: left;
                    margin-left: 10px;
                }
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    margin-right: 67px;
                    font-size: 14px;
                    color: #999;
                    font-weight: bold;
                    color: rgba(153, 153, 153, 1);
                    &:hover{
                        color: rgba(33, 186, 88, 1);
                    }
                }

                .nuxt-link-active {
                    height: 40px;
                    font-size: 16px;
                    font-weight: 600;
                    color: rgba(33, 186, 88, 1);
                    background: url("../assets/imgs/home-nav-hover.png") no-repeat;
                    background-size: 54px 14px;
                    background-position: 50% 10px;
                }
            }

        }

    }

</style>
<style lang="less">
    .home-page-container{
        .header-box{
            .user-info{
                .placeholder-style(#CCCCCC);

            }
        }

    }
</style>
