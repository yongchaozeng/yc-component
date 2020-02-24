<template>
    <ul class="personal-data-container ">
        <div v-if="!editShow"  >
            <li class="form-list">
                <span class="label">用户名</span>
                <span class="text">{{personalData.username|lack}}</span>
            </li>
            <li class="form-list" >
                <span class="label" style="vertical-align: top;">用户头像</span>
                <img class="head-img" :src="personalData.url" alt="">
            </li>
            <li class="form-list">
                <span class="label">真实姓名</span>
                <span class="text">{{personalData.real_name|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">身份证号</span>
                <span class="text">{{personalData.id_card_no|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">手机号</span>
                <span class="text">{{personalData.phone|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">邮箱</span>
                <span class="text">{{personalData.mailbox|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">微信</span>
                <span class="text">{{personalData.we_chat_nickname|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">性别</span>
                <span class="text">{{personalData.gender_label|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">出生日期</span>
                <span class="text">{{personalData.birthday|lack}}</span>
            </li>

            <li class="form-list button-form-list">
                <pc-button class="edit-button" @click="editInfo" height="35" radius>编辑</pc-button>
            </li>
        </div >
        <div v-else >
            <li class="form-list">
                <span class="label">用户名</span>
                <span class="text">{{personalData.username|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label" style="vertical-align: top;">用户头像</span>
                <div class="files-box">
                    <img v-if="uploadImg" class="head-img" :src="uploadImg" alt="">
                    <img v-else class="head-img" :src="personalData.url" alt="">
                    <input id="files" style="margin-top: 10px;" class="file-input" accept="image/png,image/gif,image/jpg" title="点击上传头像" type="file" @change="uploadFile" name="file" value="上传">
                    <span style="font-size: 12px;">点击头像上传</span>
                </div>
            </li>
            <li class="form-list">
                <span class="label">真实姓名</span>
                <span class="text">{{personalData.real_name|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">身份证号</span>
                <span class="text">{{personalData.id_card_no|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">手机号</span>
                <span class="text">{{personalData.phone|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">邮箱</span>
                <span class="text">{{personalData.mailbox|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">微信</span>
                <span class="text">{{personalData.we_chat_nickname|lack}}</span>
            </li>
            <li class="form-list">
                <span class="label">性别</span>
                <!--                <pc-input v-model="personalData.gender"></pc-input>-->
                <pc-radio class="pc-radio" style="margin-right: 30px;" v-model.number="personalData.gender" :label="1">
                    男
                </pc-radio>
                <pc-radio class="pc-radio" v-model.number="personalData.gender" :label="2">女</pc-radio>
            </li>
            <li class="form-list">
                <span class="label">出生日期</span>
                <pc-select class="year" v-model="birthday.year" height="40">
                    <pc-option v-for="(item,index) in enumYear" :key="index" :label="item.label"
                               :value="item.value"></pc-option>
                </pc-select>
                <span class="year-text">年</span>
                <pc-select class="month" v-model="birthday.month" height="40">
                    <pc-option v-for="(item,index) in enumMonth" :key="index" :label="item.label"
                               :value="item.value"></pc-option>
                </pc-select>
                <span class="year-month">月</span>
                <pc-select class="day" v-model="birthday.day" height="40">
                    <pc-option v-for="(item,index) in enumDay" :key="index" :label="item.label"
                               :value="item.value"></pc-option>
                </pc-select>
                <span class="year-day">日</span>
            </li>

            <li class="form-list button-form-list">
                <pc-button class="cancel-button" @click="cancel" height="35" radius>取消</pc-button>
                <pc-button class="edit-button" style="margin-left: 40px;" @click="save" height="35" radius>
                    完成
                </pc-button>
            </li>
        </div>

    </ul>
</template>

<script>
  import PcButton from '../../components/pc-button'
  import PcInput from '../../components/pc-input'
  import PcSelect from '../../components/pc-select'
  import { birthdayEnum, lackFilter } from '../../utils/mixin'
  import PcOption from '../../components/pc-option'
  import PcRadio from '../../components/pc-radio'
  import request from '../../axios/request'

  export default {
    /* 个人资料 */
    name: 'personalData',
    components: { PcRadio, PcOption, PcInput, PcButton, PcSelect },
    mixins: [birthdayEnum, lackFilter],
    data() {
      return {

        editShow: false,
        editPersonalData: {},
        birthday: {
          year: '',
          month: '',
          day: '',
        },
        urlId: '',
        uploadImg: '',

      }
    },
    mounted() {
    },
    computed: {
      personalData() {
        this.birthday.year = this.$store.state.personalData.birthday ? this.$store.state.personalData.birthday.split('-')[0] : ''
        this.birthday.month = this.$store.state.personalData.birthday ? this.$store.state.personalData.birthday.split('-')[1] : ''
        this.birthday.day = this.$store.state.personalData.birthday ? this.$store.state.personalData.birthday.split('-')[2] : ''
        return this.$store.state.personalData
      },
      ossUrl() {
        return this.$store.state.ossUrl
      },
      userName(){
        return this.$store.getters.userName
      },
    },
    methods: {
      async uploadFile(e, b) {
        let formFile = new FormData()
        let file = document.querySelector('#files').files[0]
        formFile.append('file', file)
        let data = await request.upload(formFile)
        try {
          this.urlId = data.data.file_id
          this.uploadImg = this.ossUrl + '/' + data.data.file_id

        } catch (e) {

        }
      },
      editInfo() {
        this.editShow = true
      },
      cancel() {
        this.editShow = false
      },
      async save() {

        let params = {}

        if (this.birthday.year && this.birthday.month && this.birthday.day) {
          params.birthday = `${this.birthday.year}-${this.birthday.month}-${this.birthday.day}`
        }
        if (this.urlId) {
          params.url = this.urlId
        }
        if (this.personalData.gender) {
          params.gender = this.personalData.gender
        }

        await request.setUser(params)
        this.editShow = false
        await this.$store.dispatch('getPersonalData')

      },
    },
  }
</script>

<style lang="less" scoped>
    .personal-data-container {
        width: 100%;
        padding: 0 26px 0 26px;
        background: @white;
        border-top: 4px solid @baseColor;

        .form-list {
            .year{
                display: inline-block;
                width: 98px ;
            }
            .month,.day{
                display: inline-block;
                width: 68px ;
            }
            .files-box {
                display: inline-block;
                position: relative;
                height: 40px;

                .file-input {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    opacity: 0;
                    cursor: pointer;
                }
            }

            .pc-radio{
                display: inline-block;
            }
            .edit-button {
                margin-top: 40px;
                width: 100px;
                font-size: 14px;
                color: @white;
                background: @baseColor;

            }
            .cancel-button{
                .edit-button;
                color:rgba(51,51,51,1);
                background:rgba(249,249,249,1);
                border:1px solid rgba(243,243,243,1);

            }

            .head-img {
                margin-top: 10px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .button-form-list{
            padding-left: 170px;
        }

    }
</style>
