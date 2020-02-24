<template>
    <div class="settlement-container">
        <div class="course-info">
            <div class="course-info-head">
                <div class="text">商品清单</div>
                <div class="text">价格</div>
                <div class="text">上课老师</div>
                <div class="text">上课时间</div>
            </div>
            <div class="course-info-main">
                <div class="text">
                    <p>
                        {{details.name}}
                        <span v-if="details.class_code">({{details.class_code}})</span>
                    </p>
                </div>
                <div class="text">￥{{details.total_fee}}</div>
                <div class="text">
          <span
                  class="teacher"
                  v-for="(teacher,idx) in details.teacher"
                  :key="idx"
          >{{teacher.real_name}}</span>
                </div>
                <div class="text">
                    {{details.date}}
                    <br/>
                    周{{details.week}} {{details.time}}
                </div>
            </div>
            <!--            <div class="course-info-other" v-if="feeDetails.is_shift">-->
            <!--                减免原因：插班报名，未上课程{{feeDetails.shift_class_number}}次，减免总金额￥{{feeDetails.sign_up_reduction}}-->
            <!--            </div>-->
        </div>
        <div class="user-info">
            <p class="user-info-title">学员信息</p>
            <p class="user-info-text">
                <span class="label">学员姓名</span>
                <span class="text">{{contactDetails.name}}</span>
                <span class="text" v-if="contactDetails.id_card_no">（{{contactDetails.id_card_no}}）</span>
            </p>
            <p class="user-info-text">
                <span class="label">联系人姓名</span>
                <span class="text">{{personalData.real_name||contactDetails.name}}</span>
            </p>
            <div class="user-info-text">
                <span class="label" style="line-height: 30px;">联系人手机号</span>
                <pc-input disabled height="30" class="text" v-model="personalData.phone"></pc-input>
            </div>
        </div>
        <div class="user-info" v-if="feeDetails.sign_up_reduction">
            <p class="user-info-title">折扣信息</p>
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
                <span
                        v-if="feeDetails.is_shift"
                        class="text"
                >减免原因：插班报名，未上课程{{feeDetails.shift_class_number}}次，减免总金额￥{{feeDetails.sign_up_reduction}}</span>
                <span class="text">暂无</span>
            </div>
        </div>
        <div class="payment">
            <div class="agreement">
                <pc-checkbox v-model="isAgreement">
                    我已同意并接受
                    <a
                            target="_blank"
                            style="color: #FF2323;"
                            @click='openAgreement'
                    >《报名协议》</a>
                </pc-checkbox>
            </div>
            <div class="payment-text">
                <p class="text">
                    <span class="label">已为你减免</span>
                    <span class="value">￥{{feeDetails.sign_up_reduction}}</span>
                </p>
                <p class="text">
                    <span class="label">应付金额</span>
                    <span class="money">￥{{feeDetails.sign_up_fee}}</span>
                </p>
                <pc-button class="payment-button" @click="submit" height="58">确认购买</pc-button>
            </div>
        </div>
        <!--  报名协议弹窗  -->
        <pc-modal
                close
                class="agreement-container"
                width="1000"
                height="500"
                v-model="agreementShow"
        >
            <div class="agreement-main">
                <p class='agreement-title'>报名协议</p>
                <div class="" v-if='agreementData' v-html="agreementData.content"></div>
            </div>

        </pc-modal>
    </div>
</template>

<script>
    import PcCheckbox from "../components/pc-checkbox";
    import PcButton from "../components/pc-button";
    import request from "../axios/request";
    import PcInput from "../components/pc-input";
    import PcModal from "../components/pc-modal";

    export default {
        name: "settlement",
        layout: "details",
        data() {
            return {
                agreementShow: false,
                agreementData: null,
                contactDetails: {},
                feeDetails: {},
                details: {},
                isAgreement: false,
            };
        },
        mounted() {
            this.getContactDetails();
            this.getSignUpFee();
            this.getAgreement();
            this.details = sessionStorage.details
                ? JSON.parse(sessionStorage.details)
                : {};
            if (this.details.first_class_start_time) {
                let date = this.details.first_class_start_time.split(" ");
                let YMDDate = date[0].split("-");

                this.details.date = `${YMDDate[0]}年${YMDDate[1]}月${YMDDate[2]}日`;
                this.details.time = `${date[1]}`;
                this.details.week = `${new Date(date).getDay()}`;
            }
        },
        methods: {
            // 打开协议
            openAgreement() {
                console.log(111);
                this.agreementShow = true;
            },
            // 获取协议
            async getAgreement() {
                let data = await request.siteInformation({
                    site_manage_type: 2
                });
                console.log(12, data);
                if (data && data.data && data.data.site_information) {
                    this.agreementData = data.data.site_information;
                }

            },
            // 折扣信息
            async getContactDetails() {
                let contact = sessionStorage.contact
                    ? JSON.parse(sessionStorage.contact)
                    : {};
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
            // 报名
            async submit() {
                let formData = {
                    class_id: this.$route.query.id,
                    contact_id: this.contactDetails.id,
                    // contact_phone:18483692611,
                    contact_phone: this.personalData.phone,
                    is_allow_agreement: this.isAgreement,
                    is_shift: this.feeDetails.is_shift,
                    register_user_id: this.personalData.id,
                    shift_class_number: this.feeDetails.shift_class_number,
                    sign_up_fee: this.feeDetails.sign_up_fee,
                    sign_up_reduction: this.feeDetails.sign_up_reduction,
                    specialized_subject_name: this.feeDetails.specialized_subject_name
                };

                let data = await request.signUp(formData);

                try {
                    sessionStorage.order = JSON.stringify(data.data.order);
                    sessionStorage.details = JSON.stringify({
                        ...JSON.parse(sessionStorage.details),
                        id: data.data.order.id
                    });
                    this.$router.push("/collectMoney");
                } catch (e) {
                }
            }
        },
        computed: {
            contact() {
                return this.$store.state.contact;
            },
            personalData() {
                return this.$store.state.personalData;
            }
        },

        components: {PcInput, PcButton, PcCheckbox, PcModal}
    };
</script>

<style lang="less" scoped>
    .settlement-container {
        width: 1200px;
        padding: 21px 33px 0 33px;
        margin: 40px auto 146px auto;
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

                    .teacher {
                        display: inline-block;
                        margin: 2px;
                    }
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
                    color: #fe3a36;
                }

                .payment-button {
                    width: 237px;
                    color: @white;
                    background: #fe3a36;
                }
            }
        }
    }

    .agreement-container {
        .scrollbar-box;
        .agreement-title {
            margin: 30px 0 20px 0;
            font-size: 18px;
            color: #333;
            text-align: center;
            font-weight: bold;
        }

        .agreement-main {
            .scrollbar-box;
            padding: 0 30px;
            height: 500px;
            overflow: auto;

        }

    }
</style>
