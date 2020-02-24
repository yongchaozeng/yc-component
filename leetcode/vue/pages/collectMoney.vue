<template>
    <div class="collect-money-container">

        <div class="collect-content">
            <div class="collect-money-head">
                <div class="title">
                    您的订单提交成功，请在{{order.pay_end_time}} 完成支付！逾期订单将被取消
                </div>
                <div class="money">¥{{order.fee}}</div>
                <div class="order-info">
                    <span class="order">订单号：{{order.order_number}}</span>
                    <template v-if="order.goods && order.goods[0] && order.goods[0].object">
                        <span class="course">
                            {{order.goods[0].object.specialized_subject_name}} <span
                                v-if="order.goods[0].object.class_code">（{{order.goods[0].object.class_code}}）</span>
                        </span>
                        <span class="number">预约号：{{order.goods[0].object.reservation_number}}</span>
                    </template>
                </div>
            </div>
            <div class="collect-money-type">
                <div class="title">请选择支付方式</div>
                <ul class="collect-money-list-box">
                    <li class="collect-money-list" v-if="index!==3" v-for="(item,index) in payTypeList"
                        :key="index"
                        :class="[{'active':item.value === payType}]"
                        @click="changePay(item,index)">
                        <img :src="item.src" alt="">
                        <i v-if="item.value === payType" class="pay-hover-icon">

                        </i>
                    </li>
                </ul>
                <!--                <pc-button class="pay-button" height="60" @click="paySignUp">立即购买</pc-button>-->
                <div class="code-img-box" v-if="base64Url">
                    <p class="code-title">扫一扫付款（元）</p>
                    <p class="code-money">{{order.fee}}</p>
                    <div class="code-border">
                        <img class="code-img" :src="base64Url" alt="">

                        <img class="barcode-scanner" src="../assets/imgs/barcode-scanner.png" alt="">
                        <p class="code-text">

                            打开手机{{payType === 1?'支付宝':'微信'}}
                            扫一扫继续支付

                        </p>
                    </div>

                </div>
            </div>
        </div>
        <div class="collect-money-footer" >

            付款遇到问题：
            <br/>
            1.如果银联支付弹出被浏览器拦击，请在浏览器拦截中选择信任
            <br/>
            2.如遇到问题无法处理，请拨打咨询电话010-66154538

        </div>
        <pc-modal class="pay-modal-container" width="520" height="200" v-model="show">
            <p class="pay-modal-title">支付提示</p>
            <p class="pay-modal-text">请在第三方支付页面完成支付</p>
            <div class="pay-button">
                <pc-button @click="payError" class="pay-error">支付遇见问题</pc-button>
                <pc-button @click="paySucceed" class="pay-succeed">已完成支付</pc-button>
            </div>
        </pc-modal>
      <div id="test" style="opacity: 0;" v-html="payUrl"></div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import request from '../axios/request';
    import PcButton from '../components/pc-button';
    import PcModal from '../components/pc-modal';

    export default {
        /* 支付页面 */
        name: 'collectMoney',
        components: {PcModal, PcButton},
        layout: 'details',
        data() {
            return {
                orderStatus: null,
                pollingNumber: 0,
                timeId: null,
                payTypeList: [],
                payType: 0,
                order: {},
                base64Url: '',
                payUrl: '',
                show: false,
            };
        },
        async mounted() {
            await this.init();
            await this.polling();
        },
        beforeDestroy() {
            clearInterval(this.timeId);
        },
        methods: {
            ...mapMutations(['setPayHtml']),
            async init() {
                this.order = sessionStorage.order ? JSON.parse(sessionStorage.order) : {};
                if (sessionStorage.details) {
                    let details = JSON.parse(sessionStorage.details);
                    let reservation_number = this.order.goods[0].object.reservation_number;
                    details.reservation_number = reservation_number;
                    if(!details.total_fee ){
                        details.total_fee =  this.order.fee
                    }
                    sessionStorage.details = JSON.stringify(details);

                }
                let data = await request.payTypeChoose();
                if (data && data.data) {
                    data.data.map((item, index) => {
                        if (index === 0) {
                            item.src = require('../assets/imgs/pay-ali.png');
                        }
                        if (index === 1) {
                            item.src = require('../assets/imgs/pay-wx.png');
                        }
                        if (index === 2) {
                            item.src = require('../assets/imgs/pay-aggregation.png');
                        }
                        if (index === 3) {
                            item.src = require('../assets/imgs/pay-aggregation.png');
                        }
                    });
                    this.payTypeList = data.data;
                    if (data.data[0]) {
                        this.changePay(data.data[0], 0);
                    }

                }


            },
            async getOrderStatus() {
                let data = await request.orderStatus(sessionStorage.order ? JSON.parse(sessionStorage.order).id : '');
                if (data && data.data && data.data.pay_status === 2) {
                    if (!this.show) {
                        this.show = true;
                    }
                }
            },
            polling() {

                this.getOrderStatus();
                this.timeId = setInterval(() => {
                    if (this.show || this.pollingNumber > 50) {
                        clearInterval(this.timeId);
                    } else {
                        this.getOrderStatus();
                        this.pollingNumber++;
                    }
                }, 3000);
            },
            async changePay(item, index) {
                this.payType = item.value;
                await this.paySignUp();

            },
            async paySignUp() {
                if (!this.payType) {
                    this.$msg('请选择付款方式', {type: 'error'});
                    return;
                }
                this.payUrl = '';
                this.base64Url = '';
                let data = await request.paySignUp({
                    pay_type: this.payType,
                    order: this.order,
                    return_url: `${process.env.service}/collectMoney`
                });
                if (data && data.data) {
                    if(data.data.render_html){
                        sessionStorage.setItem('payHtml',data.data.render_html)
                        window.open('/payLink')
                        // this.payUrl = data.data.render_html;
                        // console.log(11,this.payUrl)
                    }else{
                        this.base64Url = data.data.qr_code_base64;
                    }
                    // if (data.data.is_redirect) {
                    //     this.payUrl = data.data.render_html;
                    //     console.log(11,this.payUrl)
                    //     // window.open(`${data.data.render_html}`, '', '');
                    //     // this.show = true
                    // } else {
                    //     this.base64Url = data.data.qr_code_base64;
                    // }
                }
            },
            paySucceed() {
                this.show = false;
                try {
                    this.$router.push({path: `/paymentResult?id=${this.order.goods[0].object.class_id}`});
                } catch (e) {
                    console.error(e);
                }

            },
            payError() {
                this.show = false;
                clearInterval(this.timeId);

            },

        },
    };
</script>

<style lang="less" scoped>
    .collect-money-container {
        width: 1200px;
        margin: 0 auto;

        .collect-content {
            .collect-money-head {
                height: 107px;

                .title {
                    padding-left: 33px;
                    margin-top: 30px;
                    text-align: left;
                    font-size: 18px;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }

                .money {
                    height: 22px;
                    text-align: right;
                    line-height: 22px;
                    font-size: 28px;
                    font-weight: bold;
                    color: rgba(254, 58, 54, 1);
                }

                .order-info {
                    padding-left: 34px;
                    margin-bottom: 23px;
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);

                    .order {
                        margin-right: 57px;
                    }

                    .course {
                        margin-right: 59px;
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                    }

                    .number {
                        color: #21BA58;
                    }
                }
            }

            .collect-money-type {
                padding: 0 30px;
                background: @white;

                .title {
                    height: 60px;
                    padding-left: 10px;
                    line-height: 60px;
                    font-size: 18px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }

                .collect-money-list-box {
                    padding: 20px 10px;
                    border: 1px solid #F3F3F3;
                    border-left: 1px solid transparent;
                    border-right: 1px solid transparent;
                    .clear-both;


                    .collect-money-list {
                        position: relative;
                        float: left;
                        width: 150px;
                        height: 40px;
                        margin-right: 40px;
                        border: 1px solid transparent;

                        img {
                            width: 100%;
                            height: 100%;
                        }

                        .pay-hover-icon {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 20px;
                            height: 20px;
                            background: url("../assets/imgs/pay-type-hover.png") no-repeat;
                            background-size: 20px 20px;
                        }
                    }

                    .active {
                        border-color: rgba(254, 58, 54, 1);

                    }
                }

                .pay-button {
                    width: 237px;
                    height: 58px;
                    margin: 30px 10px;
                    background: rgba(254, 58, 54, 1);
                    border-radius: 2px;
                    font-size: 22px;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                }

                .code-img-box {
                    width: 145px;
                    padding-bottom: 13px;
                    text-align: center;

                    .code-img {
                        width: 145px;
                        height: 145px;
                    }

                    .code-title {
                        margin: 18px 0 10px 0;
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 12px;
                        color: #333333;

                    }

                    .code-border {
                        border: 1px solid #F6F6F6;
                    }

                    .code-money {
                        margin-bottom: 13px;
                        font-size: 20px;
                        font-weight: bold;
                        color: #FE3A36;
                        line-height: 16px;
                    }

                    .barcode-scanner {
                        width: 23px;
                        height: 23px;
                    }

                    .code-text {
                        margin-bottom: 19px;
                        display: inline-block;
                        width: 84px;
                        font-size: 12px;
                        font-weight: 400;
                        color: #333333;
                        line-height: 15px;
                    }
                }

            }

        }


        .collect-money-footer {
            margin: 30px 0 20px 40px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 20px;
        }

    }
</style>
<style lang="less">
    .collect-money-container {
        .pay-modal-container {
            .custom-box {
                padding: 31px 68px 33px 68px;
            }

            .pay-modal-title {
                font-size: 20px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                line-height: 20px;
            }

            .pay-modal-text {
                margin: 22px 0 31px 0;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 16px;
            }

            .pay-button {
                .clear-both;

                .button {
                    float: left;
                    width: 145px;
                    height: 50px;
                    border-radius: 2px;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 15px;
                }

                .pay-error {
                    .button;
                    color: rgba(51, 51, 51, 1);
                    /*background: #F9F9F9;*/
                }

                .pay-succeed {
                    .button;
                    margin-left: 94px;
                    color: @white;
                    background: #21BA58;
                }
            }

        }
    }
</style>
