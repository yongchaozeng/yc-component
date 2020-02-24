<template>
    <div class="refund-details-container" >
        <div class="refund-details-head">
            <div class="to-refund-button" @click="torefundList">
                <span class=" icon iconfont">&#xe628;</span>
                <span class="to-refund-text">返回</span>
            </div>
            <div class="title">
                退款详情
            </div>
        </div>
        <div class="border"></div>

        <div class="refund-details-main">
            <div class="details-info">
                <p class="class-info">
                    <span class="label">退款班级</span>
                    <span class="value">
                        {{refund.name}}
                        <span v-if="  refund.class_code">({{refund.class_code}})</span>
                    </span>
                </p>
                <p class="money-info">
                    <span class="label">退款金额</span>
                    <span class="value">
                       ￥{{refund.refund_fee}}
                    </span>
                    <span class="tips">
                     (将按照退费规则收取手续费，请详细阅读退费规则)
                    </span>
                </p>
            </div>
        </div>
        <div class="details-step">
            <p class="step-info">
                <img class="icon" src="../../assets/imgs/refund-succeed-icon.png" alt="">
                <span class="text">{{refund.create_time}}成功提交退款申请，请耐心等待人工审核，一般7个工作日内审核通过</span>
            </p>
            <div class="line"></div>
            <p class="step-info">
                <img v-if="refund.refund_status !== 2" class="icon" src="../../assets/imgs/refund-succeed-icon.png" alt="">
                <img  v-else class="icon" src="../../assets/imgs/refund-wait-icon.png" alt="">
                <span v-if="refund.refund_status !== 2">{{refund.refund_time}}已通过审核提交至银联处理，最晚45个工作日内原路退回至付款账户，咨询电话（95516）</span>
            </p>

<!--            <div class="line"></div>-->
<!--            <p class="step-info">-->
<!--                <img v-if="refund.refund_status !== 2" class="icon" src="../../assets/imgs/refund-wait-icon.png" alt="">-->
<!--                <img v-else class="icon" src="../../assets/imgs/refund-succeed-icon.png" alt="">-->
<!--                <span>退款成功，一般于审核成功后3个工作日内到账</span>-->
<!--            </p>-->


        </div>
        <div class="details-tips">
            <img class="icon" src="../../assets/imgs/refund-warn-icon.png" alt="">
            <span class="text">
                退款金额会沿原路退回，请退款成功后去支付时使用的银行卡中查看。
                由于银行退款时间无法控制，请用户耐心等待退款结果。
            </span>
        </div>
        <!--        <div v-for="(item,index) in dateSet" :key="index">-->
        <!--            <pc-calendar :year="item.year" :month="item.month-1" ></pc-calendar>-->
        <!--        </div>-->

        <!--        <pc-modal v-model="show"></pc-modal>-->
    </div>
</template>
<script>
  import request from '../../axios/request'
  import PcButton from '../../components/pc-button'
  import PcModal from '../../components/pc-modal'
  import PcCalendar from '../../components/pc-calendar'

  export default {
    /* 退款详情 */
    name: 'refundDetails',
    components: { PcCalendar, PcModal, PcButton },
    data() {
      return {
        refund: {},
        show: true,
        dateList: [],
      }
    },
    async created() {
      await this.init()
    },
    methods: {
      async init() {
        let data = await request.refundDetail(this.$route.query.id)
        if(data && data.data){
          this.refund = data.data
        }

      },

      torefundList() {
        this.$router.go(-1)
      },
      payrefund(item, index) {
        sessionStorage.refund = JSON.stringify(this.refund)
        this.$router.push({ path: '/collectMoney' })
      },
      async closerefund() {
        let data = await request.cancelrefund(this.$route.query.id)
        try {
          // this.$msg(data.msg);
          this.torefundList()
        } catch (e) {

        }
      }
    },

  }
</script>
<style lang="less" scoped>
    .refund-details-container {
        .refund-details-head {
            position: relative;
            height: 51px;
            padding: 15px 0;
            text-align: center;
            border-top: 4px solid @baseColor;

            .to-refund-button {
                position: absolute;
                top: 11px;
                left: 27px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                cursor: pointer;

                .to-refund-text {
                    margin-left: 10px;
                }



                &:hover {
                    color: @baseColor;
                }
            }

            .title {
                display: inline-block;
                margin: 0 auto;

                .title-img {
                    width: 12px;
                    height: 16px;
                    vertical-align: top;
                }

                .title-text {
                    display: inline-block;
                    height: 16px;
                    margin-left: 7px;
                    vertical-align: super;
                    line-height: 16px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #21BA58;
                }
            }
        }

        .border {
            height: 10px;
            background: #F9F9F9;
        }

        .refund-details-main {
            padding: 30px 0;
            margin: 0 25px;
            border-bottom: 1px solid #f3f3f3;

            .details-info {
                margin-left: 20px;

                .class-info {
                    height: 18px;
                    margin-bottom: 20px;
                    line-height: 18px;

                    .label {
                        font-size: 18px;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                    }

                    .value {
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                    }
                }

                .money-info {
                    height: 18px;
                    line-height: 18px;

                    .label {
                        font-size: 18px;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                    }

                    .value {
                        font-size: 16px;
                        font-weight: 400;
                        color: #FE3A36;
                    }

                    .tips {
                        font-size: 14px;
                    }
                }
            }

        }

        .details-step {
            padding: 30px 0;
            margin: 0 25px;
            border-bottom: 1px solid #f3f3f3;

            .step-info {
                margin-left: 20px;

                .icon {
                    width: 19px;
                    height: 19px;
                    margin-right: 20px;
                    vertical-align: middle;
                }

                .text {
                    display: inline-block;
                    height: 16px;
                    line-height: 16px;
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    vertical-align: middle;
                }
            }

            .line {
                width: 1px;
                height: 46px;
                margin: 10px 0 10px 30px;
                background: rgba(243, 243, 243, 1);
            }
        }

        .details-tips {
            padding: 30px 0 0 46px;

            .icon {
                width: 16px;
                height: 16px;
                margin-right: 20px;
                vertical-align: top;
            }

            .text {
                display: inline-block;
                width: 425px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 18px;
            }
        }
    }
</style>
