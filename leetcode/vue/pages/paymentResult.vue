<template>
    <div class="settlement-container">
        <div class="appointment">
            <img class="img" src="../assets/imgs/refund-succeed-icon.png" alt="">
            <span class="text">报名成功，请关注课程信息</span>
            <span class="code" v-if="details.reservation_number">预约号：{{details.reservation_number}}</span>
            <span class="code" v-else-if="details.reservation_number">预约号：{{details.reservation_number}}</span>
            <pc-button class="look-timetable" @click="openCalendarModal" height="30" radius>查看课程表</pc-button>
        </div>
        <div class="settlement-form">
            <div class="course-info">
                <div class="course-info-head">
                    <div class="text">
                        商品清单
                    </div>
                    <div class="text">
                        价格
                    </div>
                    <div class="text">
                        上课老师
                    </div>
                    <div class="text">
                        上课时间
                    </div>
                </div>
                <div class="course-info-main">
                    <div class="text">
                        <p>{{details.name||details.class_name}} <span
                                v-if="details.class_code">({{details.class_code}})</span></p>
                    </div>
                    <div class="text">
                        ￥{{details.total_fee||0}}
                    </div>
                    <div class="text">
                        <span v-for="(teacher,idx) in details.teacher" :key="idx"> {{teacher.real_name}}</span>
                    </div>
                    <div class="text">
                        <p> {{details.date}}</p>
                        <p>周{{details.week}} {{details.time}}</p>
                    </div>
                </div>

            </div>
            <div class="user-info">
                <p class="user-info-title">学员信息 </p>
                <p class="user-info-text">
                    <span class="label">学员姓名</span>
                    <span class="text">{{contactDetails.name}}（{{contactDetails.id_card_no}}）</span>
                </p>
                <p class="user-info-text">
                    <span class="label">联系人姓名</span>
                    <span class="text">{{personalData.real_name||personalData.phone || personalData.id}}</span>

                </p>
                <div class="user-info-text">
                    <span class="label" style="line-height: 30px;"> 联系人手机号</span>
                    <pc-input disabled height="30" class="text" v-model="personalData.phone"></pc-input>
                </div>
            </div>
            <div class="user-info" v-if="feeDetails.sign_up_reduction">
                <p class="user-info-title">折扣信息 </p>
                <p class="user-info-text">
                    <span class="label">原价</span>
                    <span class="text">{{details.total_fee}}元</span>
                </p>
                <div class="user-info-text">
                    <span class="label" style="line-height: 30px;">折扣</span>
                    <span class="text">{{feeDetails.sign_up_reduction}}元</span>
                </div>
                <div class="user-info-text">
                    <span class="label" style="line-height: 30px;">应付</span>
                    <span class="text">{{details.total_fee-feeDetails.sign_up_reduction}}元</span>
                </div>
                <div class="user-info-text">
                    <span class="label" style="line-height: 30px;">折扣原因</span>
                    <span v-if="feeDetails.is_shift" class="text">减免原因：插班报名，未上课程{{feeDetails.shift_class_number}}次，减免总金额￥{{feeDetails.sign_up_reduction}}</span>
                    <span class="text">暂无</span>

                </div>
            </div>
            <div class="payment">
                <div class="payment-text">
                    <pc-button class="payment-button" @click="cancelShow=true" height="58">我要退课</pc-button>
                </div>

            </div>
        </div>
        <pc-modal width="520" height="198" v-model="cancelShow">
            <div class="interview-box">
                <p class="interview-title">退款提示</p>
                <p class="interview-date">发起退费申请后，将按照退费规则收取手续费，请详细阅读
                    <nuxt-link target="_blank" style="color: #FE3A36;" to="/apply">退费规则</nuxt-link>
                    ，是否继续？
                </p>
                <pc-button class="cancel-button" @click="cancelShow = false">取消</pc-button>
                <pc-button class="confirm-button" @click="submit">确定</pc-button>
            </div>
        </pc-modal>

        <calendar-box ref="calendar" :dateSet="dateSet" :dateList="dateList"></calendar-box>

    </div>
</template>

<script>
    import PcCheckbox from '../components/pc-checkbox';
    import PcButton from '../components/pc-button';
    import request from '../axios/request';
    import PcInput from '../components/pc-input';
    import PcModal from '../components/pc-modal';
    import PcCalendar from '../components/pc-calendar';
    import CalendarBox from "../components/calendar-box";

    export default {
        name: 'paymentResult',
        layout: 'details',
        data() {
            return {
                contactDetails: {},
                feeDetails: {},
                details: {},
                isAgreement: false,
                cancelShow: false,
                dateSet: [],
                dateList: [],

            };
        },
        mounted() {
            this.details = sessionStorage.details ? JSON.parse(sessionStorage.details) : {};
            this.getContactDetails();
            this.getSignUpFee();
            if (this.details.first_class_start_time) {
                let date = this.details.first_class_start_time.split(' ');
                let YMDDate = date[0].split('-');
                this.details.date = `${YMDDate[0]}年${YMDDate[1]}月${YMDDate[2]}日`;
                this.details.time = `${date[1]}`;
                this.details.week = `${new Date(date).getDay()}` == 0 ? '日' : `${new Date(date).getDay()}`;
            }
        },
        methods: {
            // 折扣信息
            async getContactDetails() {
                let contact = null;
                if (this.details.contact_id) {
                    contact = {id: this.details.contact_id};
                } else {
                    contact = sessionStorage.contact ? JSON.parse(sessionStorage.contact) : {};
                }
                let data = await request.contactDetails(contact.id);
                try {
                    this.contactDetails = data.data.contact_info_detail;
                } catch (e) {

                }
            },
            async getSignUpFee() {
                let data = await request.getSignUpFee({class_id: this.$route.query.id});
                try {

                    this.feeDetails = data.data;
                    /*
                    *is_shift	减免
                    * original 原价
                    * shift_class_number 已上班级科数
                    * sign_up_fee 注册费用
                    * sign_up_reduction 减少钱数
                    * specialized_subject_name班级名
                    * */
                } catch (e) {

                }
            },
            // 退课
            async submit() {
                let data = await request.applyRefund(this.details.id);
                if (data) {
                    this.$router.push({path: `/personal/refundDetails?id=${this.details.id}`});
                } else {
                    this.cancelShow = false;
                }
            },
            async openCalendarModal() {
                let item = {goods: [{object: {class_id: this.$route.query.id}}]};
                await this.getCalender(item);
                this.$refs.calendar.open();
            },
            async getCalender(item, index) {
                let data = await request.classDetailsDate(item.goods[0].object.class_id);
                // this.dateList = data.data.class_list
                this.dateList = data.data.class_list.map((item) => {
                    let date = item.class_start_time.split(' ')[0];
                    return {
                        ...item,
                        date: date,
                        year: Number(date.split('-')[0]),
                        month: Number(date.split('-')[1]),
                        day: Number(date.split('-')[2]),
                        ym: `${date.split('-')[0]}-${date.split('-')[1]}`,
                    };
                });

                function getArray(array, key) {
                    let repetition = [];
                    let newArray = [];
                    array.map((item, index) => {
                        if (repetition.indexOf(item[key]) === -1) {
                            newArray.push(item);
                            repetition.push(item[key]);
                        }
                    });
                    return newArray;
                }

                this.dateSet = getArray(this.dateList, 'ym');

            },
        },
        computed: {

            contact() {
                return this.$store.state.contact;
            },
            personalData() {
                return this.$store.state.personalData;
            },
        },

        components: {CalendarBox, PcCalendar, PcModal, PcInput, PcButton, PcCheckbox}
    };
</script>

<style lang="less" scoped>
    .settlement-container {
        width: 1200px;

        margin: 32px auto 40px auto;

        .appointment {

            text-align: center;
            background: #F9F9F9;

            .look-timetable {
                display: block;
                width: 93px;
                margin: 10px auto 30px auto;
                line-height: 14px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                background: rgba(33, 186, 88, 1);
                border: 1px solid rgba(243, 243, 243, 1);

            }

            .img {
                width: 34px;
                height: 34px;
                margin-right: 21px;
                vertical-align: middle;

            }

            .text {
                font-size: 18px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                vertical-align: middle;

            }

            .code {
                margin-left: 20px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(33, 186, 88, 1);
                vertical-align: middle;

            }
        }

        .settlement-form {
            padding: 21px 33px 0 33px;

            background: @white;


            .course-info {
                margin: 0 38px 20px 5px;

                .course-info-head {

                    .text {
                        display: inline-block;
                        /*width: 692px;*/
                        font-size: 18px;
                        font-weight: 600;
                        text-align: right;
                        color: rgba(51, 51, 51, 1);
                    }

                    .text:nth-of-type(1) {
                        width: 512px;
                        text-align: left;
                    }

                    .text:nth-of-type(2) {
                        width: 199px;
                    }

                    .text:nth-of-type(3) {
                        width: 199px;
                    }

                    .text:nth-of-type(4) {
                        width: 163px;
                    }
                }

                .course-info-main {
                    /*height: 100px;*/
                    border-bottom: 1px solid @gray;

                    .text {
                        display: inline-block;
                        /*width: 692px;*/
                        margin-top: 55px;
                        margin-bottom: 32px;
                        text-align: right;
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        vertical-align: top;
                    }

                    .text:nth-of-type(1) {
                        width: 482px;
                        height: 16px;
                        margin-left: 30px;
                        line-height: 16px;

                        text-align: left;
                    }

                    .text:nth-of-type(2) {
                        width: 199px;
                        height: 13px;
                        line-height: 13px;
                    }

                    .text:nth-of-type(3) {
                        width: 199px;
                        height: 13px;
                        line-height: 13px;
                    }

                    .text:nth-of-type(4) {
                        width: 163px;
                        /*height: 13px;*/
                        /*line-height: 13px;*/
                    }
                }

                .course-info-other {
                    height: 59px;
                    padding-left: 30px;
                    line-height: 59px;
                    border-bottom: 1px solid @gray;
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }

            }

            .user-info {
                padding-bottom: 30px;
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                border-bottom: 1px solid @gray;

                .user-info-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                }

                .user-info-text {
                    margin: 44px 0 0 30px;

                    .label {
                        display: inline-block;
                        width: 180px;
                    }

                    .text {
                        display: inline-block;
                    }
                }
            }

            .payment {
                padding: 30px 0 32px 0;
                .clear-both;

                .agreement {
                    float: left;
                    font-size: 12px;
                }

                .payment-text {
                    float: right;

                    .text {
                        margin-bottom: 28px;
                        font-size: 16px;
                        color: #333;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        .clear-both;

                        .label {
                            float: left;
                        }

                        .value {
                            float: right;
                        }
                    }

                    .text:nth-of-type(1) {
                        .label {
                            line-height: 16px;

                        }

                        .value {
                            line-height: 13px;
                        }
                    }

                    .text:nth-of-type(2) {

                        line-height: 19px;

                    }

                    .money {
                        float: right;
                        font-size: 24px;
                        font-weight: 600;
                        color: #FE3A36;
                    }

                    .payment-button {
                        width: 237px;
                        color: #333333;
                        background: #F3F3F3;
                    }
                }
            }
        }


    }
</style>
