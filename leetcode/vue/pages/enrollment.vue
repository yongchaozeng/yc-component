<template>
    <div class="enrollment-container">
        <div class="enrollment-title">
            请输入查找的项目
        </div>
        <div class="enrollment-main">
            <pc-input class="input" height="50" v-model="searchValue"></pc-input>
            <pc-button class="sub-button" @click="getContactUs">确定提交</pc-button>
        </div>
        <div class="enrollment-text">
            {{content.contact_info}}
        </div>
    </div>
</template>

<script>
  import PcInput from '../components/pc-input'
  import PcButton from '../components/pc-button'
  import request from '../axios/request'

  export default {
    name: 'enrollment',
    data() {
      return {
        searchValue: '',
        id: '',
        content: ''
      }
    },
    async created() {
      // await this.getAllOrg()
      // await this.getContactUs()
    },
    methods: {
      async getAllOrg() {
        let data = await request.allOrg()
        if (data.data && data.data.org_list) {
          if (data.data.org_list[0]) {
            this.id = data.data.org_list[0].id
          }
        }
      },
      async getContactUs() {
        if (!this.searchValue) {
          this.$msg('查找项目不能为空', {type:'error'});
          return
        }
        let data = await request.contactUs({ search_name: this.searchValue })
        if (data && data.data && data.data.contact_information) {
          this.content = data.data.contact_information
        } else {
          this.content = { contact_info: '搜索结果：未查找到匹配信息，您可拨打统一对外咨询电话：010—66513100。' }
        }
      },
    },
    components: { PcButton, PcInput }
  }
</script>

<style lang="less" scoped>

    .enrollment-container {
        width: 1200px;
        min-height: 527px;
        margin: 30px auto 43px auto;
        padding: 130px 70px 23px 70px;
        background: @white;

        .enrollment-title {
            margin-bottom: 20px;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: rgba(33, 186, 88, 1);
        }

        .enrollment-main {
            .clear-both;

            .input {
                float: left;
                width: 806px;
                margin-left: 50px;


            }

            .sub-button {
                float: right;
                width: 177px;
                height: 50px;
                background: rgba(33, 186, 88, 1);
                border-radius: 2px;
                font-size: 18px;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 24px;
            }
        }

        .enrollment-text {
            margin-top: 20px;
            margin-left: 90px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
        }

    }

</style>
<style lang="less">
    .enrollment-container {
        .enrollment-main {
            .input {
                input {
                    padding: 0 15px 0 40px;
                    border: 1px solid rgba(243, 243, 243, 1);
                }
            }
        }

    }
</style>
