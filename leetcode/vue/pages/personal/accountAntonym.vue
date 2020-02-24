<template>
    <div class="personal-autonym-container">
        <div v-if="!isAutonymShow" class="com-form-head">
            实名信息认证
        </div>
        <div v-else class="com-form-head">
            实名信息查看
        </div>
        <div class="autonym-main"  :class="[{'look-autonym':isAutonymShow},{'edit-autonym':!isAutonymShow}]">
            <template  v-if="isAutonymShow === false">
                <div class="form-box">
                    <p>请输入真实姓名</p>
                    <pc-input v-model="name" height="50" ></pc-input>
                </div>
                <div class="form-box select">
                    <p>请选择证件类型</p>
                    <pc-select v-model.number="idType" height="50">
                        <pc-option v-for="(item,index) in idList" :key="index" :label="item.label"
                                   :value="item.value"></pc-option>
                    </pc-select>
                </div>
                <div class="form-box">
                    <p>请输入证件号码</p>
                    <pc-input v-model="id" height="50" ></pc-input>
                </div>
                <div class="form-box" v-if="idType!==1">
                    <p style="vertical-align: top;">请上传证件照片</p>
                    <div class="files-box" >
                        <img class="id-img" v-if="uploadImg" :src="uploadImg" alt="">
                        <img class="id-img" v-else src="../../assets/imgs/id-upload.png" alt="">
                        <input id="files" class="file-input" accept="image/png,image/gif,image/jpg" type="file" @change="uploadFile" name="file" value="上传">
                    </div>
                </div>

                <pc-button class="sub-button" @click="submitVerify">下一步</pc-button>
            </template>

            <template v-else-if="isAutonymShow === true">
                <div class="form-box">
                    <p>真实姓名</p>
                    <p>{{name}}</p>
                </div>
                <div class="form-box">
                    <p>证件类型</p>
                    <p>{{idTypeLabel}}</p>
                </div>
                <div class="form-box">
                    <p>证件号码</p>
                    <p>{{id}}</p>
                </div>
                <div class="form-box" v-if="idType!==1">
                    <p style="vertical-align: top;">证件图片</p>
                    <div class="files-box">
                        <img class="id-img" :src="passport_photo_url" alt="">
                    </div>
                </div>
                <!--                <pc-button class="sub-button" @click="submitChange">确定</pc-button>-->
            </template>
        </div>
    </div>
</template>

<script>
  import PcInput from '../../components/pc-input'
  import request from '../../axios/request'
  import PcButton from '../../components/pc-button'
  import PcSelect from '../../components/pc-select'
  import PcOption from '../../components/pc-option'
  import { papersType } from '../../utils/utils'
  import {changeAutonym} from '../../utils/formValidation'

  export default {
    /* 修改密码 */
    name: 'personalData',
    data() {
      return {
        isAutonymShow: null,
        userInfo: {},
        idList: papersType,
        id: '',
        name: '',
        idType: '',
        passport_photo_url: '',
        uploadImg: '',
        idTypeLabel: '',

      }
    },

    mounted() {
      this.init()
    },
    methods: {
      async uploadFile(e, b) {
        let formFile = new FormData()
        let file = document.querySelector('#files').files[0]
        formFile.append('file', file)
        let data = await request.upload(formFile)
        try {
          this.passport_photo_url = data.data.file_id
          this.uploadImg = this.ossUrl + '/' + data.data.file_id

        } catch (e) {

        }
      },
      async init() {
        let data = await request.authentication().catch((e) => {
          this.isAutonymShow = false
        })

        if (data && data.data &&data.data.real_name_au_detail) {
          this.isAutonymShow = true
          this.id = data.data.real_name_au_detail.id_card_no
          this.name = data.data.real_name_au_detail.real_name
          this.idType = data.data.real_name_au_detail.id_card_type
          this.idTypeLabel = data.data.real_name_au_detail.id_card_type_label
          this.passport_photo_url = data.data.real_name_au_detail.passport_photo_url
        } else {
          this.isAutonymShow = false
        }

      },
      async submitVerify() {
        if(changeAutonym.call(this)){
          return
        }
        let data = await request.changeAuthentication({
          real_name: this.name,
          id_card_no: this.id,
          id_card_type: this.idType,
          passport_photo_url: this.passport_photo_url,
        })
        if (data) {
          this.init()
          this.$msg(data.msg, 'succeed')
          this.$store.dispatch('getPersonalData')
        }
      },

    },
    computed: {
      ossUrl() {
        return this.$store.state.ossUrl
      }
    },
    components: { PcOption, PcSelect, PcButton, PcInput }
  }
</script>

<style lang="less" scoped>
    .personal-autonym-container {
        width: 100%;


        .autonym-main {
            width: 100%;
            height: 100%;
            padding: 35px 0 0 189px;
            text-align: center;
            background: @white;

            .files-box {
                display: inline-block;
                position: relative;
                width: 466px;
                height: 186px;


                .id-img{
                    height: 100%;
                }
                .file-input {
                    position: absolute;
                    top: 0;
                    left: 50px;
                    width: 288px;
                    height: 186px;
                    opacity: 0;
                    cursor: pointer;
                }
            }

            .form-box {
                text-align: left;
                padding-bottom: 30px;

                p {
                    display: inline-block;
                    width: 150px;
                    margin-right: 21px;
                    text-align: left;

                    font-size: 16px;
                    font-weight: 400;
                    color:rgba(153,153,153,1);
                }


                .code-img {
                    width: 138px;
                    height: 48px;
                    margin-left: 11px;
                    border: 1px solid @gray;
                }
            }

            .upload-img {
                margin-left: 324px;
                width: 466px;

                img {
                    width: 100%;
                    height: 100%;

                }
            }

            .sub-button {
                width: 466px;
                margin-left: 83px;
                border-radius: 0 !important;
                color: @white;
                background: @baseColor;
            }
        }
        .look-autonym{
            padding: 35px 190px 0 174px;
            .form-box{
                padding: 35px 0;

                border-bottom: 1px solid  rgba(243,243,243,1);
            }
            .files-box{
                width: 266px;

            }
        }
    }
</style>
<style lang="less">
    .personal-autonym-container {
        .input-box, .files-box {
            display: inline-block;

            .input {
                height: 50px;
                line-height: 50px;
            }
        }

        .autonym-main {


                .input-box {

                    width: 466px;
                }


        }
    }
</style>
