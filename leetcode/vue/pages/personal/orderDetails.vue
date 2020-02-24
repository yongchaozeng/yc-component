<template>
    <div class="order-details-container">
        <div class="order-details-head">
            <div class="to-order-button" @click="toOrderList">
                <span class=" icon iconfont">&#xe628;</span>
                <span class="to-order-text">返回</span>
            </div>
            <div class="title">

                <template>
                    <img v-if="order.pay_status === 6" class="title-img" src="../../assets/imgs/order-refund.png"
                         width="16"
                         alt="">
                    <img class="title-img" v-else-if="order.pay_status === 3 || order.pay_status === 4" width="16"
                         src="../../assets/imgs/order-close.png" alt="">
                    <img v-else class="title-img" src="../../assets/imgs/sand-clock-icon.png" alt="">
                    <span class="title-text">
                        <span v-if="order.pay_status === 1">订单详情：</span>
                        <span v-if="order.pay_status === 3 || order.pay_status === 4" style="color: #333">  {{order.pay_status_label}}</span>
                        <span v-else-if="order.pay_status === 6 || order.pay_status === 2" style="color: #FF0000">  {{order.pay_status_label}}</span>
                        <span v-else-if="order.pay_status === 1">  {{order.pay_status_label}}（{{time}}后订单将会自动关闭）</span>
                        <span v-else>  {{order.pay_status_label}}</span>

                    </span>
                </template>

            </div>
        </div>
        <div class="border"></div>
        <div class="order-details-main" v-if="order && order.goods && order.goods[0] && order.goods[0].object">
            <div class="form">
                <div class="form-td">
                    <div class="label">订单号</div>
                    <div class="value">{{order.order_number}}</div>
                </div>
                <div class="form-td">
                    <div class="label">预约号</div>
                    <div class="value">
                        {{order.goods[0].object.reservation_number||'—— —— ——'}}
                    </div>
                </div>
                <div class="form-td">
                    <div class="label">商品名称</div>
                    <div class="value">
                        {{order.goods[0].object.class_name||'—— —— ——'}}
                    </div>
                </div>
                <div class="form-td">
                    <div class="label">商品价格</div>
                    <div class="value red">
                        ￥{{order.goods[0].class_total_fee}}
                    </div>
                </div>
                <div class="form-td">
                    <div class="label">减免金额</div>
                    <div class="value red">￥{{order.goods[0].reduction||0}}</div>
                </div>
                <div class="form-td">
                    <div class="label">实付金额</div>
                    <div class="value red">{{order.real_fee?'￥'+order.real_fee:order.refund_fee?'￥'+order.refund_fee:'—— —— ——'}}</div>
                </div>
                <div class="form-td">
                    <div class="label">退款金额</div>
                    <div class="value red">{{order.refund_fee?'￥'+order.refund_fee:'—— —— ——'}}</div>
                </div>
                <div class="form-td">
                    <div class="label">支付方式</div>
                    <div class="value ">{{order.pay_type_label||'—— —— ——'}}</div>
                </div>
                <div class="form-td">
                    <div class="label">订单创建时间</div>
                    <div class="value">{{order.create_time||'—— —— ——'}}</div>
                </div>
                <div class="form-td">
                    <div class="label">订单完成时间</div>
                    <div class="value">{{order.pay_time||'—— —— ——'}}</div>
                </div>
                <div class="form-td">
                    <div class="label">订单取消时间</div>
                    <div class="value">{{order.cancel_time||'—— —— ——'}}</div>
                </div>
                <div class="form-td">
                    <div class="label">提交退款时间</div>
                    <div class="value">{{order.refund_create_time||'—— —— ——'}}</div>
                </div>
                <div class="form-td">
                    <div class="label">完成退款时间</div>
                    <div class="value">{{order.refund_time||'—— —— ——'}}</div>
                </div>
            </div>
            <div class="order-button" v-if="order.pay_status === 1">
                <pc-button @click="openCancelModal" class="cancel-button">取消订单</pc-button>
                <pc-button class="pay-button" @click="payOrder">去支付</pc-button>
            </div>
            <div class="order-button" v-if="order.pay_status === 2">
                <pc-button class="pay-button" @click="refundModalShow">我要退款</pc-button>
            </div>
            <div class="order-button" v-if="order.pay_status === 5 || order.pay_status === 6">
                <pc-button class="pay-button" @click="refundOrderDetail">查看退款进度</pc-button>
            </div>
        </div>
        <pc-modal width="520" height="198" v-model="cancelShow">
            <div class="interview-box">
                <p class="interview-title">取消订单</p>
                <p class="interview-date">确认要取消订单？</p>
                <pc-button class="cancel-button" @click="cancelShow = false">取消</pc-button>
                <pc-button class="confirm-button" @click="closeOrder">确定</pc-button>
            </div>
        </pc-modal>
        <pc-modal width="520" height="198" v-model="refundShow">
            <div class="interview-box">
                <p class="interview-title">
                    退款提示</p>
                <p class="interview-date">发起退费申请后，将按照退费规则收取手续费，请详细阅读<nuxt-link target="_blank" style="color: #FE3A36;" to="/apply">退费规则</nuxt-link>，是否继续？</p>
                <pc-button class="cancel-button" @click="refundShow = false">取消</pc-button>
                <pc-button class="confirm-button" @click="refundOrder">确认退款</pc-button>
            </div>
        </pc-modal>
    </div>
</template>
<script>
    import request from '../../axios/request';
    import PcButton from '../../components/pc-button';
    import PcModal from '../../components/pc-modal';

    export default {
        name: 'orderDetails',
        components: {PcModal, PcButton},
        data() {
            return {
                order: {},
                cancelShow: false,
                refundShow: false,
                timeId: null,
                time: '',
            };
        },
        async mounted() {
            await this.init();
            await this.setTime();
        },
        methods: {
            setTime() {
                this.timeId = setInterval(() => {
                    let endTime = new Date(this.order.pay_end_time).getTime();
                    let time = new Date().getTime();
                    let date = endTime - time;
                    if (endTime >= time) {
                        var leave1 = date % (24 * 3600 * 1000);
                        var leave2 = leave1 % (3600 * 1000);
                        var leave3 = leave2 % (60 * 1000);
                        let h =
                            Math.floor(leave1 / (3600 * 1000)) > 9
                                ? Math.floor(leave1 / (3600 * 1000))
                                : '0' + Math.floor(leave1 / (3600 * 1000));
                        let m =
                            Math.floor(leave2 / (60 * 1000)) > 9
                                ? Math.floor(leave2 / (60 * 1000))
                                : '0' + Math.floor(leave2 / (60 * 1000));
                        let s =
                            Math.round(leave3 / 1000) > 9
                                ? Math.round(leave3 / 1000)
                                : '0' + Math.round(leave3 / 1000);
                        this.time = `${h}:${m}:${s}`;
                    } else {
                        this.time = this.order.pay_status_label;
                    }
                }, 1000);
            },
            async init() {
                let data = await request.orderDetails(this.$route.query.id);
                if (data && data.data && data.data.order) {
                    this.order = data.data.order;
                }
            },
            toOrderList() {
                this.$router.go(-1);
            },
            async payOrder(item, index) {
                await this.getDetails();
                sessionStorage.order = JSON.stringify(this.order);
                this.$router.push({path: '/collectMoney'});
            },
            async getDetails() {
                let data = await request.classDetails(this.order.goods[0].object.class_id);
                let goods = this.order.goods[0];
                let details = {
                    id: this.order.id,
                    contact_id: goods.object.contact_id,
                    class_id: goods.object.class_id,
                    class_name: goods.object.class_name,
                    reservation_number: goods.reservation_number,
                    class_code: goods.object.class_code,

                    teacher: goods.teacher,
                    first_class_start_time: goods.first_class_start_time,
                };
                sessionStorage.details = JSON.stringify(details);

            },
            refundModalShow(item, index) {
                this.refundShow = true;
            },
            async refundOrder(item, index) {
                let data = await request.applyRefund(this.order.id);
                try {
                    this.$msg(data.msg, 'succeed');
                    this.refundShow = false;
                    this.toOrderList();
                } catch (e) {
                    this.refundShow = false;
                }
            },
            refundOrderDetail(item, index) {

                this.$router.push({path: `/personal/refundDetails?id=${this.order.id}`});
            },

            openCancelModal() {
                this.cancelShow = true;
            },
            async closeOrder(item, index) {
                let data = await request.cancelOrder(this.$route.query.id);
                if (data && data.msg) {
                    this.toOrderList();
                    this.cancelShow = false;
                } else {
                    this.cancelShow = false;
                }
            }
        },

    };
</script>
<style lang="less" scoped>
    .order-details-container {
        .red {
            color: #FF0000 !important;
        }

        .order-details-head {
            position: relative;
            height: 51px;
            padding: 15px 0;
            text-align: center;
            border-top: 4px solid @baseColor;

            .to-order-button {
                position: absolute;
                top: 11px;
                left: 27px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                cursor: pointer;


                .to-order-text {
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
                    width: 16px;
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

        .order-details-main {
            padding: 30px 125px;

            .form {
                .form-td {

                    .clear-both;

                    .label {
                        float: left;
                        width: 170px;
                        height: 50px;
                        padding-left: 43px;
                        text-align: left;
                        line-height: 50px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        border-bottom: 1px solid @white;
                        background: rgba(243, 243, 243, 1);

                    }

                    .value {
                        float: right;
                        width: 505px;
                        height: 50px;
                        padding-left: 69px;
                        text-align: left;
                        line-height: 50px;
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        border: 1px solid #F3F3F3;
                        border-left: 0;
                        border-bottom: 0;
                    }
                }

                .form-td:nth-last-of-type(1) {
                    .value {
                        border-bottom: 1px solid #F3F3F3;
                    }
                }
            }

            .order-button {
                margin-top: 30px;
                text-align: center;
                font-size: 0;

                .button {
                    display: inline-block;
                    width: 211px;
                    font-size: 18px;
                    font-weight: bold;
                }

                .cancel-button {
                    .button;
                    margin-right: 40px;
                    background: rgba(249, 249, 249, 1);
                }

                .pay-button {
                    .button;
                    color: @white;
                    background: #21BA58;
                }
            }

        }
    }
</style>
