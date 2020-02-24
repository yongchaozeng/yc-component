<template>
    <div class="page home-page-container"
         :class="[{'search-head':urlType === 'searchHome'},{'details-head':urlType === 'details'}]">

        <div class="sticky-footer">
            <pc-header urlType="details" :personalData="personalData"></pc-header>

            <nuxt class="main-container"/>
            <template v-if="contactsShow">
                <contacts-list></contacts-list>
            </template>
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
        contactsShow: true,
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

    mounted() {
      if (this.$route.name === 'searchHome' || this.$route.name === 'details') {
        this.navShow = false
      }
      this.urlType = this.$route.name
      this.setContactsShow()

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
      setContactsShow(){
        let to = this.$route
        if (to.name === 'appointment' || to.name === 'collectMoney' || to.name === 'settlement'||to.name === 'paymentResult') {
          this.contactsShow = false
        } else {
          this.contactsShow = true
        }
      },
      userList() {
      },
      open() {
      }
    },
    watch: {
      $route(to, from) {
       this.setContactsShow()
      }
    },
  }
</script>

<style lang="less">

    .search-head {
        .user-name {
            color: @white !important;
        }

        .search-input {
            input {
                background: transparent;
                color: @white;
                border-color: @white !important;
            }

            .append {
                background: @white;
            }
        }

    }

</style>
