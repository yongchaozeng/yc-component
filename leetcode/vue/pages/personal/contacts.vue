<template>
    <div class="contacts-container">
        <div class="contacts-list-head">
            <div class="add-title" v-if="addContactsShow">添加联系人</div>
            <pc-slide v-else-if="contactList && contactList.length>5" class="contacts-list-slide">
                <ul class="contacts-list-box" :style="{'width':`${width}px`}">
                    <li
                            class="contacts-list"
                            :class="{'active':(activeIndex === index) && !addContactsShow }"
                            v-for="(item,index) in contactList"
                            @click="getDatails(item,index)"
                            :key="index"
                    >{{item.name}}
                    </li>
                </ul>
            </pc-slide>
            <ul v-else-if="contactList" class="contacts-list-box" :style="{'width':`${width}px`}">
                <li
                        class="contacts-list"
                        :class="{'active':(activeIndex === index) && !addContactsShow }"
                        v-for="(item,index) in contactList"
                        @click="getDatails(item,index)"
                        :key="index"
                >{{item.name}}
                </li>
            </ul>
            <div class="contacts-list-add" v-if="!editContactsShow && !addContactsShow" @click="addContacts">+添加联系人
            </div>
        </div>
        <ul v-if="(!addContactsShow && !editContactsShow) && contactDetails && contactList.length>0"
            class="contacts-details form-container">
            <li class="form-list">
                <span class="label">关系</span>
                <pc-input v-model="contactDetails.relation_label" :disabled="disabled"></pc-input>
            </li>
            <li class="form-list">
                <span class="label">真实姓名</span>
                <pc-input v-model="contactDetails.name" :disabled="disabled"></pc-input>
            </li>
            <li class="form-list">
                <span class="label">证件类型</span>
                <pc-input v-model="contactDetails.id_card_type_label" :disabled="disabled"></pc-input>
            </li>
            <li class="form-list">
                <span class="label">证件号码</span>
                <pc-input v-model="contactDetails.id_card_no" :disabled="disabled"></pc-input>
            </li>
            <li class="form-list id-img" v-if="contactDetails.id_card_type!==1">
                <span class="label">证件照片</span>
                <img class="document-photo-img" :src="contactDetails.document_photo" alt/>
            </li>
            <li class="form-list">
                <span class="label">性别</span>
                <pc-input v-model="contactDetails.gender_label" :disabled="disabled"></pc-input>
            </li>
            <li class="form-list">
                <span class="label">出生日期</span>
                <pc-input v-model="contactDetails.birthday" :disabled="disabled"></pc-input>
            </li>
            <li class="form-list">
                <span class="label">年龄</span>
                <pc-input v-model="age" :disabled="disabled"></pc-input>
            </li>

            <li class="form-list">
                <span class="label">年级</span>
                <pc-input v-model="contactDetails.grade_label" :disabled="disabled"></pc-input>
            </li>
            <!--            <li class="form-list" >-->
            <!--                <span class="label" style="vertical-align: top;">联系人头像</span>-->
            <!--                <img class="head-img" style="margin-top: 10px;" :src="contactDetails.url" alt="">-->
            <!--            </li>-->
            <!--            <li class="form-list">-->
            <!--                <span class="label">联系人电话</span>-->
            <!--                <span class="text">{{contactDetails.contact_phone||'暂无'}}</span>-->
            <!--            </li>-->
            <li class="form-list button-form-list">
                <pc-button @click="deleteForm" class="delete-button" height="40" radius>删除</pc-button>
                <pc-button @click="editForm" class="edit-button" height="40" radius>编辑</pc-button>
            </li>
            <!--            <li v-else class="form-list">-->
            <!--              -->
            <!--                <pc-button @click="cancel" class="edit-button" height="40" radius>取消</pc-button>-->
            <!--                <pc-button @click="save" class="delete-button" height="40" radius>保存</pc-button>-->
            <!--            </li>-->
        </ul>
        <ul v-else-if="addContactsShow || editContactsShow" class="contacts-details form-container">
            <li class="form-list select">
                <span class="label">关系</span>
                <pc-select v-model="newContacts.relation" height="40" key="'1">
                    <pc-option
                            v-for="(item,index) in enumContacts"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                    ></pc-option>
                </pc-select>
                <!--                <pc-input v-model="newContacts.relation_label" :disabled="false"></pc-input>-->
            </li>
            <li class="form-list">
                <span class="label">真实姓名</span>
                <pc-input v-model="newContacts.name" :disabled="false"></pc-input>
            </li>
            <li class="form-list">
                <span class="label">证件类型</span>
                <pc-select v-model.number="newContacts.id_card_type" height="50">
                    <pc-option
                            v-for="(item,index) in papersType"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                    ></pc-option>
                </pc-select>
                <!--                <pc-input v-model="contactDetails.name" :disabled="disabled"></pc-input>-->
            </li>
            <li class="form-list">
                <span class="label">证件号码</span>
                <pc-input @blur="blurId" v-model="newContacts.id_card_no" :disabled="false"></pc-input>
            </li>
            <li class="form-list id-img" v-show="newContacts.id_card_type!==1">
                <span class="label">证件照片</span>
                <div class="files-box">
                    <img v-if="uploadFileImg" class="document-photo-img" :src="uploadFileImg" alt/>
                    <img v-else-if="newContacts.document_photo" class="document-photo-img"
                         :src="newContacts.document_photo" alt/>
                    <img v-else class="document-photo-img" src="../../assets/imgs/id-upload.png" alt/>
                    <input
                            placeholder="点击上传头像"
                            id="files"
                            class="file-input"
                            type="file" accept="image/png,image/gif,image/jpg"
                            @change="uploadFile"
                            name="file"
                            value="上传"/>
                </div>
            </li>

            <li class="form-list">
                <span class="label">性别</span>
                <pc-radio class="pc-radio" v-model.number="newContacts.gender" :label="1">男</pc-radio>
                <pc-radio class="pc-radio" v-model.number="newContacts.gender" :label="2">女</pc-radio>
                <!--                <pc-input v-model.number="newContacts.gender" :disabled="false"></pc-input>-->
            </li>
            <li class="form-list birthday">
                <span class="label">出生日期</span>
                <pc-select @change="getBirthday" :disabled="newContacts.id_card_type === 1" class="year"
                           v-model="birthday.year" height="40">
                    <pc-option
                            v-for="(item,index) in enumYear"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                    ></pc-option>
                </pc-select>
                <span class="year-text">年</span>
                <pc-select @change="getBirthday" :disabled="newContacts.id_card_type === 1" class="month"
                           v-model="birthday.month" height="40">
                    <pc-option
                            v-for="(item,index) in enumMonth"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                    ></pc-option>
                </pc-select>
                <span class="year-month">月</span>
                <pc-select @change="getBirthday" :disabled="newContacts.id_card_type === 1" class="day"
                           v-model="birthday.day" height="40">
                    <pc-option
                            v-for="(item,index) in enumDay"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                    ></pc-option>
                </pc-select>
                <span class="year-day">日</span>
                <!--                <pc-input v-model.number="newContacts.grade" :disabled="false"></pc-input>-->
            </li>

            <li class="form-list">
                <span class="label">年龄</span>
                <!--                <pc-input key="2" v-model="newContacts.age" :disabled="disabled"></pc-input>-->
                <pc-input key="2" v-model="age" :disabled="disabled"></pc-input>
            </li>

            <li class="form-list">
                <span class="label">年级</span>
                <pc-select v-model="newContacts.grade" height="40">
                    <pc-option
                            v-for="(item,index) in chooseList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                    ></pc-option>
                </pc-select>
            </li>
            <!--            <li class="form-list">-->
            <!--                <span class="label" style="vertical-align: top;">联系人头像</span>-->
            <!--                <div class="files-box">-->
            <!--                    <img v-if="uploadImg" class="head-img" :src="uploadImg" alt="">-->
            <!--                    <img v-else class="head-img" :src="newContacts.url?newContacts.url:require('../../assets/imgs/base-head-img.png')" alt="">-->
            <!--                    <input id="headFile"  class="head-file-input" accept="image/png,image/gif,image/jpg" title="点击上传头像" type="file" @change="headUploadFile" name="file" value="上传">-->
            <!--                    <span style="font-size: 12px;">点击头像上传</span>-->
            <!--                </div>-->
            <!--            </li>-->
            <!--            <li class="form-list">-->
            <!--                <span class="label">联系人电话</span>-->
            <!--                <pc-input key="2" v-model="newContacts.contact_phone" ></pc-input>-->

            <!--            </li>-->
            <li class="form-list button-form-list">
                <pc-button @click="cancelNew" class="delete-button" height="40" radius>取消</pc-button>
                <pc-button @click="saveNew" class="edit-button" height="40" radius>保存</pc-button>
            </li>
        </ul>

    </div>
</template>

<script>
    import request from '../../axios/request';
    import PcInput from '../../components/pc-input';
    import PcButton from '../../components/pc-button';
    import PcSelect from '../../components/pc-select';
    import PcOption from '../../components/pc-option';
    import PcCheckbox from '../../components/pc-checkbox';
    import PcRadio from '../../components/pc-radio';
    import {birthdayEnum, uploadFile} from '../../utils/mixin';
    import {papersType, getPapersInfo} from '../../utils/utils';
    import PcSlide from '../../components/pc-slide';
    import {verifyContacts} from '../../utils/formValidation';

    export default {
        /* 联系人 */
        name: 'classGrade',

        components: {PcSlide, PcRadio, PcCheckbox, PcOption, PcSelect, PcButton, PcInput},

        mixins: [birthdayEnum, uploadFile],
        data() {
            return {
                contactList: [],
                urlId: '',
                uploadImg: '',
                width: '',
                papersType: papersType, // 证件类型
                contactDetails: null,
                activeIndex: 0,
                disabled: true,
                addContactsShow: false,
                editContactsShow: false,
                newContacts: {
                    // gender: 1,
                    // age: 0
                },
                age: 0,
                chooseList: [], // 年级
                birthday: {
                    year: '',
                    month: '',
                    day: ''
                },
                enumGrade: [
                    {label: '一年级', value: 1},
                    {label: '二年级', value: 2},
                    {label: '三年级', value: 3},
                    {label: '四年级', value: 4}
                ],
                enumContacts: [
                    {label: '儿子', value: 1},
                    {label: '女儿', value: 2},
                    {label: '自己', value: 3},
                    {label: '其他', value: 4}
                ]
            };
        },
        mounted() {
            this.init();
            this.getEnumChoose();

        },
        methods: {
            async headUploadFile(e, b) {
                let formFile = new FormData();
                let file = document.querySelector('#headFile').files[0];
                formFile.append('file', file);
                let data = await request.upload(formFile);
                try {
                    this.urlId = data.data.file_id;
                    this.uploadImg = this.ossUrl + '/' + data.data.file_id;

                } catch (e) {

                }
            },
            // 有联系人的时候默认加载第一个联系人
            async init() {
                let data = await request.contactList();
                if (data && data.data && data.data.list) {
                    this.contactList = data.data.list;
                }
                if (this.contactList && this.contactList.length > 0) {
                    this.getDatails({id: this.contactList[0].id}, 0);
                }
                this.$nextTick(() => {
                    this.width = (this.contactList.length + 1) * 140 + 80;
                });
            },
            // 切换联系人
            async getDatails(item, index) {
                this.addContactsShow = false;
                this.editContactsShow = false;
                this.activeIndex = index;
                let data = await request.contactDetails(item.id);
                if (data && data.data && data.data.contact_info_detail) {
                    this.contactDetails = data.data.contact_info_detail;
                    this.uploadFileId = this.contactDetails.document_photo ? this.contactDetails.document_photo.split('com/')[1] : '';
                    this.getAge();
                    this.getBirthday();
                    //   this.contactDetails.document_photo =
                    //     this.contactDetails.document_photo ||
                    //     require('../../assets/imgs/test1.png')
                }
            },
            // 获取年级枚举
            async getEnumChoose() {
                let data = await request.enumChoose();
                if (data && data.data && data.data.select_list) {
                    this.chooseList = data.data.select_list;
                }
            },
            // 添加联系人
            addContacts() {
                this.addContactsShow = true;
                this.clearData();
            },
            // 编辑联系人
            async editForm() {
                this.editContactsShow = true;
                this.newContacts = JSON.parse(JSON.stringify(this.contactDetails));
            },
            getAge() {
                let birthday = this.contactDetails.birthday;
                this.birthday.year = birthday ? birthday.split('-')[0] : '';
                this.birthday.month = birthday ? birthday.split('-')[1] : '';
                this.birthday.day = birthday ? birthday.split('-')[2] : '';
            },
            blurId(value) {
                let info = getPapersInfo(value);
                if (info.year) {
                    this.birthday.year = info.year;
                    this.birthday.month = info.month;
                    this.birthday.day = info.day;
                }
                if (info.age) {
                    this.age = info.age;
                }
                if (info.gender) {
                    this.$set(this.newContacts, 'gender', info.gender);
                }
            },
            clearData() {
                this.age = null;
                this.clearObj(this.newContacts);
                this.clearObj(this.birthday);
                this.uploadFileId = '';
                this.uploadFileImg = '';
                this.urlId = '';
                this.uploadImg = '';
            },
            clearObj(obj) {
                for (let key in obj) {
                    delete obj[key];

                }
            },

            // 编辑保存
            async save() {
                if (verifyContacts.call(this)) {
                    return;
                }
                let data = await request.editContactList(
                    this.contactDetails.id,
                    this.contactDetails
                );
                if (data.msg) {
                    this.$msg(data.msg, 'succeed');
                }
                this.editContactsShow = true;
                this.getContactList();
            },
            // 取消新联系人
            cancelNew() {
                this.uploadFileId = '';
                this.uploadFileImg = '';
                this.editContactsShow = false;
                this.addContactsShow = false;
            },
            // 保存新联系人
            async saveNew() {
                let data = null;
                let params = {};

                if (verifyContacts.call(this)) {
                    return;
                }

                params = {
                    ...this.newContacts,
                    birthday: `${this.birthday.year}-${this.birthday.month}-${this.birthday.day}`,
                    document_photo: this.uploadFileId,

                };
                // if (this.urlId) {
                //   params.url = this.urlId
                // }
                // else if (params.url.split('com/')) {
                //   params.url = params.url?params.url.split('com/')[1]:''
                // }


                if (this.addContactsShow) {
                    data = await request.addContactList(params);
                } else {
                    data = await request.editContactList(this.newContacts.id, params);
                }
                this.$bus.$emit('changeContacts', 'change');
                this.clearData();
                if (this.addContactsShow) {
                    this.getContactList('add');
                } else {
                    this.getContactList();
                }
                this.addContactsShow = false;
                this.editContactsShow = false;
            },
            // 删除联系人
            async deleteForm(item, index) {
                let data = await request.daleteContactList(this.contactDetails.id);
                if (data.msg) {
                    this.$msg(data.msg, 'succeed');
                }
                if (sessionStorage.getItem('contact')) {
                    if (this.contactDetails.id === JSON.parse(sessionStorage.getItem('contact')).id) {
                        sessionStorage.clear('contact');
                    }
                }

                this.$bus.$emit('changeContacts', 'delete');
                await this.getContactList();
                await this.init();
            },
            // 获取联系人
            async getContactList(type) {
                let contact = await request.contactList();
                try {
                    this.contactList = contact.data.list;
                    this.activeIndex = 1;
                    this.init();
                } catch (e) {
                }
            },
            getBirthday() {
                if (this.newContacts.id_card_type === 1) {
                    return;
                }
                if (this.birthday.year && this.birthday.month && this.birthday.day) {
                    let strBirthday = `${this.birthday.year}/${this.birthday.month}/${this.birthday.day}`;
                    let birthDate = new Date(strBirthday);
                    let nowDateTime = new Date();
                    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
                    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
                    if (
                        nowDateTime.getMonth() < birthDate.getMonth() ||
                        (nowDateTime.getMonth() == birthDate.getMonth() &&
                            nowDateTime.getDate() < birthDate.getDate())
                    ) {
                        age--;
                    }

                    if (this.addContactsShow) {
                        // this.newContacts.age = age
                        this.age = age;
                    } else {
                        this.age = age;
                        // this.contactDetails.age = age
                    }
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .contacts-container {
        width: 100%;

        .contacts-list-head {
            line-height: 54px;
            background: @white;
            border-top: 4px solid @baseColor;
            .clear-both;

            .add-title {
                padding-left: 30px;
                font-size: 16px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                line-height: 44px;
            }

            .contacts-list-slide {
                float: left;
            }

            .contacts-list-box {
                float: left;
                height: 47px;
                line-height: 47px;
                padding: 0 48px 0 32px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);

                .contacts-list {
                    display: inline-block;
                    width: 100px;
                    margin-right: 40px;
                    cursor: pointer;
                    .com-ellipsis;

                    &:hover {
                        color: rgba(0, 161, 74, 1);
                    }
                }

                .active {
                    font-size: 16px;
                    font-weight: bold;
                    color: rgba(33, 186, 88, 1);
                }
            }

            .contacts-list-add {
                float: right;
                min-width: 88px;
                margin-right: 30px;
                line-height: 47px;
                font-size: 16px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                cursor: pointer;

                &:hover {
                    color: rgba(0, 161, 74, 1);
                }
            }
        }

        .contacts-details {
            .form-list {
                padding: 0 0 0 25px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);

                .head-img {
                    width: 40px;
                    height: 40px;
                    /*margin-top: 10px;*/
                    border-radius: 50%;
                }

                .files-box {
                    display: inline-block;
                    position: relative;
                    top: 10px;

                    img {
                        height: 100%;
                    }

                    .document-photo-img {
                        display: block;
                        width: 144px;
                        height: 93px;
                    }

                    .file-input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 144px;
                        height: 93px;
                        opacity: 0;
                    }

                    .head-file-input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 40px;
                        height: 40px;
                        opacity: 0;
                    }
                }

                .label {
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }

                .pc-radio {
                    display: inline-block;
                    margin-right: 60px;
                }

                .text {
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }

                .year {
                    width: 100px;
                }

                .month,
                .day {
                    width: 70px;
                }
            }

            .button-form-list {
                padding-left: 170px;
                height: 100%;
            }

            .id-img {
                height: 113px;

                .label {
                    vertical-align: top;
                }
            }

            .document-photo-img {
                width: 144px;
                height: 93px;
                margin-top: 10px;
            }

            .birthday {
                .year {
                    width: 98px;
                }

                .month,
                .day {
                    width: 68px;
                }

                .year-text,
                .year-month,
                .year-day {
                    margin: 0 10px;
                }
            }

            .edit-button,
            .delete-button {
                margin: 40px 0;
                width: 100px;
                margin-right: 20px;
                color: @white;
                background: @baseColor;
            }

            .delete-button {
                color: #333333;
                background: rgba(249, 249, 249, 1);
                border: 1px solid rgba(243, 243, 243, 1);
            }

        }

        .form-container {
            width: 100%;
            padding: 0 34px 0 26px;
            background: @white;
        }

        .notify-prompt {
            background: @white;
        }
    }
</style>
<style lang="less">
    .haha {
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        .clear-both;

        .contacts-list {
            float: left;
            margin-right: 60px;
        }
    }

    .contacts-container {
        .input-box {
            width: 270px;
        }
    }
</style>
