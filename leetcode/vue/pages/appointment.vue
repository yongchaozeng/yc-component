<template>
    <div class="settlement-container" v-if="signUp && signData">
        <!-- 待面试和待摇号 -->
        <div class="appointment" v-if="signUp.sign_up_status===1||signUp.sign_up_status===2">
            <img class="img" src="../assets/imgs/refund-succeed-icon.png" alt="">
            <span class="text">{{signData.title}}</span>
            <span class="code">预约号：{{signUp.reservation_number}}</span>
        </div>
        <!-- 其他状态 -->
        <div class="appointment appointment-fail" v-else>
            <div class="appointment-fail-title">
                <!-- 失败的一种图标 成功的一种图标 -->
                <img v-if="signUp.sign_up_status!==10 && signUp.sign_up_status!==11" class="img" src="../assets/imgs/refund-succeed-icon.png" alt="">
                <img v-else class="img" src="../assets/imgs/fail-icon.png" alt="">
                <span>{{signData.title}}</span>
            </div>
            <p class="appointment-fail-text">{{signData.subTitle}}</p>
        </div>
        <div class="appointment-main">
            <div class="course-info" v-if="signUp.is_interview">
                <div class="course-info-head">
                    <div class="text">
                        面试信息
                    </div>
                </div>
                <div class="course-info-main">
                    <div class="text">
                        <p style="margin-bottom: 10px">{{signUp.interview_remarks}}；
                            面试时间：{{signUp.interview_start_time|dateFormat}}
                            -{{signUp.interview_end_time|dateFormat}}</p>

                    </div>
                </div>
                <div class="course-info-other" v-if="feeDetails.is_shift">
                    减免原因：插班报名，未上课程{{feeDetails.shift_class_number}}次，减免总金额￥{{feeDetails.sign_up_reduction}}
                </div>
            </div>
            <div class="course-info">
                <div class="course-info-head">
                    <div class="text">
                        班级信息
                    </div>
                    <div class="text">
                        价格
                    </div>
                    <div class="text">
                        上课老师
                    </div>
                    <div class="text">
                        开课时间
                    </div>
                </div>
                <div class="course-info-main">
                    <div class="text">
                        <p @click="toDetails" style="margin-bottom: 10px" class="cursor">{{signUp.class_name}}</p>
                    </div>
                    <div class="text">
                        ￥{{signUp.sign_up_fee}}
                    </div>
                    <div class="text">
                        <span style="color: #333;" v-for="(teacher,idx) in signUp.teacher" :key="idx"> {{teacher.real_name}}</span>
                    </div>
                    <div class="text" v-if="signUp.first_class_start_time && signUp.first_class_start_time.split(' ')">
                        {{signUp.first_class_start_time.split(' ')[0]|dateTimeFormat}}
                    </div>
                </div>
                <div class="course-info-other" v-if="feeDetails.is_shift">
                    减免原因：插班报名，未上课程{{feeDetails.shift_class_number}}次，减免总金额￥{{feeDetails.sign_up_reduction}}
                </div>
            </div>
            <div class="user-info">
                <p class="user-info-title">学员信息 </p>
                <p class="user-info-text">
                    <span class="label">学员姓名</span>
                    <span class="text">{{ signUp.contact_name}}({{signUp.id_card_no}})</span>
                </p>
                <div class="user-info-text">
                    <span class="label" style="line-height: 30px;">联系人姓名</span>
                    <!--                <pc-input height="30" v-model=""></pc-input>-->
                    <span class="text">{{personalData.real_name||signUp.contact_name}}</span>

                    <!--                    <span>{{signUp.register_user_name}}</span>-->
                </div>
                <div class="user-info-text">
                    <span class="label" style="line-height: 30px;">联系人手机号</span>
                    <pc-input disabled height="30" v-model="personalData.phone"></pc-input>
                </div>
            </div>
            <div class="payment">
                <!-- 成功的才有按钮 -->
                <!-- 取消按钮 -->
                <pc-button v-if="signData.cancelBool" class="cancel-button"
                           @click="cancelModal" height="58">取消预约
                </pc-button>
                <!-- 确认按钮 -->
                <pc-button v-if="signData.submitBool" class="pay-button" @click="placeOrder" height="58">
                    {{signUp.sign_up_status===1?'等待摇号':signUp.sign_up_status===2?'等待面试':'直接缴费'}}
                </pc-button>
            </div>
        </div>
        <pc-modal width="520" height="198" v-model="cancelShow">
            <div class="interview-box">
                <p class="interview-title"> 取消预约</p>
                <p class="interview-date">{{signData.cancelMsg}}</p>
                <pc-button class="cancel-button" @click="cancelShow = false">取消</pc-button>
                <pc-button class="confirm-button" @click="cancelInterview">确定</pc-button>
            </div>
        </pc-modal>
    </div>
</template>

<script>
    import PcCheckbox from '../components/pc-checkbox';
    import PcButton from '../components/pc-button';
    import request from '../axios/request';
    import PcInput from '../components/pc-input';
    import PcModal from '../components/pc-modal';
    import {isString} from '../utils/utils';
    import {appointmentStatus, constant} from '../plugins/constant';


    export default {
        /* 预约页面 */
        name: 'appointment',
        layout: 'details',
        data() {
            return {
                contactDetails: {},
                feeDetails: {},
                isAgreement: true,
                signUp: null,
                cancelShow: false,

            };
        },
        async mounted() {

            await this.getOrder();
            await this.getContactDetails();

        },
        methods: {
            // 进入详情
            toDetails() {
                window.open(`/details?id=${this.signUp.class_id}`, '', '');
            },
            // 获取联系人信息
            async getContactDetails() {
                // let contact = sessionStorage.contact ? JSON.parse(sessionStorage.contact) : {}
                let data = await request.contactDetails(this.signUp.contact_id);
                try {
                    this.contactDetails = data.data.contact_info_detail;
                } catch (e) {
                }
            },

            // 获取预约信息
            async getOrder() {
                let data = await request.signUpOrder(this.$route.query.id);
                try {
                    this.signUp = data.data.sign_up;

                    let details = {
                        id: this.signUp.id,
                        contact_id: this.signUp.contact_id,
                        class_id: this.signUp.class_id,
                        class_name: this.signUp.class_name,
                        reservation_number: this.signUp.reservation_number,
                        class_code: this.signUp.class_code,
                        total_fee: this.signUp.class_total_fee,
                        teacher: this.signUp.teacher,
                        first_class_start_time: this.signUp.first_class_start_time,
                    };
                    sessionStorage.details = JSON.stringify(details);
                    // this.contactDetails = data.data.contact_info_detail
                } catch (e) {

                }
            },
            // 打开取消弹窗
            cancelModal() {
                this.cancelShow = true;
            },
            async cancelInterview() {
                let data = await request.cancelSignUp(this.signUp.id);
                try {
                    this.cancelShow = false;
                    this.$router.push({path: '/personal/classBooking'});
                } catch (e) {

                }
            },
            async placeOrder() {
                if (this.signUp.sign_up_status === 3) {
                    let data = await request.placeOrder({sign_up: this.signUp});
                    if (data && data.data && data.data.order) {
                        sessionStorage.order = JSON.stringify(data.data.order);
                        this.$router.push('/collectMoney');
                    }
                } else {
                    this.$router.push('/personal/classBooking');
                }

            },
        },
        computed: {
            signData() {
                // 待摇号
                if (this.signUp.sign_up_status === constant.WAIT_LOTTERY) {
                    return appointmentStatus.waitLottery;
                }
                // 等待摇号加等待面试
                if (this.signUp.sign_up_status === constant.WAIT_INTERVIEW &&  this.signUp.is_rocking_number) {
                    return appointmentStatus.lotterySuccessInterview;
                }
                // 待面试
                if (this.signUp.sign_up_status === constant.WAIT_INTERVIEW) {
                    return appointmentStatus.waitInterview;
                }
                // 面试未通过
                if (this.signUp.sign_up_status === constant.INTERVIEW_FAIL) {
                    return appointmentStatus.interviewFail;
                }
                // 摇号未通过
                if (this.signUp.sign_up_status === constant.LOTTERY_FAIL) {
                    return appointmentStatus.lotteryFail;
                }
                // // 摇号加面试
                // if (this.signUp.sign_up_status === constant.SUCCESS && this.signUp.is_rocking_number && this.signUp.is_interview) {
                //     return appointmentStatus.interviewSuccess;
                // }

                // // 只需要摇号成功
                if (this.signUp.sign_up_status === constant.SUCCESS && !this.signUp.is_interview) {
                    return appointmentStatus.lotterySuccess;
                }
                // 面试成功
                if (this.signUp.sign_up_status === constant.SUCCESS ) {
                    return appointmentStatus.interviewSuccess;
                }



            },
            contact() {
                return this.$store.state.contact;
            },
            personalData() {
                return this.$store.state.personalData;
            },
        },
        filters: {
            time(value) {
                if (value && isString(value)) {
                    return value.split(' ')[0];
                } else {
                    return '暂无';
                }
            },
            dateFormat(value) {
                let date = value.split(' ')[0].replace(/\-/g, (val, index,) => {

                    if (index === 4) {
                        return '年';
                    } else {
                        return '月';
                    }

                });
                return date + '日';
            },
            dateTimeFormat(value) {
                let date = value.replace(/\-/g, (val, index,) => {

                    if (index === 4) {
                        return '年';
                    } else {
                        return '月';
                    }

                });
                return date + '日';
            },
        },

        components: {PcModal, PcInput, PcButton, PcCheckbox}
    };
</script>

<style lang="less" scoped>
    .settlement-container {
        width: 1200px;
        margin: 0 auto 146px auto;
        background: @white;

        .appointment {

            height: 142px;
            text-align: center;
            line-height: 142px;
            background: #F9F9F9;

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

        .appointment-fail {
            overflow: hidden;
            line-height: initial;

            .appointment-fail-title {
                margin: 32px 0 22px 0;
                font-size: 18px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }

            .appointment-fail-text {
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
        }

        .appointment-main {
            padding: 20px 33px 0 33px;

            .course-info {
                margin: 0 38px 23px 5px;

                .course-info-head {
                    display: flex;

                    .text {
                        /*width: 692px;*/
                        font-size: 18px;
                        font-weight: 600;
                        text-align: right;
                        color: rgba(51, 51, 51, 1);
                    }

                    .text:nth-of-type(1) {
                        flex: 1;
                        text-align: left;
                    }

                    .text:nth-of-type(2) {
                        width: 199px;
                    }

                    .text:nth-of-type(3) {
                        width: 199px;
                    }

                    .text:nth-of-type(4) {
                        width: 199px;
                    }
                }

                .course-info-main {
                    display: flex;
                    height: 100px;
                    align-items: flex-end;
                    border-bottom: 1px solid @gray;

                    .text {
                        /*width: 692px;*/
                        text-align: right;
                        margin-bottom: 23px;
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                    }

                    .text:nth-of-type(1) {
                        flex: 1;
                        margin-left: 30px;
                        text-align: left;
                    }

                    .text:nth-of-type(2) {
                        width: 199px;
                    }

                    .text:nth-of-type(3) {
                        width: 199px;
                    }

                    .text:nth-of-type(4) {
                        width: 199px;
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
                    display: flex;
                    margin: 44px 0 0 30px;

                    .label {
                        display: block;
                        width: 180px;
                    }

                    .text {

                    }
                }
            }

            .payment {
                padding: 30px 0 181px 0;
                text-align: right;

                .button {
                    display: inline-block;
                    width: 237px;
                    height: 58px;
                    font-size: 22px;
                    font-weight: bold;
                }

                .cancel-button {
                    .button;
                    height: 21px;
                    color: rgba(51, 51, 51, 1);
                    background: #F3F3F3;
                }

                .pay-button {
                    .button;
                    margin-left: 27px;

                    color: @white;
                    background: #21BA58;
                }
            }
        }

        .interview-box {
            text-align: center;
            font-size: 0;

            .interview-title {
                height: 20px;
                margin: 30px 0 22px 0;
                font-size: 20px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                line-height: 20px;
            }

            .interview-date, .interview-address, .interview-teacher {
                height: 15px;
                margin-bottom: 15px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 15px;
            }

            .confirm {
                width: 145px;
                margin-top: 15px;
                font-size: 16px;
                font-weight: 400;
                color: @white;
                background: @baseColor2;
                border-radius: 2px;

            }

            .cancel-button {
                .confirm;
                display: inline-block;
                margin-right: 90px;
                color: #333333;
                background: #F3F3F3;
            }

            .confirm-button {
                .confirm;
                display: inline-block;
            }
        }

    }
</style>
