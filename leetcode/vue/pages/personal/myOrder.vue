<template>
    <div class="my-order-container com-order-style">
        <div class="order-search">
            <div class="order-filter" :class="{'active':orderType === 0}" @click="changeOrderType(0)">全部订单</div>
            <div class="order-filter" :class="{'active':orderType === 1}" @click="changeOrderType(1)">待支付</div>
            <div class="order-filter" :class="{'active':orderType === 2}" @click="changeOrderType(2)">支付成功</div>
            <div class="order-filter" :class="{'active':orderType === 3}" @click="changeOrderType(3)">交易关闭</div>
            <div class="order-filter" :class="{'active':orderType === 4}" @click="changeOrderType(4)">已取消</div>
            <div class="order-filter" :class="{'active':orderType === 5}" @click="changeOrderType(5)">退款中</div>
            <div class="order-filter" :class="{'active':orderType === 6}" @click="changeOrderType(6)">已退款</div>
        </div>
        <div class="order-head">
            <div class="order-head-info">
                <p class="info">班级信息</p>
                <p class="money">付款金额</p>
            </div>
            <p class="handle-title">操作</p>

            <p class="order-status-title">交易状态</p>
        </div>
        <template v-if="infoShow === true">
            <div class="order-list-box" v-if="orderList && orderList.length>0">
                <div @click="toDetails(item,index)" class="order-list" v-for="(item,index) in orderList" :key="index">
                    <div class="order-base-info">
                        <div class="order-number-box">
                        <span>
                            订单号:
                            <span class="order-number">{{item.order_number}}</span>
                        </span>
                            <span style="margin-left: 18px;">下单时间：{{item.create_time}}</span>
                        </div>
                        <div class="order-pay-time">
                            <span v-if="item.pay_status === 1 && item.time">{{item.time}}后交易自动关闭</span>
                        </div>
                    </div>
                    <div class="order-course">
                        <div class="order-course-info">
                            <div class="order-course-title"
                                 v-if="item.goods && item.goods.length>0 && item.goods[0].object">
                                <div class="course-title">{{item.goods[0].object.class_name}}</div>
                                <p class="com-sign" v-if="item.goods[0].object.term">{{item.goods[0].object.term ===
                                    1?'春':item.goods[0].object.term === 2?'夏':'秋'}}</p>
                                <p class="com-sign" v-if="item.goods[0].object.year" style="background: #41D0FF">
                                    {{item.goods[0].object.year}}</p>
                                <p class="com-sign" v-if="item.goods[0].specialized_subject_name"
                                   style="background: #FF7723">
                                    {{item.goods[0].object.specialized_subject_name}}</p>
                                <div class="course-number">
                                    <span class="subscribe-number" :title="item.goods[0].object.reservation_number">预约号：{{item.goods[0].object.reservation_number}}</span>

                                </div>
                            </div>
                        </div>
                        <div class="order-course-status">
                            <div class="order-money">￥{{item.fee.toFixed(2)}}</div>
                            <span class="order-status"
                                  :class="[{'red':item.pay_status  === 2 ||item.pay_status  === 6},{'green':item.pay_status  === 5 ||item.pay_status ===1 }]">{{item.pay_status_label}}</span>
                            <span class="handle-button" v-if="item.pay_status === 2">
                            <pc-button
                                    type="login"
                                    height="24"
                                    @click.stop="openCalendarShow(item,index)"
                                    radius
                            >课程表
                            </pc-button>
                            <pc-button
                                    class="cancel-order"
                                    type="login"
                                    height="24"
                                    @click.stop="toDetails(item,index)"
                                    radius
                            >我要退款
                            </pc-button>
                                <!--                            <span class="cancel-order cursor" @click.stop="closeOrder(item,index)">取消订单</span>-->
                        </span>
                            <span class="handle-button" v-else-if="item.pay_status === 1">
                            <pc-button
                                    type="login"
                                    height="24"
                                    @click.stop="payOrder(item,index)"
                                    radius
                            >去支付
                            </pc-button>
                            <pc-button
                                    class="cancel-order"
                                    type="login"
                                    height="24"
                                    @click.stop="toDetails(item,index)"
                                    radius
                            >取消订单
                            </pc-button>
                                <!--                            <span class="cancel-order cursor" @click.stop="closeOrder(item,index)">取消订单</span>-->
                        </span>
                            <span class="handle-button" style="padding-top: 0;" v-else>查看详情</span>
                        </div>
                    </div>
                </div>
            </div>
            <pc-page class="page-container" v-if="total>5" :current="page" :page-size="5" @on-change="changeOrder"
                     :total="total"></pc-page>
        </template>
        <no-info v-else-if="infoShow === false"></no-info>

        <pc-modal width="520" height="198" v-model="cancelShow">
            <div class="interview-box">
                <p class="interview-title">退款提示</p>
                <p class="interview-date">发起退费申请后，将按照退费规则收取手续费，请详细阅读
                    <nuxt-link target="_blank" style="color: #FE3A36;" to="/apply">退费规则</nuxt-link>
                    ，是否继续？
                </p>
                <pc-button class="cancel-button" @click="cancelShow = false">取消</pc-button>
                <pc-button class="confirm-button" @click="closeOrder">确定</pc-button>
            </div>
        </pc-modal>

      <calendar-box ref="calendar"  :dateSet="dateSet" :dateList="dateList"></calendar-box>

    </div>
</template>

<script>
    import PcButton from '../../components/pc-button';
    import request from '../../axios/request';
    import PcModal from '../../components/pc-modal';
    import PcPage from '../../components/pc-page';
    import PcCalendar from '../../components/pc-calendar';
    import NoInfo from "../../components/no-info";
    import CalendarBox from "../../components/calendar-box";

    export default {
        /* 个人资料 */
        name: 'myoOrder',
        data() {
            return {
                orderType: 0,
                height: 0,
                orderList: null,
                page: 1,
                total: 1,
                timeId: null,
                dateSet: [],
                dateList: [],
                id: null,
                cancelShow: false,
                cancelOrderShow: false,
                infoShow: null,
            };
        },
        created() {

        },
        mounted() {
            this.getOrderList();
        },

        beforeDestroy() {
            clearInterval(this.timeId);
        },
        methods: {
            toDetails(item, index) {
                this.$router.push({path: `orderDetails?id=${item.id}`});
            },
            changeOrder(page) {
                this.page = page;
                this.getOrderList();
            },

            payOrder(item, index) {
                // sessionStorage.order = JSON.stringify(item)
                this.$router.push({path: `orderDetails?id=${item.id}`});
            },
            async getOrderList() {
                clearInterval(this.timeId);
                let formData = {page_no: this.page, page_size: 5};
                if (this.orderType) {
                    formData.pay_status = this.orderType;
                }
                let data = await request.orderList(formData);
                if (data && data.data && data.data.total && data.data.list) {
                    this.orderList = data.data.list;
                    this.total = data.data.total;
                    this.infoShow = true;
                    this.orderTime();

                } else {
                    this.infoShow = false;
                }

            },
            async openCalendarShow(item, index) {
                await this.getCalender(item, index);
                this.$refs.calendar.open()
            },
            orderRefund() {
            },
            openCancelModal(item, index) {
                this.cancelShow = true;
                this.id = item.id;
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
            orderTime() {

                this.timeId = setInterval(() => {
                    this.orderList.map(item => {
                        let endTime = new Date(item.pay_end_time).getTime();
                        let time = new Date().getTime();
                        let date = endTime - time;
                        this.$set(item, 'oldTime', item.time);
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

                            this.$set(item, 'time', `${h}:${m}:${s}`);
                        } else {
                            this.$set(item, 'time', 0);
                        }
                        if (item.oldTime && !item.time) {
                            this.getOrderList();
                        }

                    });
                }, 1000);
            },
            changeOrderType(type) {
                this.page = 1;
                this.orderType = type;
                this.getOrderList();
            },
            async closeOrder(item, index) {
                let data = await request.cancelOrder(this.id);
                if (data && data.msg) {
                    this.$msg(data.msg);
                    this.getOrderList();
                }
            }
        },
        components: {CalendarBox, NoInfo, PcCalendar, PcPage, PcModal, PcButton}
    };
</script>

<style lang="less">
    .my-order-container {
        .order-money {
            color: #FE3A36;
        }
    }
</style>
