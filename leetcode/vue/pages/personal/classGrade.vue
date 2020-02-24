<template>
    <div class="class-grade-container com-order-style">
        <div class="order-search">
            <div class="order-filter" :class="{'active':orderType === 0}" @click="changeOrderType(0)">全部班级</div>
            <div class="order-filter" :class="{'active':orderType === 1}" @click="changeOrderType(1)">未开课</div>
            <div class="order-filter" :class="{'active':orderType === 2}" @click="changeOrderType(2)">上课中</div>
            <div class="order-filter" :class="{'active':orderType === 3}" @click="changeOrderType(3)">已完结</div>

        </div>
        <div class="order-head">
            <div class="order-head-info">
                <p class="info">班级信息</p>
                <p class="money">学员姓名</p>
            </div>
            <p class="handle-title">上课日期</p>
            <p class="order-status-title">班级状态</p>
        </div>
        <template v-if="infoShow === true">
            <div class="order-list-box"  v-if="orderList && orderList.length>0">
                <div @click="toDetails(item,index)" class="order-list" v-for="(item,index) in orderList" :key="index">

                    <div class="order-course">
                        <div class="order-course-info">
                            <div class="order-course-title">
                                <div class="course-title">{{item.class_name}}</div>
                                <p class="com-sign" v-if="item.term_label">{{item.term_label}}</p>
                                <p class="com-sign" v-if="item.year" style="background: #41D0FF">{{item.year}}</p>
                                <p class="com-sign" v-if="item.specialized_subject_name" style="background: #FF7723">
                                    {{item.specialized_subject_name}}</p>

                                <div class="course-number">
                                    <span class="subscribe-number" :title="item.reservation_number">预约号：{{item.reservation_number}}</span>
                                </div>
                            </div>

                        </div>
                        <!--                    <div class="order-course-status">777</div>-->
                        <div class="order-course-status">
                            <div class="order-money">{{item.contact_name}}</div>
                            <span class="order-status"
                                  :class="[{'red':item.pay_status  === 6 },{'green':item.pay_status  === 5 }]"
                                  v-if="item.pay_status === 5 || item.pay_status === 6 ||item.pay_status === 7">{{item.pay_status_label}}</span>
                            <span class="order-status"
                                  :class="[{'red':item.class_phase  === 3 },{'green':item.class_phase  === 2 }]" v-else>{{item.class_phase_label}}</span>

                            <span class="handle-button">
                            <pc-button
                                    type="login" height="24" @click.stop="openCalendarShow(item,index)" radius
                            >课程表
                            </pc-button>
                            <pc-button
                                    v-if="item.invoice_status === 1"
                                    style="margin-top: 5px;" type="login" height="24"
                                    @click.stop="invoiceInfo(item,index)" radius
                            >发票详情
                            </pc-button>
                            <pc-button  v-if="item.invoice_status !== 1&&item.invoice_status !== 2"
                                        style="margin-top: 5px;" type="login" height="24"
                                        @click.stop="applyInvoice(item,index)" radius
                            >申请发票
                            </pc-button>


                            <pc-button
                                    v-if="dropCourse(item)"
                                    class="cancel-order"
                                    type="login" height="24" @click.stop="openCancelModal(item,index)" radius
                            >我要退课
                            </pc-button>
                        </span>
                            <!--                        <span class="handle-button" style="padding-top: 0;" v-else>暂无</span>-->
                        </div>
                    </div>
                </div>
            </div>
            <pc-page class="page-container" v-if="total>5" :current="page" :page-size="5" @on-change="changeOrder"
                     :total="total"></pc-page>
        </template>
        <no-info v-else-if="infoShow === false" ></no-info>


        <pc-modal width="520" height="198" v-model="cancelShow">
            <div class="interview-box">
                <p class="interview-title">退款提示</p>
                <p class="interview-date">发起退费申请后，将按照退费规则收取手续费，请详细阅读 <nuxt-link target="_blank" style="color: #FE3A36;" to="/apply">退费规则</nuxt-link>，是否继续？</p>
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
        name: 'classGrade',
        data() {
            return {
                orderType: 0,
                height: 0,
                orderList: [],
                page: 1,
                total: 1,
                timeId: null,
                cancelShow: false,
                id: null,
                dateList: [],
                dateSet: [],
                infoShow:null,
            };
        },
        created() {

        },
        mounted() {
            this.getOrderList();

        },

        methods: {
            toDetails(item, index) {
                if (item.pay_status === 5 || item.pay_status === 6 || item.pay_status === 7) {
                    this.$router.push({path: `/personal/refundDetails?id=${item.id}`});
                } else if (this.dropCourse(item)) {
                    sessionStorage.details = JSON.stringify(item);
                    this.$router.push({path: `/paymentResult?id=${item.class_id}`});
                }
            },
            applyInvoice(item) {
                this.$router.push({path: `/personal/applyInvoice?id=${item.id}`});
            },
            invoiceInfo(item) {
                this.$router.push({path: `/personal/invoiceInfo?id=${item.id}`});
            },
            changeOrder(page) {
                this.page = page;
                this.getOrderList();
            },
            async getCalender(item, index) {
                let data = await request.classDetailsDate(item.class_id);
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

            async getOrderList() {
                let formData = {page_no: this.page, page_size: 5};
                if (this.orderType) {
                    formData.class_phase = this.orderType;
                }
                let data = await request.myClass(formData);
                if(data && data.data&&data.data.list && data.data.total){
                    this.orderList = data.data.list;
                    this.total = data.data.total;
                    this.infoShow = true
                }else{
                    this.infoShow = false
                }

            },
            changeOrderType(type) {
                this.page = 1;
                this.orderType = type;
                this.getOrderList();
            },
            openCancelModal(item, index) {
                this.cancelShow = true;
                this.id = item.id;
            },
            async closeOrder(item, index) {
                let data = await request.applyRefund(this.id);
                if (data && data.error_code === 999999) {
                    this.$msg(data.msg, 'succeed');
                    this.cancelShow = false;
                    this.getOrderList();
                } else {
                    this.cancelShow = false;
                }
            },
            async openCalendarShow(item, index) {
                await this.getCalender(item, index);
                this.$refs.calendar.open()
            },
            dropCourse(item) {
                return !item.is_shift && (item.class_phase === 1 || item.class_phase === 2) && (item.pay_status !== 5 && item.pay_status !== 6 && item.pay_status !== 7);
            },
        },
        computed: {},
        components: {CalendarBox, NoInfo, PcCalendar, PcPage, PcModal, PcButton}
    };
</script>

<style lang="less" scoped>

</style>
<style lang="less">
    .class-grade-container {
        .calendar-box {
            max-height: 580px;
            overflow: auto;

            .calendar {
                padding: 0 0 20px 20px;

                .calendar-title {
                    margin: 10px 0 10px 20px;
                    font-size: 14px;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }

                .date-list {
                    width: 78px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    border: 1px solid #f3f3f3;
                    border-right: 0;

                }

                .date-list:nth-last-of-type(1) {
                    border-right: 1px solid #f3f3f3;
                }

                .calendar-list-box {
                    border-left: 1px solid #f3f3f3;

                    .calendar-list {
                        width: 78px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 12px;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);

                        border-bottom: 1px solid #f3f3f3;
                        border-right: 1px solid #f3f3f3;

                        .index {

                        }

                    }

                    .calendar-list:nth-of-type(7n) {
                        border-right: 1px solid #f3f3f3;
                        /*border-bottom: 1px solid #f3f3f3;*/
                    }

                    .active {
                        line-height: inherit;
                        color: @white;
                        background: #21BA58;
                    }
                }


            }
        }


    }
</style>
