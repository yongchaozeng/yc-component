<template>
    <div class="page home-page-container"
         :class="[{'search-head':urlType === 'searchHome'},{'details-head':urlType === 'details'}]">
        <div class="sticky-footer">
            <pc-header urlType="searchHome" :personalData="personalData"></pc-header>
            <div v-if="navShow" class="nav-list-box">
                <div class="w1200">
                    <div class="menu-list">
                        <p class="title">全部班级分类</p>
                        <div class="top-menu" v-for="(item,index) in classCategory" :key="index">
                            <p>{{item.name}}</p>
                            <div class="children-list-box">
                                <div class="children-list" v-if="idx === 0 || idx === 1"
                                     v-for="(children,idx) in item.children" :key="idx">
                                    {{children.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="nav-list">

                        <li v-for="(item,index) in navList" :key="index" class="cursor">
                            <nuxt-link :to="item.link">{{item.name}}</nuxt-link>
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
  import ContactsList from '../components/contacts-list'

  export default {
    components: { ContactsList, PcHeader, PcFooter, PcDropdown, PcInput },
    data() {
      return {
        navShow: true,
        search: '',
        urlType: '',
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

      userList() {
      },
      open() {
      }
    },
  }
</script>

<style lang="less">


    .search-head {

        .search-input {
            input {
                background: transparent;
                color: @white;
                border-color: @white !important;
            }

            .append {
                background: @white;
            }

            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
                color: @white !important;
            }

            input:-moz-placeholder, textarea:-moz-placeholder {
                color: @white !important;
            }

            input::-moz-placeholder, textarea::-moz-placeholder {
                color: @white !important;
            }

            input:-ms-input-placeholder, textarea:-ms-input-placeholder {
                color: @white !important;
            }
        }

    }


</style>
